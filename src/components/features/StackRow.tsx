import { clsx } from 'clsx'

interface StackRowProps {
    category: string
    items:    string[]
    isML:     boolean
}

export default function StackRow({ category, items, isML }: StackRowProps) {
    return (
        <div className={clsx(
            'grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-[70px]',
            '[&:not(:last-child)]:border-b [&:not(:last-child)]:border-ink',
        )}>
            <div className={clsx(
                'flex items-center px-6 py-5 font-serif text-[28px] italic border-b border-ink',
                'md:border-b-0 md:border-r md:border-ink max-md:text-[20px] max-md:px-[14px] max-md:py-[10px]',
                isML ? 'bg-ink text-bg md:border-r-bg' : 'text-ink',
            )}>
                {category}
            </div>
            <div className="px-6 py-5 flex flex-wrap gap-x-5 gap-y-1 font-serif text-[24px] items-center text-ink max-md:text-[17px] max-md:px-[14px] max-md:py-3 max-md:gap-x-3">
                {items.map((item, i) => (
                    <span key={item} className="inline-flex items-center gap-5 max-md:gap-3">
                        {item}
                        {i < items.length - 1 && (
                            <span className="text-dim italic">·</span>
                        )}
                    </span>
                ))}
            </div>
        </div>
    )
}
