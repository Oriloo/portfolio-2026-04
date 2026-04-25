import FolioLabel from '../ui/FolioLabel'
import StackRow from '../features/StackRow'
import type {StackData} from '../../data'

interface StackSectionProps {
    data: StackData
}

export default function StackSection({data}: StackSectionProps) {
    return (
        <section className="px-8 py-[60px] border-b border-ink max-md:px-[14px] max-md:py-6">
            <div className="max-w-[var(--max-w)] mx-auto">
                <FolioLabel number="04" title="Tools of the Trade"/>
                <div className="border-2 border-ink mt-6 max-md:mt-2">
                    {(Object.entries(data) as [keyof StackData, string[]][]).map(([cat, items]) => (
                        <StackRow
                            key={cat}
                            category={cat === 'ML' ? 'Machine Learning' : cat}
                            items={items}
                            isML={cat === 'ML'}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
