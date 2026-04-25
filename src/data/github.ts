import type { GithubRepo } from './types'

export const github: GithubRepo[] = [
    { name: 'sparse-attn-kernel', stars: '2.4k', desc: 'Hand-written CUDA kernel for sparse attention.',          lang: 'CUDA'   },
    { name: 'tiny-diffusion',     stars: '1.1k', desc: 'Minimal latent diffusion implementation in < 600 lines.', lang: 'Python' },
    { name: 'embed-atlas',        stars: '890',  desc: 'WebGL visualiser for high-dim embeddings.',               lang: 'TS'     },
    { name: 'claude-streamer',    stars: '620',  desc: 'Typed streaming client for anthropic.',                   lang: 'TS'     },
]
