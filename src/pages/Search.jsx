import { Link, useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar.jsx";

function Search() {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword");

    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); // 화면에 띄울 에러 메세지를 저장할 목적의 state

    useEffect(() => {
        // keyword 변수 값이 null일 때는 fetch하면 안됨
        if (!keyword) return;

        setList([]);
        setError("");

        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&s=${keyword}`)
            .then(res => res.json())
            .then(json => setList(json.Search))
            .catch(err => {
                console.log(err); // 개발자가 개발자 도구에서 에러 분석 내용을 보기 위해서 하는 것
                setError("검색하는데 오류가 발생하였습니다.");
            })
            .finally(() => setLoading(false));
    }, [keyword]);

    return (
        <div>
            <h2>검색 키워드 : {keyword}</h2>

            <SearchBar keyword={keyword} />

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div>
                {Array.isArray(list) ? list.map((item, index) => (
                    <Link key={index} to={`/detail/${item.imdbID}`}>
                        <img src={item.Poster} alt={item.Title} />
                        <h3>{item.Title}</h3>
                        <span>{item.Year}</span>
                    </Link>
                )) : "검색 결과가 없습니다."}
            </div>
        </div>
    );
}

export default Search;
