import { useRef, useState, useEffect, useCallback } from 'react'
import * as ort from 'onnxruntime-web'

ort.env.wasm.wasmPaths   = '/'
ort.env.wasm.numThreads  = 1   // single-threaded — no SharedArrayBuffer required

export interface UseDigitClassifierReturn {
    canvasRef:   React.RefObject<HTMLCanvasElement>
    probs:       number[]
    topDigit:    number
    hasContent:  boolean
    clearCanvas: () => void
}

export function useDigitClassifier(): UseDigitClassifierReturn {
    const canvasRef  = useRef<HTMLCanvasElement>(null)
    const sessionRef = useRef<ort.InferenceSession | null>(null)

    const [probs,      setProbs]      = useState<number[]>(() => new Array(10).fill(0.1))
    const [topDigit,   setTopDigit]   = useState(-1)
    const [hasContent, setHasContent] = useState(false)

    // Load the ONNX session once at mount
    useEffect(() => {
        ort.InferenceSession.create('/models/mnist-12.onnx', {
            executionProviders: ['wasm'],
        })
            .then(s  => { sessionRef.current = s })
            .catch(e => console.error('[MNIST] model load failed:', e))
    }, [])

    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height)
        setProbs(new Array(10).fill(0.1))
        setTopDigit(-1)
        setHasContent(false)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const isMobile = window.matchMedia('(max-width: 767px)').matches
        const SIZE = isMobile ? 160 : 200
        const DPR  = Math.min(window.devicePixelRatio || 1, 2)

        canvas.width        = SIZE * DPR
        canvas.height       = SIZE * DPR
        canvas.style.width  = `${SIZE}px`
        canvas.style.height = `${SIZE}px`

        const ctx = canvas.getContext('2d')!
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

        let drawing = false
        let lastX   = 0
        let lastY   = 0

        function getPoint(e: MouseEvent | TouchEvent): { x: number; y: number } {
            const r = canvas!.getBoundingClientRect()
            const t = 'touches' in e ? e.touches[0] : e
            return {
                x: ((t.clientX - r.left) / r.width)  * SIZE,
                y: ((t.clientY - r.top)  / r.height) * SIZE,
            }
        }

        function drawStroke(x: number, y: number) {
            ctx.strokeStyle = '#0a0a0a'
            ctx.lineWidth   = SIZE * 0.09
            ctx.lineCap     = 'round'
            ctx.lineJoin    = 'round'
            ctx.beginPath()
            ctx.moveTo(lastX, lastY)
            ctx.lineTo(x, y)
            ctx.stroke()
            lastX = x
            lastY = y
        }

        async function predict() {
            const session = sessionRef.current
            if (!session) return

            const W    = canvas!.width
            const H    = canvas!.height
            const data = ctx.getImageData(0, 0, W, H).data

            // Bounding box of drawn pixels (alpha > 30)
            let minX = W, maxX = 0, minY = H, maxY = 0, total = 0
            for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                    if (data[(y * W + x) * 4 + 3] > 30) {
                        total++
                        if (x < minX) minX = x
                        if (x > maxX) maxX = x
                        if (y < minY) minY = y
                        if (y > maxY) maxY = y
                    }
                }
            }

            if (total < 20) {
                setHasContent(false)
                setProbs(new Array(10).fill(0.1))
                setTopDigit(-1)
                return
            }
            setHasContent(true)

            // White-on-transparent source from alpha channel
            const bw  = maxX - minX + 1
            const bh  = maxY - minY + 1
            const src = document.createElement('canvas')
            src.width  = W
            src.height = H
            const srcCtx  = src.getContext('2d')!
            const srcData = srcCtx.createImageData(W, H)
            for (let i = 0; i < data.length; i += 4) {
                srcData.data[i]     = 255
                srcData.data[i + 1] = 255
                srcData.data[i + 2] = 255
                srcData.data[i + 3] = data[i + 3]
            }
            srcCtx.putImageData(srcData, 0, 0)

            // Scale into 20×20 centered in 28×28 (MNIST-style 4 px padding)
            const scale = 20 / Math.max(bw, bh)
            const dw    = Math.round(bw * scale)
            const dh    = Math.round(bh * scale)
            const dx    = Math.round((28 - dw) / 2)
            const dy    = Math.round((28 - dh) / 2)

            const mnist    = document.createElement('canvas')
            mnist.width    = 28
            mnist.height   = 28
            const mnistCtx = mnist.getContext('2d')!
            mnistCtx.fillStyle = '#000'
            mnistCtx.fillRect(0, 0, 28, 28)
            mnistCtx.drawImage(src, minX, minY, bw, bh, dx, dy, dw, dh)

            // Float32 input [1, 1, 28, 28] — values in [0, 1]
            const pixels = mnistCtx.getImageData(0, 0, 28, 28).data
            const input  = new Float32Array(28 * 28)
            for (let i = 0; i < 28 * 28; i++) {
                input[i] = pixels[i * 4] / 255
            }

            const tensor  = new ort.Tensor('float32', input, [1, 1, 28, 28])
            const results = await session.run({ [session.inputNames[0]]: tensor })
            const logits  = Array.from(results[session.outputNames[0]].data as Float32Array)

            // Softmax
            const maxL = Math.max(...logits)
            const exps = logits.map(v => Math.exp(v - maxL))
            const sum  = exps.reduce((a, b) => a + b, 0)
            const p    = exps.map(e => e / sum)

            setProbs(p)
            setTopDigit(p.indexOf(Math.max(...p)))
        }

        const onMouseDown  = (e: MouseEvent) => {
            drawing = true
            const pt = getPoint(e); lastX = pt.x; lastY = pt.y
        }
        const onMouseMove  = (e: MouseEvent) => { if (drawing) { const { x, y } = getPoint(e); drawStroke(x, y) } }
        const onMouseUp    = () => { if (drawing) { drawing = false; predict() } }
        const onMouseLeave = () => { if (drawing) { drawing = false; predict() } }

        const onTouchStart = (e: TouchEvent) => {
            e.preventDefault()
            drawing = true
            const pt = getPoint(e); lastX = pt.x; lastY = pt.y
        }
        const onTouchMove  = (e: TouchEvent) => { e.preventDefault(); if (drawing) { const { x, y } = getPoint(e); drawStroke(x, y) } }
        const onTouchEnd   = () => { drawing = false; predict() }

        canvas.addEventListener('mousedown',  onMouseDown)
        canvas.addEventListener('mousemove',  onMouseMove)
        canvas.addEventListener('mouseup',    onMouseUp)
        canvas.addEventListener('mouseleave', onMouseLeave)
        canvas.addEventListener('touchstart', onTouchStart, { passive: false })
        canvas.addEventListener('touchmove',  onTouchMove,  { passive: false })
        canvas.addEventListener('touchend',   onTouchEnd)

        return () => {
            canvas.removeEventListener('mousedown',  onMouseDown)
            canvas.removeEventListener('mousemove',  onMouseMove)
            canvas.removeEventListener('mouseup',    onMouseUp)
            canvas.removeEventListener('mouseleave', onMouseLeave)
            canvas.removeEventListener('touchstart', onTouchStart)
            canvas.removeEventListener('touchmove',  onTouchMove)
            canvas.removeEventListener('touchend',   onTouchEnd)
        }
    }, [])

    return { canvasRef, probs, topDigit, hasContent, clearCanvas }
}
