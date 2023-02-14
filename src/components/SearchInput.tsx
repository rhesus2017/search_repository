import { Link } from "react-router-dom";
import styled from "styled-components";
import gitLogo02 from "../assets/img/git_logo_02.png";

const SearchInput = () => {
	return (
		<SearchInputStyled>
			<Link to="/">
				<img src={gitLogo02} />
			</Link>
		</SearchInputStyled>
	)
}

export default SearchInput;

const SearchInputStyled = styled.div``