import { message } from "antd";
import { useInfiniteQuery } from "react-query";
import { getRepositoryListAPI } from "../apis/repositoryAPI";
import { repositoryKeys } from "./queryKeys";


export const useRepositoryListQuery = (keyword: string) => {
  const query = useInfiniteQuery(
    repositoryKeys.list(keyword), ({ pageParam = 1 }) => getRepositoryListAPI(keyword, pageParam),
    {
      getNextPageParam: ({ isLast, nextPage}) => {
        if (!isLast) return nextPage;
      },
      onError: () => {
        message.error('레포지토리 목록을 가져오는 중 오류가 발생했습니다.');
      },
    }
  );

  const items = query.data?.pages ? query.data.pages.map(page => page.items).flat() : [];
  const total_count = items ? items.length : 0;

  return {...query, items, total_count}
};
