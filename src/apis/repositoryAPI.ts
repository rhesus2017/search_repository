import axios from "axios";
import { RepositoryList } from "../models/repository";

const PER_PAGE = 80;

export const getRepositoryListAPI = async (keyword: string, page: number) => {
  const { data } = await axios.get<RepositoryList>(
    `https://api.github.com/search/repositories?q=${keyword}&per_page=${PER_PAGE}&page=${page}`
  );

  return {
    items: data.items,
    nextPage: page + 1,
    isLast: data.items.length < PER_PAGE
  }
};
