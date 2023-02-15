import axios from "axios";
import { RepositoryList } from "../models/repository";

export const getRepositoryListAPI = async (keyword: string) => {
  const { data } = await axios.get<RepositoryList>(
    `https://api.github.com/search/repositories?q=${keyword}&per_page=60`
  );
  return data;
};
