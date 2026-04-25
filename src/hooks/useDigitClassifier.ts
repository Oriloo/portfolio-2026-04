import { useRef, useState, useEffect, useCallback } from 'react'

export interface UseDigitClassifierReturn {
    canvasRef:   React.RefObject<HTMLCanvasElement>
    probs:       number[]
    topDigit:    number
    hasContent:  boolean
    clearCanvas: () => void
}

export function useDigitClassifier(): UseDigitClassifierReturn {
    const canvasRef  = useRef<HTMLCanvasElement>(null)
    const [probs, setProbs]           = useState<number[]>(() => new Array(10).fill(0.1))
    const [topDigit, setTopDigit]     = useState(-1)
    const [hasContent, setHasContent] = useState(false)

    const clearCanvas = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')!
        ctx.clearRect(0, 0, canvas.width, canvas.height)
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

        function predict() {
            const img = ctx.getImageData(0, 0, canvas!.width, canvas!.height).data
            const W = canvas!.width, H = canvas!.height
            let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9, total = 0

            for (let y = 0; y < H; y++) {
                for (let x = 0; x < W; x++) {
                    if (img[(y * W + x) * 4 + 3] > 30) {
                        total++
                        if (x < minX) minX = x; if (x > maxX) maxX = x
                        if (y < minY) minY = y; if (y > maxY) maxY = y
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

            const bw = Math.max(1, maxX - minX)
            const bh = Math.max(1, maxY - minY)
            const aspect  = bw / bh
            const density = total / (bw * bh)
            const cx = (minX + maxX) / 2
            const cy = (minY + maxY) / 2
            let tL = 0, tT = 0, center = 0

            for (let y = minY; y <= maxY; y++) {
                for (let x = minX; x <= maxX; x++) {
                    if (img[(y * W + x) * 4 + 3] > 30) {
                        if (x < cx) tL++
                        if (y < cy) tT++
                        if (Math.hypot(x - cx, y - cy) < Math.min(bw, bh) * 0.18) center++
                    }
                }
            }

            const topR    = tT / total
            const leftR   = tL / total
            const centerR = center / total

            const sc = new Array(10).fill(0)
            sc[0] = (1 - centerR * 3) + (aspect > 0.55 && aspect < 0.9 ? 0.5 : -0.3) + (density < 0.35 ? 0.4 : -0.2)
            sc[1] = (aspect < 0.45 ? 1.2 : -0.5) + (density > 0.5 ? 0.4 : -0.2)
            sc[2] = (aspect > 0.6 ? 0.3 : -0.1)  + (topR < 0.55 ? 0.3 : 0) + 0.2
            sc[3] = (leftR < 0.48 ? 0.4 : -0.1)  + (aspect > 0.5 ? 0.2 : 0) + 0.15
            sc[4] = (leftR > 0.5  ? 0.3 : -0.1)  + (aspect > 0.55 ? 0.2 : 0) + 0.1
            sc[5] = (topR > 0.5   ? 0.3 : 0)     + 0.15
            sc[6] = (topR < 0.5   ? 0.35 : 0)    + (centerR > 0.08 ? 0.25 : 0)
            sc[7] = (topR > 0.55  ? 0.4 : -0.1)  + (leftR < 0.5 ? 0.2 : 0)
            sc[8] = (Math.abs(topR - 0.5) < 0.12 ? 0.3 : -0.1) + (density > 0.45 ? 0.3 : -0.1) + (centerR > 0.12 ? 0.3 : 0)
            sc[9] = (topR > 0.5   ? 0.3 : 0)     + (aspect < 0.65 ? 0.25 : 0)

            for (let i = 0; i < 10; i++) {
                sc[i] += Math.sin(total * 0.037 + i * 1.3) * 0.12
                sc[i]  = Math.max(0.01, sc[i])
            }

            const T    = 1.6
            const exps = sc.map((s: number) => Math.exp(s * T))
            const sum  = exps.reduce((a: number, b: number) => a + b, 0)
            const p    = exps.map((e: number) => e / sum) as number[]
            const top  = p.indexOf(Math.max(...p))

            setProbs(p)
            setTopDigit(top)
        }

        // ── Mouse events ──────────────────────────────────────
        const onMouseDown = (e: MouseEvent) => {
            drawing = true
            const pt = getPoint(e); lastX = pt.x; lastY = pt.y
        }
        const onMouseMove = (e: MouseEvent) => {
            if (!drawing) return
            const { x, y } = getPoint(e)
            drawStroke(x, y)
        }
        const onMouseUp   = () => { if (drawing) { drawing = false; predict() } }
        const onMouseLeave = () => { if (drawing) { drawing = false; predict() } }

        // ── Touch events ──────────────────────────────────────
        const onTouchStart = (e: TouchEvent) => {
            e.preventDefault()
            drawing = true
            const pt = getPoint(e); lastX = pt.x; lastY = pt.y
        }
        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault()
            if (!drawing) return
            const { x, y } = getPoint(e)
            drawStroke(x, y)
        }
        const onTouchEnd = () => { drawing = false; predict() }

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
