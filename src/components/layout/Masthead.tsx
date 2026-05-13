import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../ui/LanguageSwitcher'

function useMastheadDate() {
    const { i18n } = useTranslation()
    const now   = new Date()
    const years = now.getFullYear() - 2022
    const month = new Intl.DateTimeFormat(i18n.language, { month: 'long' }).format(now)
    const year  = now.getFullYear()
    return { years, month, year }
}

export default function Masthead() {
    const { t } = useTranslation()
    const { years, month, year } = useMastheadDate()

    return (
        <header className="
            border-b-2 border-ink sticky top-0 bg-bg z-50
            px-8 py-[14px] max-md:px-[14px] max-md:py-[10px]
            max-md:flex max-md:flex-col max-md:items-center max-md:gap-1
            md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-6
        ">
            <span className="font-mono text-[10px] tracking-wider uppercase text-muted max-md:text-[8px]">
                {t('common:masthead.yearsOfPractice', { count: years })} · {month}&nbsp;{year}
            </span>
            <Link to="/" className="font-serif text-[22px] tracking-[-0.01em] text-ink no-underline max-md:text-[18px]">
                {t('common:masthead.title')}
            </Link>
            <div className="flex flex-col items-end gap-1 max-md:items-center">
                <span className="font-mono text-[10px] tracking-wider uppercase text-muted max-md:text-[8px]">
                    {t('common:masthead.location')}&nbsp;·&nbsp;<span className="text-accent">●&nbsp;{t('common:masthead.status')}</span>
                </span>
                <LanguageSwitcher/>
            </div>
        </header>
    )
}
