import FolioLabel from '../ui/FolioLabel'
import DigitClassifier from '../features/DigitClassifier'

const STATS = [
    { k: 'Params',   v: '120k'  },
    { k: 'Accuracy', v: '98.4%' },
    { k: 'Latency',  v: '4ms'   },
] as const

export default function PlaygroundSection() {
    return (
        <section className="px-8 py-[60px] border-b border-ink bg-paper max-md:px-[14px] max-md:py-6">
            <div className="max-w-[var(--max-w)] mx-auto">
                <FolioLabel number="02" title="A Small Convolutional Net"/>

                <div className="grid grid-cols-1 gap-6 items-start md:grid-cols-[1.1fr_1fr] md:gap-[60px]">

                    {/* Left — description */}
                    <div>
                        <h2
                            className="font-serif leading-tight tracking-heading"
                            style={{fontSize: 'var(--fs-play-h2)'}}
                        >
                            Draw a digit.<br/>
                            <em className="italic text-muted">Watch it think.</em>
                        </h2>

                        <p className="font-serif text-[19px] leading-[1.5] mt-6 max-w-[440px] text-pretty max-md:text-[14px] max-md:mt-[14px]">
                            A 120k-parameter convolutional network, trained on MNIST, running entirely in your
                            browser via WebAssembly. No server round-trip. The same pattern I use to deploy
                            production inference on edge devices.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-px bg-ink border border-ink mt-8 max-md:mt-[18px]">
                            {STATS.map(({k, v}) => (
                                <div key={k} className="bg-paper px-4 py-[14px]">
                                    <p className="font-mono text-[9px] tracking-wider uppercase text-muted">{k}</p>
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
