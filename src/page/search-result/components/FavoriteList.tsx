import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const FavoriteList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <FavoriteListStyled>
      {location.pathname === "/search-result" ? (
        <Link to="/issues">관심 레포지토리 이슈 모아보기</Link>
      ) : (
        <Link to="/search-result">검색 된 레포지토리 </Link>
      )}
    </FavoriteListStyled>
  );
};

export default FavoriteList;

const FavoriteListStyled = styled.div`
  float: right;
  width: 20%;
  height: 100%;
  
`;
