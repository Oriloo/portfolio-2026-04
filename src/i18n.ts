import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enCommon     from './locales/en/common.json'
import enHome       from './locales/en/home.json'
import enProjects   from './locales/en/projects.json'
import enExperience from './locales/en/experience.json'
import enWriting    from './locales/en/writing.json'
import enGithub     from './locales/en/github.json'

import frCommon     from './locales/fr/common.json'
import frHome       from './locales/fr/home.json'
import frProjects   from './locales/fr/projects.json'
import frExperience from './locales/fr/experience.json'
import frWriting    from './locales/fr/writing.json'
import frGithub     from './locales/fr/github.json'

import jaCommon     from './locales/ja/common.json'
import jaHome       from './locales/ja/home.json'
import jaProjects   from './locales/ja/projects.json'
import jaExperience from './locales/ja/experience.json'
import jaWriting    from './locales/ja/writing.json'
import jaGithub     from './locales/ja/github.json'

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common:     enCommon,
                home:       enHome,
                projects:   enProjects,
                experience: enExperience,
                writing:    enWriting,
                github:     enGithub,
            },
            fr: {
                common:     frCommon,
                home:       frHome,
                projects:   frProjects,
                experience: frExperience,
                writing:    frWriting,
                github:     frGithub,
            },
            ja: {
                common:     jaCommon,
                home:       jaHome,
                projects:   jaProjects,
                experience: jaExperience,
                writing:    jaWriting,
                github:     jaGithub,
            },
        },
        fallbackLng: 'en',
        defaultNS:   'common',
        ns:          ['common', 'home', 'projects', 'experience', 'writing', 'github'],
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order:  ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    })

export default i18n
