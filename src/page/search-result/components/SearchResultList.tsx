import styled from "styled-components";
import { useRepositoryListQuery } from "../../../querys/repositoryDadaHooks";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import ListCard from "./ListCard";

const SearchResultList = () => {
  const keyword = useAppSelector((state: RootState) => state.keyword);
  const repositoryList = useRepositoryListQuery(keyword);

  return (
    <SearchResultListStyled>
      <p className="all">
        총{" "}
        <span>
          {repositoryList.total_count}
        </span>
        개의 데이터가 있습니다
      </p>
      <div className="listWrap">
        {repositoryList.total_count ? (
          repositoryList.items.map((item, index, items) => 
          <ListCard 
            key={item.id}
            item={item}
            lastCard={items.length === index + 1}
          />)
        ) : (
          !repositoryList.isFetching && <div className="nonData">검색결과가 존재하지 않습니다</div>
        )}
      </div>
    </SearchResultListStyled>
  );
};

export default SearchResultList;

const SearchResultListStyled = styled.div`
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

    .listCard {
      width: calc((100% - 60px) / 4);
      margin-right: 15px;
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
