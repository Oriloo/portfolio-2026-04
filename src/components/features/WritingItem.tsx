import { clsx } from 'clsx'
import type { WritingEntry } from '../../data'

interface WritingItemProps {
    entry: WritingEntry
}

export default function WritingItem({entry}: WritingItemProps) {
    return (
        <div
            className="py-4 border-t border-ink grid grid-cols-[28px_1fr] gap-[10px] md:grid-cols-[40px_1fr_80px] md:gap-3 items-baseline">
            <span className={clsx(
                'font-mono text-[9px] tracking-[0.12em]',
                entry.tag === 'ML' ? 'text-accent' : 'text-muted',
            )}>
                {entry.tag}
            </span>
            <a href={entry.link} target="_blank" className="font-serif text-[18px] leading-[1.25] text-ink text-pretty max-md:text-[15px]">
                {entry.t}
            </a>
            <span className="font-mono text-[10px] text-muted text-right hidden md:block">
                {entry.d}
            </span>
        </div>
    )
}
