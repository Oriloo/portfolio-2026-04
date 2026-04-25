import type { Project } from './types'

export const projects: Project[] = [
    {
        id:    'p3',
        title: 'Pneumonia AI',
        kind:  'Deep Learning',
        year:  '2026',
        role:  'Research & Eng',
        stack: ['NumPy', 'OpenCV', 'Pillow', 'Python'],
        desc:  "CNN built from scratch (no ML framework) to classify chest X-rays into 3 classes: Normal, Bacterial Pneumonia, Viral Pneumonia. Full pipeline: convolution, ReLU, pooling, GAP, CAM and FC layers, with data augmentation across 15,000 images.",
        metrics: [
            { k: 'dataset',    v: '15,000 imgs' },
            { k: 'classes',    v: '3'           },
            { k: 'CNN blocks', v: '5×3'         },
        ],
    },
    {
        id:    'p2',
        title: 'VoirAnime DarkMod',
        kind:  'Full Stack',
        year:  '2023 - 2026',
        role:  'Design & Eng',
        stack: ['JavaScript', 'CSS', 'Chrome API', 'Firefox API'],
        desc:  "Open-source browser extension for VoirAnime adding dark/light theming, modular CSS architecture, auto player selection, and a fully configurable popup. Available on Chrome Web Store and Firefox Add-ons.",
        metrics: [
            { k: 'version',  v: '2.1.5' },
            { k: 'user',     v: '+1100' },
            { k: 'license',  v: 'GPLv3' },
        ],
    },
    {
        id:    'p1',
        title: 'Jardin Connecté',
        kind:  'Full Stack',
        year:  '2024',
        role:  'Research & Eng',
        stack: ['PHP', 'Node.js', 'MySQL', 'MQTT', 'JavaScript', 'LoRaWAN'],
        desc:  "Connected garden management system with automated watering control based on real-time sensor data (temperature, air & soil humidity, luminosity). Dashboard with live charts, historical logs, alert thresholds, scheduling, and CSV data export. IoT pipeline via MQTT/TTN with LoRaWAN sensors.",
        metrics: [
            { k: 'sensors',   v: '4'       },
            { k: 'DB tables', v: '14'      },
            { k: 'IoT proto', v: 'LoRaWAN' },
        ],
    },
]
