import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.tsx";
import { Container } from "./Home.tsx";
import styled from "styled-components";
import MovieCard from "../components/MovieCard.tsx";

const List = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 100px;
    justify-content: center;
`;

export type Movie = {
    Title: string;
    Year: string;
    imdbID: string;
    Poster: string
}

type ApiResponse = {
    Search: Movie[];
}

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); // 화면에 띄울 에러 메세지를 저장할 목적의 state

    useEffect(() => {
        // keyword 변수 값이 null일 때는 fetch하면 안됨
        if (!keyword) return;

        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then((json: ApiResponse) => setList(json.Search))
            .catch(() => {
                setError("검색하는데 오류가 발생하였습니다.");
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <Container>
            <h2>검색 키워드 : {keyword}</h2>

            <SearchBar keyword={keyword || ""} />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <List>
                {/*
                    화면부에서 array에 map을 돌렸을 때, 리턴되는 최상단 태그에는
                    반복적으로 화면을 출력하기 때문에 리액트 엔진이 알아볼 수 있도록
                    일련번호를 붙여서 리턴 시켰어야 함
                    그 속성이 key이고, 그 속성값은 반복 요소들 중 유일한 값을 가졌어야 함
                    이러한 이유로 key 속성이 있기 때문에 Props로 전달되진 않음
                */}
                {Array.isArray(list)
                    ? list.map((x, index) => <MovieCard key={index} movie={x} />)
                    : "검색 결과가 없습니다."}
            </List>
        </Container>
    );
}

export default Search;
