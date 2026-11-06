import { useNavigate } from "react-router";
import { useState } from "react";

function SearchBar({ keyword }) {
    const navigate = useNavigate();

    const [input, setInput] = useState(keyword);

    const onChangeHandler = event => setInput(event.target.value);

    const onSubmitHandler = event => {
        event.preventDefault();
        const k = input.trim();
        if (!k) return;
        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <form onSubmit={onSubmitHandler}>
            <input onChange={onChangeHandler} value={input} />
            <button type={"submit"}>Search</button>
        </form>
    );
}

export default SearchBar;