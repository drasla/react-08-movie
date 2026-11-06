import SearchBar from "../components/SearchBar.jsx";
import styled from "styled-components";

export const Container = styled.div`
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

function Home() {
    return (
        <Container>
            <h1>Movie Search</h1>
            <SearchBar />
        </Container>
    );
}

export default Home;
