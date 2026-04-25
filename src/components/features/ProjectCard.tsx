import { Link } from 'react-router-dom'
import { clsx } from 'clsx'
import Rule from '../ui/Rule'
import type { Project } from '../../data'

interface ProjectCardProps {
    project: Project
    index: number
}

export default function ProjectCard({project, index}: ProjectCardProps) {
    const isML = project.kind === 'Deep Learning'

    return (
        <Link
            to={`/projects/${project.id}`}
            className="border border-ink bg-paper flex flex-col no-underline text-ink group"
        >
            {/* Meta bar */}
            <div className={clsx(
                'grid grid-cols-[auto_1fr_auto] gap-4 px-4 py-[10px] border-b border-ink',
                'font-mono text-[10px] tracking-wider uppercase max-md:text-[8px] max-md:gap-2 max-md:px-3',
                isML ? 'bg-ink text-bg' : 'bg-paper text-ink',
            )}>
                <span>№&nbsp;{String(index + 1).padStart(3, '0')}</span>
                <span className="text-center">{project.kind}</span>
                <span>{project.year}</span>
            </div>

            {/* Title */}
            <div className="px-5 pt-7 pb-[18px] max-md:px-[14px] max-md:pt-[18px] max-md:pb-3">
                <h3 className="font-serif text-[56px] leading-tight tracking-title text-ink max-md:text-[40px]">
                    {project.title}
                </h3>
                <p className="font-mono text-[10px] tracking-wider uppercase text-muted mt-2 max-md:text-[9px]">
                    — {project.role}
                </p>
            </div>

            <Rule/>

            {/* Abstract */}
            <div className="px-5 py-[18px] max-md:px-[14px] max-md:py-3">
                <p className="font-mono text-[9px] tracking-widest uppercase text-muted mb-2">Abstract</p>
                <p className="font-serif italic text-[17px] leading-[1.45] text-pretty max-md:text-[14px]">
                    {project.desc}
                </p>
            </div>

            <Rule/>

            {/* Metrics */}
            <div
                className="grid"
                style={{gridTemplateColumns: `repeat(${project.metrics.length}, 1fr)`}}
            >
                {project.metrics.map((m, i) => (
                    <div
                        key={m.k}
                        className={clsx('px-[14px] py-4 max-md:px-[10px] max-md:py-[10px]', i < project.metrics.length - 1 && 'border-r border-ink')}
                    >
                        <p className="font-mono text-[9px] tracking-wider uppercase text-muted">{m.k}</p>
                        <p className={clsx('font-serif text-[28px] leading-none mt-1 max-md:text-[22px]', isML ? 'text-accent' : 'text-ink')}>
                            {m.v}
                        </p>
                    </div>
                ))}
            </div>

            <Rule/>

            {/* Stack */}
            <p className="px-5 py-[14px] font-mono text-[11px] tracking-[0.04em] text-ink max-md:px-[14px] max-md:py-[10px]">
                <span className="text-muted">↳ </span>
                {project.stack.join(' · ')}
            </p>
        </Link>
    )
}
