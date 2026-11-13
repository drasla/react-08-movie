import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { Container } from "./Home.tsx";
import styled from "styled-components";

const BackBtn = styled.button`
    display: block;
    margin-bottom: 20px;
    background: none;
    border: none;
    color: #ff5959;
    font-size: 16px;
    cursor: pointer;
    padding: 0;

    &:hover {
        text-decoration: underline;
    }
`;

const Plot = styled.p`
    line-height: 1.6;
    margin-top: 20px;
`;

type MovieDetail = {
    Title: string;
    Genre: string;
    Plot: string;
    Poster: string;
    Year: string;
    Director: string;
};

function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState<MovieDetail | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then((json: MovieDetail) => setMovie(json))
            .catch((err: unknown) => {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log("알 수 없는 오류가 발생하였습니다. " + err);
                }
            });
    }, []);

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <Container>
            <BackBtn onClick={() => navigate(-1)}>&larr; Back</BackBtn>

            <img src={movie.Poster} alt={movie.Title} />

            <h1>{movie.Title}</h1>
            <p>
                <strong>Year:</strong> {movie.Year}
            </p>
            <p>
                <strong>Genre:</strong> {movie.Genre}
            </p>
            <p>
                <strong>Director:</strong> {movie.Director}
            </p>
            <Plot>{movie.Plot}</Plot>
        </Container>
    );
}

export default Detail;
