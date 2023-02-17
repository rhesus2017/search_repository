import axios from "axios";
import { IssueData, RepositoryList } from "../models/repository";

const PER_PAGE = 80;

export const getRepositoryListAPI = async (keyword: string, page: number) => {
  const { data } = await axios.get<RepositoryList>(
    `https://api.github.com/search/repositories?q=${keyword}&per_page=${PER_PAGE}&page=${page}`
  );

  return {
    items: data.items,
    nextPage: page + 1,
    isLast: data.items.length < PER_PAGE,
  };
};

export const getIssueListAPI = async (keyword: string, page: number) => {
  const [owner, name] = keyword.split("/");
  const { data } = await axios.get<IssueData[]>(
    `https://api.github.com/repos/${owner}/${name}/issues?per_page=100&page=${page}`
  );

  return data;
};
