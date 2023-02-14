import { KeyboardEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import gitLogo02 from "../assets/img/git_logo_02.png";
import { SearchOutlined } from '@ant-design/icons';
import { message } from "antd";

const SearchInput = () => {
	const navigate = useNavigate()
	const [keyWord, setKeyWord] = useState('');

	const handleSearchClick = () => {
		if ( !keyWord.length ) {
			message.warning("키워드를 입력해주세요");
			return;
		}

		navigate('/search-result');
	}
	
	const handleEnterPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if ( event.key === 'Enter' ) handleSearchClick();
	}

	return (
		<SearchInputStyled>
			<Link to="/" className="link">
				<img src={gitLogo02} alt="github logo image" />
			</Link>
			<div className="inputBox">
				<input type="text" value={keyWord} onChange={(event) => setKeyWord(event.target.value)} onKeyDown={handleEnterPress}/>
				<button type="button" onClick={handleSearchClick}>
					<SearchOutlined style={{ fontSize: 24 }}/>
				</button>
			</div>
			<p>
        레포지토리를 검색하고 관심 레포지토리의 최신 이슈를 한눈에 살펴보세요
      </p>
		</SearchInputStyled>
	)
}

export default SearchInput;

const SearchInputStyled = styled.div`
	position: absolute;
	top: 40%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 580px;


	.link {
		display: block;
		margin: 0 auto 20px;
		width: 320px;
		
		img {
			display: block;
			width: 320px;
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
	}
`