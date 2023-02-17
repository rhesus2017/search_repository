import { message } from "antd";
import { useInfiniteQuery, useQueries } from "react-query";
import { getIssuesListAPI, getRepositoryListAPI } from "../apis/repositoryAPI";
import { useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import { issuesKeys, repositoryKeys } from "./queryKeys";

export const useRepositoryListQuery = (keyword: string) => {
  const query = useInfiniteQuery(
    repositoryKeys.list(keyword),
    ({ pageParam = 1 }) => getRepositoryListAPI(keyword, pageParam),
    {
      getNextPageParam: ({ isLast, nextPage }) => {
        if (!isLast) return nextPage;
      },
      onError: () => {
        message.error("레포지토리 목록을 가져오는 중 오류가 발생했습니다.");
      },
    }
  );

  const items = query.data?.pages
    ? query.data.pages.map((page) => page.items).flat()
    : [];
  const total_count = items.length || 0;

  return { ...query, items, total_count };
};

export const useIssuesListQuery = (page: number) => {
  const favoriteList = useAppSelector((state: RootState) => state.favoriteList);

  const queries = useQueries(
    favoriteList.map((row, _index, array) => {
      return {
        queryKey: issuesKeys.list(array.length, row.id, page),
        queryFn: () => getIssuesListAPI(row.full_name, page),
      };
    })
  );

  const items = queries.length ? queries.map((query) => query.data).flat() : [];

  return { items };
};
