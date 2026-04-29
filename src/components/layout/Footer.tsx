import { useTranslation } from 'react-i18next'

export default function Footer() {
    const { t } = useTranslation()
    return (
        <footer className="
            border-t-2 border-ink bg-bg
            px-8 py-5 max-md:px-[14px] max-md:py-[14px] max-md:pb-10
            flex justify-between
            font-mono text-[10px] tracking-[0.12em] uppercase text-muted max-md:text-[8px]
        ">
            <span>{t('common:footer.copyright')}</span>
        </footer>
    )
}
