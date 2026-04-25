import FolioLabel from '../ui/FolioLabel'
import ProjectCard from '../features/ProjectCard'
import type { Project } from '../../data'

interface WorkSectionProps {
    projects: Project[]
}

export default function WorkSection({projects}: WorkSectionProps) {
    return (
        <section className="px-8 py-[60px] border-b border-ink max-md:px-[14px] max-md:py-6">
            <div className="max-w-[var(--max-w)] mx-auto">
                {/* Header */}
                <div className="">
                    <FolioLabel number="03" title="An Index of Recent Work"/>
                    <h2
                        className="font-serif leading-tighter tracking-heading max-md:mt-1.5"
                        style={{fontSize: 'var(--fs-work-h2)'}}
                    >
                        Six projects, <em className="italic text-muted">in order.</em>
                    </h2>
                </div>

                {/* Grid */}
                <div className="
                    mt-10 max-md:mt-[14px]
                    grid grid-cols-1 gap-[14px]
                    md:grid-cols-2 md:gap-5
                ">
                    {projects.map((p, i) => (
                        <ProjectCard key={p.id} project={p} index={i}/>
                    ))}
                </div>
            </div>
        </section>
    )
}
