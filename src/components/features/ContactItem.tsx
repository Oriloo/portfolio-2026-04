interface ContactItemProps {
    label: string
    value: string
}

export default function ContactItem({label, value}: ContactItemProps) {
    return (
        <div
            className="px-5 py-5 border-b border-white/30 md:border-b-0 md:border-r md:border-white/30 last:border-0 max-md:px-[14px] max-md:py-[14px]">
            <p className="font-mono text-[9px] tracking-wider uppercase text-white/50">{label}</p>
            <p className="font-serif italic text-[18px] text-bg mt-2 max-md:text-[17px]">{value}</p>
        </div>
    )
}
