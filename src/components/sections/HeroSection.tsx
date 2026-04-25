import FolioLabel from '../ui/FolioLabel'

export default function HeroSection() {
    return (
        <section className="px-8 pt-[60px] pb-[80px] border-b border-ink max-md:px-[14px] max-md:pt-6 max-md:pb-[30px]">
            <div className="max-w-[var(--max-w)] mx-auto">
                <FolioLabel number="01" title="An Introduction"/>

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
                    builder of web things &amp;<br/>
                    <span className="not-italic font-sans font-medium text-accent" style={{fontSize: '0.9em'}}>
                        artificial intelligence
                    </span>{' '}
                    expert.
                </p>

                <div
                    className="grid grid-cols-1 gap-5 mt-6 pt-4 border-t border-ink md:grid-cols-3 md:gap-10 md:mt-[60px] md:pt-8">
                    <p className="font-serif text-[19px] leading-[1.45] text-pretty max-md:text-[15px]">
                        I build end-to-end web products and train deep learning models. What interests me is deploying
                        real models into production, not just notebooks. I work on system architecture as well as data
                        and inference layers.
                    </p>

                    <div>
                        <p className="font-mono text-[9px] tracking-widest uppercase text-muted">Currently</p>
                        <p className="font-serif italic text-[16px] leading-[1.4] mt-[10px] max-md:text-[14px]">
                            Training a sketch-to-3D multimodal model. I work part-time for a startup while continuing my
                            studies in artificial intelligence. Writing more than last year.
                        </p>
                    </div>

                    <div>
                        <p className="font-mono text-[9px] tracking-widest uppercase text-muted">Selected press</p>
                        <p className="font-serif text-[15px] leading-[1.5] mt-[10px]">
                            FR: "On peut en avoir peur ou pas mais si vous parlez de prise de contrôle du monde par les
                            machines, je crois que nous dramatisons !"
                            <br/>
                            EN: "We can be afraid of it or not, but if you are talking about machines taking over the
                            world, I think we are being overly dramatic!"
                            <br/>
                            <em className="text-muted">Yann Le Cun, 2022</em>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
