export const repositoryKeys = {
  list: (keyword: string) => ["getRepositoryList", keyword]
}

export const issuesKeys = {
  list: (listLength: number, id: number) => ["getIssuesList", listLength, id]
}