import { useTranslation } from 'react-i18next'
import FolioLabel from '../ui/FolioLabel'
import DigitClassifier from '../features/DigitClassifier'

const STATS = [
    { key: 'params',   v: '120k'  },
    { key: 'accuracy', v: '98.4%' },
    { key: 'latency',  v: '4ms'   },
] as const

export default function PlaygroundSection() {
    const { t } = useTranslation()

    return (
        <section className="px-8 py-[60px] border-b border-ink bg-paper max-md:px-[14px] max-md:py-6">
            <div className="max-w-[var(--max-w)] mx-auto">
                <FolioLabel number="02" title={t('home:playground.folioTitle')}/>

                <div className="grid grid-cols-1 gap-6 items-start md:grid-cols-[1.1fr_1fr] md:gap-[60px]">

                    {/* Left — description */}
                    <div>
                        <h2
                            className="font-serif leading-tight tracking-heading"
                            style={{fontSize: 'var(--fs-play-h2)'}}
                        >
                            {t('home:playground.heading')}<br/>
                            <em className="italic text-muted">{t('home:playground.headingEmphasis')}</em>
                        </h2>

                        <p className="font-serif text-[19px] leading-[1.5] mt-6 max-w-[440px] text-pretty max-md:text-[14px] max-md:mt-[14px]">
                            {t('home:playground.description')}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-px bg-ink border border-ink mt-8 max-md:mt-[18px]">
                            {STATS.map(({ key, v }) => (
                                <div key={key} className="bg-paper px-4 py-[14px]">
                                    <p className="font-mono text-[9px] tracking-wider uppercase text-muted">
                                        {t(`home:playground.${key}`)}
                                    </p>
                                    <p className="font-serif text-[32px] mt-1 max-md:text-[22px]">{v}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right — interactive demo */}
                    <div className="border border-ink p-6 bg-bg max-md:p-[14px]">
                        <DigitClassifier/>
                    </div>
                </div>
            </div>
        </section>
    )
}
