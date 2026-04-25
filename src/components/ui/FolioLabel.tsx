import { clsx } from 'clsx'

interface FolioLabelProps {
    number: string
    title: string
    inverted?: boolean
    className?: string
}

export default function FolioLabel({number, title, inverted = false, className}: FolioLabelProps) {
    return (
        <div id={'folio' + number} className={clsx(
            'flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase mb-6',
            inverted ? 'text-white/50' : 'text-muted',
            className,
        )}>
            <span>Folio {number}</span>
            <span className={clsx('flex-shrink-0 h-px w-[60px] max-md:w-5', inverted ? 'bg-white/30' : 'bg-ink')}/>
            <span>{title}</span>
        </div>
    )
}
