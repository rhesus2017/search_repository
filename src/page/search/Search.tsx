import { Spin } from "antd";
import { useState } from "react";
import styled from "styled-components";
import SearchInput from "../../components/SearchInput";
import useRepositoryListQuery from "../../queries/repositoryListQuery";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import FavoriteList from "./components/FavoriteList";
import IssueList from "./components/IssueList";
import SearchList from "./components/SearchList";

const Search = () => {
  const isIssuesPage = useAppSelector((state: RootState) => state.isIssuePage);
  const keyword = useAppSelector((state: RootState) => state.keyword);
  const repositoryList = useRepositoryListQuery(keyword);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SearchStyled>
      <Spin spinning={repositoryList.isFetching || isLoading}>
        <SearchInput />
        <div className="searchResultWrap">
          {isIssuesPage ? <IssueList isLoading={isLoading} setIsLoading={setIsLoading}/> : <SearchList />}
          <FavoriteList />
        </div>
      </Spin>
    </SearchStyled>
  );
};

export default Search;

const SearchStyled = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;

  .ant-spin {
    max-height: none !important;
    height: 100vh !important;
  }

  .searchResultWrap {
    position: absolute;
    width: 100%;
    height: calc(100vh - 150px);
    top: 150px;
    display: flex;
  }
`;
