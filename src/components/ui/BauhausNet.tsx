import { useEffect, useRef } from 'react'

type Shape = 'circle' | 'square' | 'triangle'

interface BauhausNetProps {
    rotateAll?:        boolean
    accentRate?:       number
    shapeMix?:         Shape[]
    edgeStyle?:        'lines' | 'none'
    individualRotate?: boolean
    layers?:           number[]
}

export default function BauhausNet({
    rotateAll        = true,
    accentRate       = 0.22,
    shapeMix         = ['circle', 'square', 'triangle'] as Shape[],
    edgeStyle        = 'lines',
    individualRotate = true,
    layers           = [3, 5, 7, 5, 3],
}: BauhausNetProps) {
    const ref = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const c = ref.current
        if (!c) return

        const dpr  = Math.min(window.devicePixelRatio || 1, 2)
        const seed = (i: number) => {
            const x = Math.sin(i * 12.9898) * 43758.5453
            return x - Math.floor(x)
        }

        let raf: number
        const start = performance.now()

        type Node = { x: number; y: number; li: number; idx: number; shape: Shape; isAccent: boolean }

        const draw = (now: number) => {
            const t = (now - start) / 1000
            const r = c.getBoundingClientRect()

            c.width  = r.width  * dpr
            c.height = r.height * dpr

            const ctx = c.getContext('2d')!
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
            ctx.clearRect(0, 0, r.width, r.height)

            const padX = r.width  * 0.1
            const padY = r.height * 0.1
            const iw   = r.width  - padX * 2
            const ih   = r.height - padY * 2

            const nodes: Node[] = []
            layers.forEach((n, li) => {
                const x = padX + (iw * li) / (layers.length - 1)
                for (let i = 0; i < n; i++) {
                    nodes.push({
                        x,
                        y:        padY + (ih * (i + 0.5)) / n,
                        li,
                        idx:      i,
                        shape:    shapeMix[Math.floor(seed(li * 30 + i) * shapeMix.length)],
                        isAccent: seed(li * 30 + i + 100) < accentRate,
                    })
                }
            })

            if (edgeStyle !== 'none') {
                ctx.strokeStyle = '#0a0a0a'
                for (let li = 0; li < layers.length - 1; li++) {
                    const a = nodes.filter(n => n.li === li)
                    const b = nodes.filter(n => n.li === li + 1)
                    a.forEach(na => b.forEach(nb => {
                        ctx.lineWidth = 0.4 + seed(na.idx * 7 + nb.idx * 11 + li) * 1.2
                        ctx.beginPath()
                        ctx.moveTo(na.x, na.y)
                        ctx.lineTo(nb.x, nb.y)
                        ctx.stroke()
                    }))
                }
            }

            nodes.forEach((n, i) => {
                const R   = 10
                const rot = rotateAll
                    ? (individualRotate ? t * 0.3 + i * 0.2 : t * 0.15)
                    : 0

                ctx.save()
                ctx.translate(n.x, n.y)
                ctx.rotate(rot)
                ctx.fillStyle = n.isAccent ? '#ff3b1f' : '#0a0a0a'

                if (n.shape === 'circle') {
                    ctx.beginPath()
                    ctx.arc(0, 0, R, 0, Math.PI * 2)
                    ctx.fill()
                } else if (n.shape === 'square') {
                    ctx.fillRect(-R * 0.85, -R * 0.85, R * 1.7, R * 1.7)
                } else {
                    ctx.beginPath()
                    ctx.moveTo(0, -R)
                    ctx.lineTo(R * 0.87, R * 0.5)
                    ctx.lineTo(-R * 0.87, R * 0.5)
                    ctx.closePath()
                    ctx.fill()
                }

                ctx.restore()
            })

            raf = requestAnimationFrame(draw)
        }

        raf = requestAnimationFrame(draw)
        return () => cancelAnimationFrame(raf)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <canvas ref={ref} className="w-full h-full block"/>
}
