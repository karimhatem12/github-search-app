export interface GitHubUser {
    login: string;
    avatar_url: string;
    html_url: string;
    public_repos: number;
    followers: number;
    bio: string;
}

export interface GitHubUserState {
    users: GitHubUser[];
    selectedUser: GitHubUser | null;
    loading: boolean;
    error: string | null;
    totalCount: number;
}