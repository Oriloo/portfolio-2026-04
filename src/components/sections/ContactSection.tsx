import { useTranslation } from 'react-i18next'
import FolioLabel from '../ui/FolioLabel'
import ContactItem from '../features/ContactItem'
import type { ContactData } from '../../data'

interface ContactSectionProps {
    data: ContactData
}

export default function ContactSection({ data }: ContactSectionProps) {
    const { t } = useTranslation()

    return (
        <section className="px-8 py-[80px] bg-ink text-bg max-md:px-[14px] max-md:py-10 max-md:pb-[60px]">
            <div className="max-w-[var(--max-w)] mx-auto">
                <FolioLabel number="08" title={t('home:contact.folioTitle')} inverted/>

                <h2
                    className="font-serif leading-tighter tracking-display"
                    style={{fontSize: 'var(--fs-contact-h2)'}}
                >
                    {t('home:contact.heading')} <em className="italic text-accent">{t('home:contact.headingEmphasis')}</em>
                </h2>

                <div className="mt-12 border border-white/30 grid grid-cols-1 md:grid-cols-4 max-md:mt-6">
                    {(Object.entries(data) as [keyof ContactData, string[]][]).map(([k, v]) => (
                        <ContactItem key={k} label={t(`common:contactLabels.${k}`)} value={v}/>
                    ))}
                </div>
            </div>
        </section>
    )
}
