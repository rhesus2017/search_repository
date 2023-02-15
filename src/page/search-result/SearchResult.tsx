import { Spin } from "antd";
import styled from "styled-components";
import SearchInput from "../../components/SearchInput";
import { useRepositoryListQuery } from "../../hooks/repositoryDadaHooks";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import SearchResultList from "./components/SearchResultList";

const SearchResult = () => {
  const keyword = useAppSelector((state: RootState) => state.keyword);
  const repositoryList = useRepositoryListQuery(keyword);

  return (
    <SearchResultStyled>
      <Spin spinning={repositoryList.isFetching}>
        <SearchInput />
        <div className="searchResultWrap">
          <SearchResultList />
        </div>
      </Spin>
    </SearchResultStyled>
  );
};

export default SearchResult;

const SearchResultStyled = styled.div`
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

    &:after {
      content: "";
      display: block;
      clear: both;
    }
  }
`;
