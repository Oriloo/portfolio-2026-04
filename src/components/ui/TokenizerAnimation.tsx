type TokenLine = [string, number][]

const LINES: TokenLine[] = [
    [['press', 0], [' ↑↑', 2], ['↓↓', 1], [' ←→', 2], [' start', 1]],
    [['hid', 2], ['den', 0], [' in', 1], [' plain', 0], [' sight', 2]],
    [['the', 0], [' real', 1], [' secret', 2], [' was', 0], [' here', 1]],
    [['secret', 2], [' room', 0], [' un', 1], ['locked', 2], [' ✓', 0]],
    [['dev', 1], [' left', 0], [' a', 2], [' note', 1], [' →', 2]],
    [['find', 0], [' all', 2], [' easter', 1], [' eggs', 2], [' →', 0]],
    [['kon', 2], ['ami', 0], [' code', 1], [' found', 2], [' ✓', 0]],
    [['the', 0], [' egg', 2], [' was', 1], [' you', 0], [' →', 2]],
]

const DOUBLED = [...LINES, ...LINES]

function tokenClass(ci: number): string {
    if (ci === 1) return 'text-ink border border-ink bg-ink/[0.06]'
    if (ci === 2) return 'text-accent border border-accent bg-accent/10 font-semibold'
    return 'text-ink border border-transparent'
}

export default function TokenizerAnimation({ resetKey = 0 }: { resetKey?: number }) {
    return (
        <>
            <div className="flex justify-between bg-bg pb-2">
                <span
                    className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted select-none">
                    tokenizer · 50,257 vocab
                </span>
                <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-accent select-none">
                    ● live
                </span>
            </div>
            <div className="w-full h-full overflow-hidden">
                <div key={resetKey} className="flex flex-col animate-scroll-tokens">
                    {DOUBLED.map((line, li) => (
                        <div key={li} className="flex gap-1 px-5 py-[5px] items-center shrink-0">
                        <span className="font-mono text-[10px] text-muted w-6 shrink-0 select-none">
                            {String((li % LINES.length) + 1).padStart(2, '0')}
                        </span>
                            {line.map(([text, ci], ti) => (
                                <span key={ti} className={`font-mono text-[15px] px-[7px] py-[3px] ${tokenClass(ci)}`}>
                                {text}
                            </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
