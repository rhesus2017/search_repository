/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { IssueData } from "../../../models/repository";
import { BranchesOutlined, MessageOutlined } from "@ant-design/icons";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";

interface IssueCardProps {
  item: IssueData;
  setPage: Dispatch<SetStateAction<number>>;
  lastCard: boolean;
}

const IssueCard = (props: IssueCardProps) => {
  const { item, setPage, lastCard } = props;
  const targetRef = useRef<HTMLDivElement>(null);
  const createdTime = new Date(item.created_at);

  useEffect(() => {
    const handleObserver = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      const target = entries[0];
      if (target.isIntersecting) {
        observer.unobserve(target.target);
        setPage((state) => state + 1);
      }
    };

    const option = { rootMargin: "0px", threshold: 0 };
    const observer = new IntersectionObserver(handleObserver, option);
    if (targetRef.current) observer.observe(targetRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <IssueCardStyled ref={lastCard ? targetRef : null} className="listCard">
      <a
        className="content"
        href={item.html_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="projectNameWrap">
          <div className="projectName">
            {item.repository_url.replace("https://api.github.com/repos/", "")}
          </div>
          <div className="labels">
            {item.labels.map((label, index) => {
              return (
                <div
                  key={index}
                  className="label"
                  style={{ backgroundColor: `#${label.color}` }}
                >
                  {label.name}
                </div>
              );
            })}
          </div>
        </div>
        <p className="title">
          {item.pull_request ? <BranchesOutlined /> : <MessageOutlined />}
          {item.pull_request ? " [Pull requests] " : " [Issues] "}
          {item.title}
        </p>
        <p className="date">
          #{item.number} opend on {createdTime.getMonth() + 1}/
          {createdTime.getDate() + 1} by {item.user.login}
        </p>
      </a>
    </IssueCardStyled>
  );
};

export default IssueCard;

const IssueCardStyled = styled.div`
  float: left;
  border: 1px solid #999;
  border-radius: 4px;
  margin-bottom: 15px;
  position: relative;
  width: 100%;
  height: 110px;

  .content {
    display: block;
    float: left;
    width: 100%;
    height: 100%;
    padding: 15px 30px;

    .title {
      display: block;
      height: 25px;
      font-size: 1.9rem;
      font-weight: bold;
      color: #555;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      margin-bottom: 5px;

      .anticon {
        line-height: 1;
      }
    }

    .date {
      margin-left: 24px;
      display: block;
      font-size: 1.4rem;
      color: #777;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-spacing: 1px;
    }

    .projectNameWrap {
      display: block;
      width: 100%;
      height: 24px;
      margin-bottom: 5px;

      &:after {
        content: "";
        display: block;
        clear: both;
      }

      .projectName {
        float: left;
        max-width: 400px;
        height: 100%;
        font-size: 1.6rem;
        color: rgb(9, 105, 218);
        font-weight: bold;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        margin-right: 15px;
        line-height: 23px;
      }

      .labels {
        float: left;
        min-width: calc(100% - 415px);
        height: 100%;
        padding: 1px 0;
        overflow: hidden;

        .label {
          display: inline-block;
          height: 100%;
          border-radius: 10px;
          text-align: center;
          line-height: 20px;
          color: #fff;
          padding: 0 10px;
          margin-right: 5px;

          &:last-of-type {
            margin-right: 0;
          }
        }
      }
    }
  }
`;
