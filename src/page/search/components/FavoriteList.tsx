import { message } from "antd";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useAppSelector } from "../../../redux/hooks";
import { setReduxIsIssuesPage } from "../../../redux/isIssuePageSlice";
import { RootState } from "../../../redux/store";
import SearchCard from "./SearchCard";

const FavoriteList = () => {
  const dispatch = useDispatch();
  const issuesPage = useAppSelector((state: RootState) => state.isIssuePage);
  const favoriteList = useAppSelector((state: RootState) => state.favoriteList);

  const handleGoToIssuesClick = () => {
    favoriteList.length || issuesPage
      ? dispatch(setReduxIsIssuesPage(!issuesPage))
      : message.info("관심 레포지토리가 존재하지 않습니다.");
  };

  return (
    <FavoriteListStyled>
      <div className="link" onClick={() => handleGoToIssuesClick()}>
        {issuesPage
          ? "검색된 레포지토리 보러가기"
          : "관심 레포지토리 이슈 보러가기"}
      </div>

      <div className="favoriteListWrap">
        {favoriteList.length ? (
          favoriteList.map((item) => <SearchCard key={item.id} item={item} />)
        ) : (
          <div className="nonData">
            관심 레포지토리가
            <br />
            존재하지 않습니다
          </div>
        )}
      </div>
    </FavoriteListStyled>
  );
};

export default FavoriteList;

const FavoriteListStyled = styled.div`
  width: 20%;
  height: 100%;
  margin-top: 60px;
  border-left: 1px solid #ccc;

  > .link {
    display: block;
    width: calc(100% - 42px);
    height: 50px;
    border: 1px solid #333;
    font-size: 1.6rem;
    text-align: center;
    line-height: 48px;
    border-radius: 4px;
    color: #fff;
    font-weight: bold;
    margin-left: 12px;
    background: #333;
    cursor: pointer;
  }

  .favoriteListWrap {
    width: 100%;
    height: calc(100% - 100px);
    overflow: auto;
    position: relative;
    margin-top: 15px;
    padding: 0 30px 0 12px;

    .listCard {
      width: calc(100%);
      margin-right: 0;
    }

    .nonData {
      position: absolute;
      top: 40%;
      left: calc(50% - 15px);
      transform: translate(-50%, -50%);
      font-size: 2rem;
      font-weight: bold;
      color: rgba(0, 0, 0, 0.5);
      text-align: center;
      line-height: 1.4;
    }
  }
`;
