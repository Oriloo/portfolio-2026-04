import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'

const LANGUAGES = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ja', label: 'JA' },
] as const

export default function LanguageSwitcher() {
    const { i18n } = useTranslation()
    const current  = i18n.language.slice(0, 2)

    return (
        <div className="flex items-center gap-1 font-mono text-[9px] tracking-wider uppercase max-md:text-[8px]">
            {LANGUAGES.map(({ code, label }, i) => (
                <>
                    {i > 0 && <span key={`sep-${code}`} className="text-muted/40">·</span>}
                    <button
                        key={code}
                        onClick={() => i18n.changeLanguage(code)}
                        className={clsx(
                            'bg-transparent border-none cursor-pointer p-0 font-mono tracking-wider uppercase transition-colors',
                            current === code
                                ? 'text-ink'
                                : 'text-muted hover:text-ink',
                        )}
                    >
                        {label}
                    </button>
                </>
            ))}
        </div>
    )
}
