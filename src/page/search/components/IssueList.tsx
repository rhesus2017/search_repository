/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { getIssueListAPI } from "../../../apis/repositoryAPI";
import { IssueData, RepositoryListItem } from "../../../models/repository";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";

const IssueList = () => {
  const [page, setPage] = useState(1);
  const favoriteList = useAppSelector((state: RootState) => state.favoriteList);

  const createIssuePromise = (page: number) => {
    const promises = favoriteList.map((repo: RepositoryListItem) =>
      getIssueListAPI(repo.full_name, page)
    );

    return promises;
  };

  const recursiveRequest: any = async (
    createIssuePromise: any,
    page: number
  ) => {
    const issues: IssueData[] = [];
    const issuesBundle: { data: [] }[] = await Promise.all([
      ...createIssuePromise(page),
    ]);

    issuesBundle.forEach((issue) => {
      issues.push(...issue.data);
    });

    if (issues.length === 0) return [];

    const recursiveResult = await recursiveRequest(
      createIssuePromise,
      page + 1
    );

    issues.sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    return [...issues, ...recursiveResult];
  };

  useEffect(() => {
    console.log(recursiveRequest(createIssuePromise, page));
  }, [page]);

  return (
    <IssueListStyled>
      {/* <p className="all">
        총 <span>{recursiveRequest(createIssuePromise, page).length}</span>
        개의 데이터가 있습니다
      </p>
      <div className="listWrap">
        {issueList.length ? (
          issueList.map(
            (item, index, items) =>
              item && (
                <IssueCard
                  key={index}
                  item={item}
                  setPage={setPage}
                  lastCard={items.length === index + 1}
                />
              )
          )
        ) : (
          <div className="nonData">레포지토리 이슈가 존재하지 않습니다</div>
        )}
      </div> */}
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
