import { clsx } from 'clsx'

interface MonoLabelProps {
    children: React.ReactNode
    muted?: boolean
    className?: string
}

export default function MonoLabel({ children, muted = true, className }: MonoLabelProps) {
    return (
        <p className={clsx(
            'font-mono text-[9px] tracking-widest uppercase',
            muted ? 'text-muted' : 'text-ink',
            className,
        )}>
            {children}
        </p>
    )
}
