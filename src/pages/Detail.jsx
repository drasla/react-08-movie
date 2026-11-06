import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://www.omdbapi.com/?apikey=6a0a8eb4&i=${id}&plot=full`)
            .then(res => res.json())
            .then(json => setMovie(json))
            .catch(err => console.log(err));
    }, []);

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <button onClick={() => navigate(-1)}>&larr; Back</button>

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
            <p>
                {movie.Plot}
            </p>
        </div>
    );
}

export default Detail;
