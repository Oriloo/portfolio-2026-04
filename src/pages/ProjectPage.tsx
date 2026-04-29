import { useParams, Link, Navigate } from 'react-router-dom'
import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'
import { projects } from '../data'
import Masthead from '../components/layout/Masthead'
import Footer from '../components/layout/Footer'

export default function ProjectPage() {
    const { t } = useTranslation()
    const { id } = useParams<{ id: string }>()
    const project = projects.find(p => p.id === id)

    if (!project) return <Navigate to="/" replace />

    const isML  = project.kind === 'Deep Learning'
    const index = projects.indexOf(project)
    const prev  = projects[index - 1] ?? null
    const next  = projects[index + 1] ?? null

    return (
        <div className="bg-bg text-ink font-sans min-h-screen flex flex-col">
            <Masthead />

            <main className="flex-1">
                {/* Header */}
                <div className={clsx('px-8 pt-[60px] pb-[80px] border-b border-ink max-md:px-[14px] max-md:pt-6 max-md:pb-[30px] bg-paper', isML && '!bg-ink text-bg')}>
                    <div className="max-w-[var(--max-w)] mx-auto">
                        {/* Back */}
                        <Link
                            to="/#folio03"
                            className={clsx(
                                'inline-flex items-center gap-2 font-mono text-[10px] tracking-wider uppercase mb-8 no-underline hover:underline max-md:mb-4',
                                isML ? 'text-white/60' : 'text-muted',
                            )}
                        >
                            {t('home:project.back')}
                        </Link>

                        {/* Meta */}
                        <div className={clsx('flex items-center gap-4 font-mono text-[10px] tracking-wider uppercase mb-4', isML ? 'text-white/60' : 'text-muted')}>
                            <span>№ {String(index + 1).padStart(3, '0')}</span>
                            <span>·</span>
                            <span>{t(`common:projectKinds.${project.kind}`)}</span>
                            <span>·</span>
                            <span>{project.year}</span>
                        </div>

                        <h1 className={clsx('font-serif leading-tighter tracking-display', isML ? 'text-bg' : 'text-ink')} style={{ fontSize: 'var(--fs-hero)' }}>
                            {project.title}
                        </h1>
                        <p className={clsx('font-mono text-[12px] tracking-wider uppercase mt-3', isML ? 'text-white/60' : 'text-muted')}>
                            — {t(project.role)}
                        </p>
                    </div>
                </div>

                {/* Body */}
                <div className="px-8 py-[60px] border-b border-ink max-md:px-[14px] max-md:py-6">
                    <div className="max-w-[var(--max-w)] mx-auto grid grid-cols-1 gap-[60px] md:grid-cols-[1fr_320px] md:items-start">
                        {/* Description */}
                        <div>
                            <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-3">
                                {t('home:project.abstract')}
                            </p>
                            <p className="font-serif italic text-[22px] leading-[1.45] text-pretty max-md:text-[17px]">
                                {t(project.desc)}
                            </p>

                            <div className="mt-8">
                                <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-3">
                                    {t('home:project.stack')}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {project.stack.map(s => (
                                        <span key={s} className="border border-ink px-3 py-1 font-mono text-[12px] tracking-[0.06em]">
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Metrics sidebar */}
                        <div className="border border-ink">
                            <div className="px-5 py-3 border-b border-ink bg-ink">
                                <p className="font-mono text-[10px] tracking-wider uppercase text-white/60">
                                    {t('home:project.metrics')}
                                </p>
                            </div>
                            {project.metrics.map((m, i) => (
                                <div key={m.k} className={clsx('px-5 py-5', i < project.metrics.length - 1 && 'border-b border-ink')}>
                                    <p className="font-mono text-[9px] tracking-wider uppercase text-muted">{t(m.k)}</p>
                                    <p className={clsx('font-serif text-[42px] leading-none mt-1', isML ? 'text-accent' : 'text-ink')}>
                                        {m.v}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Prev / Next navigation */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                    {prev ? (
                        <Link
                            to={`/projects/${prev.id}`}
                            className="px-8 py-8 border-r border-ink"
                        >
                            <div className="max-w-[calc(var(--max-w)/2-32px)] ml-auto no-underline group max-md:px-[14px] max-md:border-r-0">
                                <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-2">
                                    {t('home:project.previous')}
                                </p>
                                <p className="font-serif text-[32px] leading-tight text-ink group-hover:text-accent transition-colors max-md:text-[24px]">
                                    {prev.title}
                                </p>
                            </div>
                        </Link>
                    ) : <div className="border-r border-ink max-md:hidden" />}

                    {next ? (
                        <Link
                            to={`/projects/${next.id}`}
                            className="px-8 py-8 border-ink"
                        >
                            <div className="max-w-[calc(var(--max-w)/2-32px)] mr-auto no-underline group text-right max-md:px-[14px] max-md:text-left">
                                <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-2">
                                    {t('home:project.next')}
                                </p>
                                <p className="font-serif text-[32px] leading-tight text-ink group-hover:text-accent transition-colors max-md:text-[24px]">
                                    {next.title}
                                </p>
                            </div>
                        </Link>
                    ) : <div className="" />}
                </div>
            </main>

            <Footer />
        </div>
    )
}
