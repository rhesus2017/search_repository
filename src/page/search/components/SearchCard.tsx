/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { RepositoryListItem } from "../../../models/repository";
import {
  StarOutlined,
  BranchesOutlined,
  BookOutlined,
} from "@ant-design/icons";
import favorite from "../../../assets/img/favorite.png";
import notFavorite from "../../../assets/img/not_favorite.png";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { useDispatch } from "react-redux";
import { setReduxFavoriteList } from "../../../redux/favoriteListSlice";
import { message } from "antd";
import { RefObject } from "react";

const FAVORITE_MAX_LENGTH = 4;

interface SearchCardProps {
  item: RepositoryListItem;
  targetRef?: RefObject<HTMLDivElement> | null
}

const SearchCard = (props: SearchCardProps) => {
  const { item, targetRef } = props;
  const dispatch = useDispatch();
  const favoriteList = useAppSelector((state: RootState) => state.favoriteList);
  const isFavorite = Boolean(
    favoriteList.filter((repo) => repo.id === item.id).length
  );

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(
        setReduxFavoriteList(favoriteList.filter((repo) => repo.id !== item.id))
      );
    } else {
      if (favoriteList.length >= FAVORITE_MAX_LENGTH)
        message.info("즐겨찾기는 최대 4개까지 가능합니다.");
      else dispatch(setReduxFavoriteList([...favoriteList, item]));
    }
  };

  return (
    <SearchCardStyled ref={targetRef} className="listCard">
      <div className="button" onClick={handleFavoriteClick}>
        <img
          src={isFavorite ? favorite : notFavorite}
          alt={
            isFavorite
              ? "즐겨찾기에 추가됐습니다"
              : "즐겨찾기에 추가되지 않았습니다"
          }
        />
      </div>
      <a
        href={item.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="title"
      >
        <BookOutlined />
        <span className="name">{item.full_name}</span>
      </a>
      <p className="description">{item.description}</p>
      <div className="count">
        <span>{item.language ? item.language : "None"}</span>
        <span>
          <StarOutlined />
          <span>{item.stargazers_count.toLocaleString()}</span>
        </span>
        <span>
          <BranchesOutlined />
          <span>{item.forks_count.toLocaleString()}</span>
        </span>
      </div>
    </SearchCardStyled>
  );
};

export default SearchCard;

const SearchCardStyled = styled.div`
  height: 119px;
  float: left;
  border: 1px solid #999;
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;

  .button {
    position: absolute;
    top: 13px;
    right: 13px;
    cursor: pointer;
    z-index: 10;
    width: 20px;
    height: 20px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .title {
    display: block;
    width: 90%;
    height: 25px;
    font-size: 1.5rem;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 4px;

    .anticon {
      line-height: 1.2;
      margin-right: 6px;
      color: #222;
    }

    .name {
      color: rgb(9, 105, 218);
    }
  }

  .description {
    display: block;
    height: 18px;
    font-size: 1.4rem;
    color: #555;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 24px;
  }

  .count {
    display: block;
    height: 18px;
    font-size: 1.4rem;
    color: #999;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 18px;

    > span {
      &:nth-of-type(1) {
        margin-right: 24px;
      }

      &:nth-of-type(2) {
        margin-right: 13px;
        line-height: 18px;

        .anticon {
          line-height: 1.2;
          margin-right: 2px;
        }
      }

      &:nth-of-type(3) {
        line-height: 18px;

        .anticon {
          line-height: 1.2;
          margin-right: 2px;
        }
      }
    }
  }
`;
