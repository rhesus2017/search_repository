/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination } from "antd";
import { AxiosResponse } from "axios";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import styled from "styled-components";
import { getIssueListAPI } from "../../../apis/repositoryAPI";
import { IssueData, RepositoryListItem } from "../../../models/repository";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import IssueCard from "./IssueCard";

interface IssueListProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const IssueList = (props: IssueListProps) => {
  const { isLoading, setIsLoading } = props;
  const favoriteList = useAppSelector((state: RootState) => state.favoriteList);
  const [pageState, setPageState] = useState(1);
  const [issueState, setIssueState] = useState<IssueData[]>([]);
  

  const issueListPromise = (page: number): Promise<AxiosResponse<IssueData[]>>[] => {
    return favoriteList.map((favorite: RepositoryListItem) => getIssueListAPI(favorite.full_name, page));
  };

  const issueListCollectionPromise = async (page: number): Promise<IssueData[]> => {
    setIsLoading(true);
    const issues: IssueData[] = [];
    const issuesList: { data: IssueData[] }[] = await Promise.all([
      ...issueListPromise(page),
    ]);

    issuesList.forEach((issue) => {
      issues.push(...issue.data);
    });

    setIsLoading(false);
    if (issues.length === 0) return [];

    const result = await issueListCollectionPromise(
      page + 1
    );
    
    return [...issues, ...result];
  };

  useEffect(() => {
    issueListCollectionPromise(1).then(response => setIssueState(response.sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )))
  }, [favoriteList.length]);

  return (
    <IssueListStyled>
      <p className="all">
        총 <span>{issueState.length}</span>
        개의 데이터가 있습니다
      </p>
      <div className="listWrap">
        {issueState.length ? (
          <Fragment>
            {issueState.slice(((pageState-1)*10), pageState*10).map(
            (item) =>
              item && (
                <IssueCard
                  key={item.id}
                  item={item}
                />
              )
          )}
            <Pagination defaultCurrent={1} total={issueState.length} showSizeChanger={false} onChange={(page) => setPageState(page)}/>
          </Fragment>
        ) : (
          !isLoading && <div className="nonData">레포지토리 이슈가 존재하지 않습니다</div>
          
        )}
      </div>
    </IssueListStyled>
  );
};

export default IssueList;

const IssueListStyled = styled.div`
  width: 80%;
  height: 100%;
  position: relative;
  padding: 0px 2px 0 30px;
  margin-top: 30px;

  .anticon {
    line-height: 1;
  }

  .all {
    font-size: 1.5rem;
    margin-bottom: 14px;
    height: 18px;

    span {
      font-weight: bold;
    }
  }

  .listWrap {
    width: 100%;
    height: calc(100% - 62px);
    overflow: auto;
    padding-right: 15px;
    padding-bottom: 50px;

    > div:last-of-type {
      margin-bottom: 40px;
    }

    .ant-pagination {
      text-align: center;
    }

    .nonData {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2rem;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.5);
    }
  }
`;
