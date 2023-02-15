import styled from "styled-components";
import SearchInput from "../../components/SearchInput";

const Home = () => {
  return (
    <HomeStyled className="home">
      <SearchInput />
    </HomeStyled>
  );
};

export default Home;

const HomeStyled = styled.div``;
