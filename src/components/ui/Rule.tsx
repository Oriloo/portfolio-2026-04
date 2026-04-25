import { clsx } from 'clsx'

interface RuleProps {
    weight?: 1 | 2
    className?: string
}

export default function Rule({ weight = 1, className }: RuleProps) {
    return (
        <div className={clsx(
            'w-full bg-ink',
            weight === 2 ? 'h-0.5' : 'h-px',
            className,
        )} />
    )
}
