import type { Project } from './types'

export const projects: Project[] = [
    {
        id:    'p3',
        title: 'Pneumonia AI',
        kind:  'Deep Learning',
        year:  '2026',
        role:  'projects:p3.role',
        stack: ['NumPy', 'OpenCV', 'Pillow', 'Python'],
        desc:  'projects:p3.desc',
        metrics: [
            { k: 'projects:p3.metrics.dataset',   v: '15,000 imgs' },
            { k: 'projects:p3.metrics.classes',   v: '3'           },
            { k: 'projects:p3.metrics.cnnBlocks', v: '5×3'         },
        ],
    },
    {
        id:    'p2',
        title: 'VoirAnime DarkMod',
        kind:  'Full Stack',
        year:  '2023 - 2026',
        role:  'projects:p2.role',
        stack: ['JavaScript', 'CSS', 'Chrome API', 'Firefox API'],
        desc:  'projects:p2.desc',
        metrics: [
            { k: 'projects:p2.metrics.version', v: '2.1.5' },
            { k: 'projects:p2.metrics.user',    v: '+1100'  },
            { k: 'projects:p2.metrics.license', v: 'GPLv3' },
        ],
    },
    {
        id:    'p1',
        title: 'Jardin Connecté',
        kind:  'Full Stack',
        year:  '2024',
        role:  'projects:p1.role',
        stack: ['PHP', 'Node.js', 'MySQL', 'MQTT', 'JavaScript', 'LoRaWAN'],
        desc:  'projects:p1.desc',
        metrics: [
            { k: 'projects:p1.metrics.sensors',  v: '4'       },
            { k: 'projects:p1.metrics.dbTables', v: '14'      },
            { k: 'projects:p1.metrics.iotProto', v: 'LoRaWAN' },
        ],
    },
]
