import { useEffect, useRef } from 'react'

const COLS = 16
const ROWS = 12

const PIXEL_MAP = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,1,0,0,0,1,0,1,0,0,1,0],
    [0,1,0,1,0,1,1,0,1,1,0,1,0,0,1,0],
    [0,1,1,1,0,1,1,1,1,1,0,1,1,1,1,0],
    [0,1,0,0,0,1,0,1,0,1,0,1,0,0,1,0],
    [0,1,0,0,0,1,0,0,0,1,0,1,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,1,1,1,1,1,1,0,1,1,1,0],
    [0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
]

function noiseSeed(i: number, k = 0): number {
    const x = Math.sin((i + k * 47) * 12.9898) * 43758.5453
    return x - Math.floor(x)
}

function isSignal(i: number, j: number): boolean {
    return (PIXEL_MAP[j]?.[i] ?? 0) === 1
}

export default function DiffusionAnimation({ resetKey = 0 }: { resetKey?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const dpr   = Math.min(window.devicePixelRatio || 1, 2)
        const start = performance.now()
        let raf: number

        function draw(now: number) {
            if (!canvas) return
            const t = (now - start) / 1000
            const r = canvas.getBoundingClientRect()
            if (r.width === 0 || r.height === 0) {
                raf = requestAnimationFrame(draw)
                return
            }

            canvas.width  = r.width  * dpr
            canvas.height = r.height * dpr
            const ctx = canvas.getContext('2d')!
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            ctx.clearRect(0, 0, r.width, r.height)

            const frames    = 5
            const gap       = 10
            const strW      = (r.width - 48 - gap * (frames - 1)) / frames
            const strH      = strW * (ROWS / COLS) // cellW === cellH → square pixels
            const topY      = (r.height - strH) / 2 + 10
            const stepCycle = (t * 0.28) % 1.4

            for (let f = 0; f < frames; f++) {
                const x0            = 24 + f * (strW + gap)
                const localProgress = Math.max(0, Math.min(1, stepCycle * frames - f + 0.4))
                const cellW         = strW / COLS
                const cellH         = strH / ROWS

                ctx.save()
                ctx.beginPath()
                ctx.rect(x0, topY, strW, strH)
                ctx.clip()

                for (let i = 0; i < COLS; i++) {
                    for (let j = 0; j < ROWS; j++) {
                        const noise          = noiseSeed(i * 1000 + j, Math.floor(t * 6))
                        const sig            = isSignal(i, j)
                        const signalStrength = sig ? localProgress : 0
                        const noiseStrength  = (1 - localProgress) * noise
                        const intensity      = Math.max(signalStrength, noiseStrength * 0.7)
                        if (intensity < 0.1) continue

                        ctx.fillStyle = (sig && localProgress > 0.5)
                            ? `rgba(255,59,31,${signalStrength})`
                            : `rgba(10,10,10,${intensity * 0.85})`

                        ctx.fillRect(x0 + i * cellW, topY + j * cellH, cellW + 0.5, cellH + 0.5)
                    }
                }
                ctx.restore()

                ctx.strokeStyle = '#0a0a0a'
                ctx.lineWidth   = 0.7
                ctx.strokeRect(x0 + 0.5, topY + 0.5, strW, strH)

                ctx.font      = '9px ui-monospace, monospace'
                ctx.fillStyle = 'rgba(10,10,10,0.45)'
                ctx.textAlign = 'left'
                const tStep   = 1000 - Math.floor(localProgress * 1000)
                ctx.fillText(`t=${String(tStep).padStart(4, '0')}`, x0 + 3, topY + strH + 13)

                if (f < frames - 1) {
                    ctx.strokeStyle = 'rgba(10,10,10,0.45)'
                    ctx.lineWidth   = 0.7
                    const ax = x0 + strW + 2
                    const ay = topY + strH / 2
                    ctx.beginPath()
                    ctx.moveTo(ax, ay)
                    ctx.lineTo(ax + gap - 5, ay)
                    ctx.moveTo(ax + gap - 8, ay - 3)
                    ctx.lineTo(ax + gap - 5, ay)
                    ctx.lineTo(ax + gap - 8, ay + 3)
                    ctx.stroke()
                }
            }

            ctx.font      = '9px ui-monospace, monospace'
            ctx.fillStyle = 'rgba(10,10,10,0.45)'
            ctx.textAlign = 'left'
            ctx.fillText('REVERSE DIFFUSION · 1000 STEPS', 24, topY - 14)
            ctx.fillStyle = '#ff3b1f'
            ctx.textAlign = 'right'
            ctx.fillText('● sampling', r.width - 24, topY - 14)

            ctx.font      = 'italic 11px Georgia, serif'
            ctx.fillStyle = '#0a0a0a'
            ctx.textAlign = 'left'
            ctx.fillText('noise', 24, topY + strH + 28)
            ctx.textAlign = 'right'
            ctx.fillText('→ signal', r.width - 24, topY + strH + 28)

            raf = requestAnimationFrame(draw)
        }

        raf = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(raf)
    }, [resetKey])

    return (
        <div className="w-full h-full">
            <canvas ref={canvasRef} className="w-full h-full block"/>
        </div>
    )
}
