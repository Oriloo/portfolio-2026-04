import ExperienceItem from '../features/ExperienceItem'
import WritingItem from '../features/WritingItem'
import OssItem from '../features/OssItem'
import type { ExperienceEntry, WritingEntry, GithubRepo } from '../../data'
import FolioLabel from "../ui/FolioLabel.tsx";

interface AboutSectionProps {
    experience: ExperienceEntry[]
    writing: WritingEntry[]
    github: GithubRepo[]
}

export default function AboutSection({experience, writing, github}: AboutSectionProps) {
    return (
        <section className="
            px-8 py-[60px] border-b border-ink
            max-md:px-[14px] max-md:py-6
        ">
            <div className="
                max-w-[var(--max-w)] mx-auto
                grid grid-cols-1 gap-0
                md:grid-cols-[1.2fr_1fr] md:gap-[60px]
            ">
                {/* Experience */}
                <div>
                    <FolioLabel number="05" title="Chronology"/>
                    {experience.map((e, i) => <ExperienceItem key={i} entry={e}/>)}
                </div>

                {/* Writing + OSS */}
                <div className="max-md:mt-6">
                    <FolioLabel number="06" title="Writing"/>
                    {writing.map((w, i) => <WritingItem key={i} entry={w}/>)}

                    <div className="mt-10">
                        <FolioLabel number="07" title="Open source"/>
                        {github.map((g, i) => <OssItem key={i} repo={g}/>)}
                    </div>
                </div>
            </div>
        </section>
    )
}
