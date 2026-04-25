import type { GithubRepo } from '../../data'

interface OssItemProps {
    repo: GithubRepo
}

export default function OssItem({repo}: OssItemProps) {
    return (
        <div className="py-[14px] border-t border-ink">
            <div className="flex justify-between items-baseline">
                <a href={'https://github.com/' + repo.name} target="_blank" className="font-mono text-[13px] text-ink">{repo.name}</a>
                <span className="font-mono text-[11px] text-muted">★ {repo.stars}</span>
            </div>
            <p className="font-serif italic text-[14px] text-muted mt-1 leading-[1.35]">{repo.desc}</p>
        </div>
    )
}
