export type ProjectKind = 'Deep Learning' | 'Full Stack'
export type WritingTag  = 'ML' | 'WEB'

export type I18nKey = string

export interface Metric {
    k: I18nKey
    v: string
}

export interface Project {
    id:      string
    title:   string
    kind:    ProjectKind
    year:    string
    role:    I18nKey
    stack:   string[]
    desc:    I18nKey
    metrics: Metric[]
}

export interface StackData {
    Languages: string[]
    Frontend:  string[]
    Backend:   string[]
    ML:        string[]
    Infra:     string[]
}

export interface ExperienceEntry {
    y:    string
    role: I18nKey
    org:  string
    note: I18nKey
}

export interface WritingEntry {
    t:    I18nKey
    d:    string
    tag:  WritingTag
    link: string
}

export interface GithubRepo {
    name:  string
    stars: string
    desc:  I18nKey
    lang:  string
}

export interface ContactData {
    email:    string[]
    github:   string[]
    linkedIn: string[]
    codepen:  string[]
}
