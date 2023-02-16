export interface RepositoryList {
  items: RepositoryListItem[];
  total_count: number;
}

export interface RepositoryListItem {
  id: number;
  full_name: string;
  html_url: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

export interface IssueData {
  number: number;
  created_at: string;
  title: string;
  html_url: string;
  repository_url: string;
  pull_request: object;
  labels: { name: string; color: string }[];
  user: { login: string };
}
