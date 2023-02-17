import { KeyboardEvent, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import gitLogo02 from "../assets/img/git_logo_02.png";
import gitLogo04 from "../assets/img/git_logo_04.png";
import { SearchOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setReduxKeyword } from "../redux/keywordSlice";
import { RootState } from "../redux/store";
import { setReduxIsIssuesPage } from "../redux/isIssuesPageSlice";

const SearchInput = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const keyword = useAppSelector((state: RootState) => state.keyword);
  const [keywordState, setKeywordState] = useState<string>(keyword);

  useEffect(() => {
    if (location.pathname === "/") setKeywordState("");
  }, [location.pathname]);

  const handleSearchClick = () => {
    if (!keywordState.length) {
      message.warning("키워드를 입력해주세요");
      return;
    }

    dispatch(setReduxKeyword(keywordState));
    dispatch(setReduxIsIssuesPage(false));
    if (location.pathname === "/") navigate("/search");
  };

  const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") handleSearchClick();
  };

  return (
    <SearchInputStyled className={location.pathname === "/" ? "home" : ""}>
      <Link to="/" className="link">
        <img
          src={location.pathname === "/" ? gitLogo02 : gitLogo04}
          alt="github logo"
        />
      </Link>
      <div className="inputBox">
        <input
          type="text"
          value={keywordState}
          onChange={(event) => setKeywordState(event.target.value)}
          onKeyDown={handleEnterPress}
        />
        <button type="button" onClick={handleSearchClick}>
          <SearchOutlined style={{ fontSize: 24 }} />
        </button>
      </div>
      <p>
        레포지토리를 검색하고 관심 레포지토리의 최신 이슈를 한눈에 살펴보세요
      </p>
    </SearchInputStyled>
  );
};

export default SearchInput;

const SearchInputStyled = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 580px;

  .link {
    display: block;
    margin: 0 auto 20px;
    width: 210px;
    height: 51px;

    img {
      display: block;
      width: 100%;
    }
  }

  .inputBox {
    display: flex;
    width: 100%;
    height: 44px;
    border: 1px solid #ccc;
    border-radius: 20px;

    input {
      width: calc(100% - 54px);
      height: 44px;
      background: none;
      padding-left: 25px;
      font-size: 1.6rem;
      letter-spacing: 1px;
      line-height: 44px;
    }

    button {
      width: 54px;
      height: 44px;
      background: none;
      font-size: 1.6rem;
      cursor: pointer;

      .anticon {
        line-height: 1;
      }
    }
  }

  p {
    font-size: 1.4rem;
    margin-top: 10px;
    text-align: center;
    font-family: "Noto Sans KR", sans-serif;
  }

  &.home {
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    .link {
      width: 320px;
      height: 205px;
    }
  }
`;
