import { useTranslation } from 'react-i18next'
import FolioLabel from '../ui/FolioLabel'

export default function HeroSection() {
    const { t } = useTranslation()

    return (
        <section className="px-8 pt-[60px] pb-[80px] border-b border-ink max-md:px-[14px] max-md:pt-6 max-md:pb-[30px]">
            <div className="max-w-[var(--max-w)] mx-auto">
                <FolioLabel number="01" title={t('home:hero.folioTitle')}/>

                <h1
                    className="font-serif leading-tighter tracking-display text-ink mt-6 max-md:mt-3"
                    style={{fontSize: 'var(--fs-hero)'}}
                >
                    Pol-Mattis<br/>
                    <span className="italic text-muted">Harquet,</span>
                </h1>

                <p
                    className="font-serif italic tracking-title text-ink mt-6 leading-tight max-md:mt-[14px]"
                    style={{fontSize: 'var(--fs-hero-sub)'}}
                >
                    {t('home:hero.taglinePart1')}<br/>
                    <span className="not-italic font-sans font-medium text-accent" style={{fontSize: '0.9em'}}>
                        {t('home:hero.taglineAccent')}
                    </span>{' '}
                    {t('home:hero.taglinePart2')}
                </p>

                <div className="grid grid-cols-1 gap-5 mt-6 pt-4 border-t border-ink md:grid-cols-3 md:gap-10 md:mt-[60px] md:pt-8">
                    <p className="font-serif text-[19px] leading-[1.45] text-pretty max-md:text-[15px]">
                        {t('home:hero.bio')}
                    </p>

                    <div>
                        <p className="font-mono text-[9px] tracking-widest uppercase text-muted">
                            {t('home:hero.currentlyLabel')}
                        </p>
                        <p className="font-serif italic text-[16px] leading-[1.4] mt-[10px] max-md:text-[14px]">
                            {t('home:hero.currently')}
                        </p>
                    </div>

                    <div>
                        <p className="font-mono text-[9px] tracking-widest uppercase text-muted">
                            {t('home:hero.pressLabel')}
                        </p>
                        <p className="font-serif text-[15px] leading-[1.5] mt-[10px]">
                            {t('home:hero.quote')}
                            <br/>
                            <em className="text-muted">{t('home:hero.quoteAttribution')}</em>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
