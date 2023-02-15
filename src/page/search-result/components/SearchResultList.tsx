import styled from "styled-components";
import { useRepositoryListQuery } from "../../../hooks/repositoryDadaHooks";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { formatNumber } from "../../../util/util";
import ListCard from "./ListCard";

const SearchResultList = () => {
  const keyword = useAppSelector((state: RootState) => state.keyword);
  const repositoryList = useRepositoryListQuery(keyword);

  return (
    <SearchResultListStyled>
      <p className="all">
        총{" "}
        <span>
          {formatNumber(
            repositoryList.data ? String(repositoryList.data.total_count) : "0"
          )}
        </span>
        개의 데이터가 있습니다
      </p>
      <div className="listWrap">
        {repositoryList.data?.total_count ? (
          repositoryList.data?.items.map((item) => (
            <ListCard key={item.id} item={item} />
          ))
        ) : (
          <div className="nonData">검색결과가 존재하지 않습니다</div>
        )}
      </div>
    </SearchResultListStyled>
  );
};

export default SearchResultList;

const SearchResultListStyled = styled.div`
  float: left;
  width: 100%;
  height: 100%;
  position: relative;
  padding: 30px 0 0 30px;

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
    height: calc(100% - 32px);
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
