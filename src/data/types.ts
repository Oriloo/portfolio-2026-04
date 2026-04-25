export type ProjectKind = 'Deep Learning' | 'Full Stack'
export type WritingTag  = 'ML' | 'WEB'

export interface Metric {
    k: string
    v: string
}

export interface Project {
    id:      string
    title:   string
    kind:    ProjectKind
    year:    string
    role:    string
    stack:   string[]
    desc:    string
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
    role: string
    org:  string
    note: string
}

export interface WritingEntry {
    t:   string
    d:   string
    tag: WritingTag
    link: string
}

export interface GithubRepo {
    name:  string
    stars: string
    desc:  string
    lang:  string
}

export interface ContactData {
    email:    string[]
    github:   string[]
    linkedIn: string[]
    codepen:  string[]
}
