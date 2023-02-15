import styled from "styled-components";
import { RepositoryListItem } from "../../../models/repository";
import {
  StarOutlined,
  BranchesOutlined,
  BookOutlined,
} from "@ant-design/icons";
import { formatNumber } from "../../../util/util";

interface ListCardProps {
  item: RepositoryListItem;
}

const ListCard = (props: ListCardProps) => {
  const { item } = props;

  return (
    <ListCardStyled>
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
          <span>{formatNumber(String(item.stargazers_count))}</span>
        </span>
        <span>
          <BranchesOutlined />
          <span>{formatNumber(String(item.forks_count))}</span>
        </span>
      </div>
    </ListCardStyled>
  );
};

export default ListCard;

const ListCardStyled = styled.div`
  width: calc((100% - 75px) / 5);
  height: 119px;
  float: left;
  border: 1px solid #999;
  border-radius: 4px;
  margin-right: 15px;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;

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
