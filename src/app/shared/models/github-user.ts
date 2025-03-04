export interface GithubUser {
    login: string;
    avatar_url: string;
    html_url: string;
}

export interface GithubUserSearchResponse {
    total_count: number;
    incomplete_results: boolean;
    items: GithubUser[];
}