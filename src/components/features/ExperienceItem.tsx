import { useTranslation } from 'react-i18next'
import type { ExperienceEntry } from '../../data'

interface ExperienceItemProps {
    entry: ExperienceEntry
}

export default function ExperienceItem({ entry }: ExperienceItemProps) {
    const { t } = useTranslation()
    return (
        <div className="py-5 border-t border-ink grid grid-cols-1 gap-1 md:grid-cols-[160px_1fr] md:gap-6">
            <span className="font-mono text-[11px] tracking-[0.06em] text-muted max-md:text-[10px]">
                {entry.y}
            </span>
            <div>
                <p className="font-serif text-[26px] leading-[1.1] max-md:text-[20px] mt-1 md:mt-0">
                    {t(entry.role)}
                    <em className="italic text-muted">, {entry.org}</em>
                </p>
                <p className="font-serif italic text-[16px] text-muted mt-1.5 leading-[1.4] max-md:text-[13px]">
                    {t(entry.note)}
                </p>
            </div>
        </div>
    )
}
