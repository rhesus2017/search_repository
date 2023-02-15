import { Modal } from "antd";
import { useQuery } from "react-query";
import { getRepositoryListAPI } from "../apis/repositoryAPI";

export const useRepositoryListQuery = (keyword: string) => {
  return useQuery(
    ["getRepositoryList", keyword],
    async () => getRepositoryListAPI(keyword),
    {
      retry: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      onError: () => {
        Modal.error({
          title: "알림",
          content: "레포지토리 목록을 가져오는 중 오류가 발생했습니다.",
        });
      },
    }
  );
};
