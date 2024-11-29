export interface Repository {
    id: number
    name: string
    full_name: string
    description: string
    language: string
    stargazers_count: number
    forks_count: number
    open_issues_count: number
    topics: string[]
    html_url: string
    owner: {
        login: string
        avatar_url: string
    }
}