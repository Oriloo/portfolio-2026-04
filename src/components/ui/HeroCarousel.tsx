import { useState, useEffect, useRef, useCallback } from 'react'
import TokenizerAnimation from './TokenizerAnimation'
import DiffusionAnimation from './DiffusionAnimation'

const SLIDE_DURATIONS = [10000, 5000] as const
const TOTAL           = SLIDE_DURATIONS.length

export default function HeroCarousel() {
    const [current, setCurrent]      = useState(0)
    const [resetKeys, setResetKeys]  = useState([0, 0])
    const currentRef                 = useRef(0)
    const startRef                   = useRef(performance.now())
    const barRef                     = useRef<HTMLDivElement>(null)
    const rafRef                     = useRef<number>(0)

    const goTo = useCallback((idx: number) => {
        const next = ((idx % TOTAL) + TOTAL) % TOTAL
        currentRef.current = next
        setCurrent(next)
        setResetKeys(keys => keys.map((k, i) => i === next ? k + 1 : k) as [number, number])
        startRef.current = performance.now()
        if (barRef.current) barRef.current.style.width = '0%'
    }, [])

    useEffect(() => {
        const tick = (now: number) => {
            const duration = SLIDE_DURATIONS[currentRef.current]
            const elapsed  = now - startRef.current
            const p = Math.min(elapsed / duration * 100, 100)
            if (barRef.current) barRef.current.style.width = `${p}%`
            if (elapsed >= duration) goTo(currentRef.current + 1)
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [goTo])

    return (
        <div className="w-full h-full flex flex-col">
            {/* Viewport */}
            <div className="relative flex-1 overflow-hidden">
                {/* Slides track */}
                <div
                    className="flex h-full"
                    style={{
                        transform: `translateX(-${current * 100}%)`,
                        transition: 'transform 0.55s cubic-bezier(.4,0,.2,1)',
                    }}
                >
                    <div className="min-w-full h-full shrink-0">
                        <TokenizerAnimation resetKey={resetKeys[0]}/>
                    </div>
                    <div className="min-w-full h-full shrink-0">
                        <DiffusionAnimation resetKey={resetKeys[1]}/>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-ink/[0.08] z-10">
                    <div ref={barRef} className="h-full bg-accent w-0"/>
                </div>
            </div>

            {/* Nav */}
            <div className="flex items-center justify-center gap-5 pt-[14px]">
                <button
                    type="button"
                    onClick={() => goTo(currentRef.current - 1)}
                    className="font-mono text-[14px] text-ink opacity-50 hover:opacity-100 hover:bg-ink/[0.06] px-3 py-1 rounded transition-opacity"
                >
                    &lt;
                </button>

                <div className="flex gap-[10px] items-center">
                    {Array.from({ length: TOTAL }, (_, i) => (
                        <button
                            key={i}
                            type="button"
                            onClick={() => goTo(i)}
                            className={`w-[7px] h-[7px] rounded-full transition-all duration-300 ${
                                i === current ? 'bg-ink scale-[1.35]' : 'bg-ink/20'
                            }`}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => goTo(currentRef.current + 1)}
                    className="font-mono text-[14px] text-ink opacity-50 hover:opacity-100 hover:bg-ink/[0.06] px-3 py-1 rounded transition-opacity"
                >
                    &gt;
                </button>
            </div>
        </div>
    )
}
