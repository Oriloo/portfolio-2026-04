import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'
import { useDigitClassifier } from '../../hooks/useDigitClassifier'

export default function DigitClassifier() {
    const { t } = useTranslation()
    const { canvasRef, probs, topDigit, hasContent, clearCanvas } = useDigitClassifier()

    return (
        <div className="flex flex-col gap-5 md:flex-row md:items-stretch font-mono text-ink">

            {/* Left — canvas */}
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center text-[10px] tracking-[0.12em] uppercase text-muted">
                    <span>{t('home:playground.input')}</span>
                    <button
                        onClick={clearCanvas}
                        className="bg-transparent border border-ink/20 text-muted font-mono text-[9px] px-[7px] py-[3px] cursor-pointer tracking-[0.1em] hover:bg-ink hover:text-bg transition-colors"
                    >
                        {t('home:playground.clear')}
                    </button>
                </div>

                <canvas
                    ref={canvasRef}
                    className="block bg-black/5 border border-ink rounded-sm cursor-crosshair touch-none"
                />

                <p className="text-[10px] tracking-[0.08em] text-muted min-h-[1.4em]">
                    {hasContent ? (
                        <>
                            {t('home:playground.prediction')}{' '}
                            <span className="text-accent font-semibold">{topDigit}</span>
                            {' · '}{t('home:playground.conf')}{' '}
                            {(probs[topDigit] * 100).toFixed(1)}%
                        </>
                    ) : (
                        <span className="opacity-65">{t('home:playground.drawPrompt')}</span>
                    )}
                </p>
            </div>

            {/* Right — softmax bars */}
            <div className="flex-1 flex flex-col gap-1 min-w-0">
                <p className="text-[10px] tracking-[0.12em] uppercase text-muted mb-1">
                    {t('home:playground.softmaxOutput')}
                </p>
                {probs.map((p, i) => {
                    const isTop = i === topDigit && hasContent
                    return (
                        <div key={i} className="flex items-center gap-2 text-[11px]">
                            <span className={clsx('w-3 font-mono', isTop ? 'text-accent font-semibold' : 'text-muted')}>
                                {i}
                            </span>
                            <div className="flex-1 h-[10px] bg-black/6 border border-black/12 relative overflow-hidden">
                                <div
                                    className={clsx('bar-fill absolute inset-0', isTop ? 'bg-accent' : 'bg-black/20')}
                                    style={{ width: `${p * 100}%` }}
                                />
                            </div>
                            <span className={clsx(
                                'w-[38px] text-right text-[10px] font-mono tabular-nums',
                                isTop ? 'text-accent' : 'text-muted',
                            )}>
                                {(p * 100).toFixed(1)}%
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
