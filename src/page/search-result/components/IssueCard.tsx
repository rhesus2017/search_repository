import styled from "styled-components"
import { IssueData } from "../../../models/repository"

interface IssueCardProps {
	item: IssueData
} 

const IssueCard = (props: IssueCardProps) => {
	const { item } = props;
	const createdTime = new Date(item.created_at);

  return (
		<IssueCardStyled>
			<div className={`sort ${item.pull_request ? "pull" : "issue"}`}>
				{item.pull_request ? "PULL REQUESTS" : "ISSUE"}
			</div>
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
        <p className="title">{item.title}</p>
        <p className="date">
          #{item.number} opend on {createdTime.getMonth() + 1}/
          {createdTime.getDate() + 1} by {item.user.login}
        </p>
      </a>
		</IssueCardStyled>
	)
}

export default IssueCard

const IssueCardStyled = styled.div`
	float: left;
	border: 1px solid #999;
  border-radius: 4px;
  margin-bottom: 15px;
  position: relative;
  width: 100%;
  height: 120px;

	.sort {
		float: left;
		width: 150px;
		height: 100%;
		border-right: 1px solid #999;
		font-size: 1.4rem;
		font-weight: bold;
		text-align: center;
		line-height: 120px;
		color: #fff;

		&.pull {
			background: #30a14e;
		}

		&.issue {
			background: gray;
		}
	}

	.content {
		display: block;
		float: left;
		width: calc(100% - 150px);
		height: 100%;
		padding: 15px;

		.title {
			display: block;
			height: 31px;
			font-size: 2.3rem;
			color: #555;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			margin-bottom: 15px;
		}

		.date {
			display: block;
			height: 19px;
			font-size: 1.4rem;
			color: #bbb;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			word-spacing: 1px;
		}

		.projectNameWrap {
			display: block;
			width: 100%;
			height: 20px;
			margin-bottom: 5px;

			&:after {
				content: "";
				display: block;
				clear: both;
			}

			.projectName {
				float: left;
				max-width: 300px;
				height: 100%;
				font-size: 1.5rem;
				color: rgb(9, 105, 218);
				font-weight: bold;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
				margin-right: 15px;
			}

			.labels {
				float: left;
				width: calc(100% - 315px);
				height: 100%;
				padding: 1px 0;

				.label {
					display: inline-block;
					height: 100%;
					border-radius: 10px;
					text-align: center;
					line-height: 18px;
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
`