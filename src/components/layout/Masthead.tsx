import { Link } from 'react-router-dom'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]

function useMastheadDate() {
    const now = new Date()
    const vol = now.getFullYear() - 2019
    const issue = String(now.getMonth() + 1).padStart(2, '0')
    const month = MONTHS[now.getMonth()]
    const year = now.getFullYear()
    return {vol, issue, month, year}
}

export default function Masthead() {
    const {vol, issue, month, year} = useMastheadDate()

    return (
        <header className="
            border-b-2 border-ink sticky top-0 bg-bg z-50
            px-8 py-[14px] max-md:px-[14px] max-md:py-[10px]
            max-md:flex max-md:flex-col max-md:items-center max-md:gap-1
            md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6
        ">
            <span className="font-mono text-[10px] tracking-wider uppercase text-muted max-md:text-[8px]">
                Vol.&nbsp;{String(vol).padStart(2, '0')} · Issue&nbsp;{issue} · {month}&nbsp;{year}
            </span>
            <Link to="/" className="font-serif text-[22px] tracking-[-0.01em] text-ink no-underline max-md:text-[18px]">
                The Pol-Mattis Harquet Portfolio
            </Link>
            <span className="font-mono text-[10px] tracking-wider uppercase text-muted text-right max-md:text-[8px] max-md:text-center">
                Nancy&nbsp;·&nbsp;FR&nbsp;·&nbsp;<span className="text-accent">●&nbsp;currently in a work-study program</span>
            </span>
        </header>
    )
}
