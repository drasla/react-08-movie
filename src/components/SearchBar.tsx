import { useNavigate } from "react-router";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
    display: flex;
    gap: 10px;
`;

const Input = styled.input`
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
`;

const Button = styled.button`
    padding: 12px;
    background-color: #ff5959;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
`;

// Props의 타입을 지정해주기 위한 방법

// 1. 외부 사용처를 중심으로 수정하는 것
// SearchBar라는 컴포넌트는 지금 Home과 Search에서 불러와지고 있는 상황
// => Props에 값을 전달해주는건 Home, Search
// => Home   keyword라는 속성 자체가 없고
// => Search  keyword에 string을 넣고 있다

// Props 타입은 { keyword }: { keyword?: string }

function SearchBar({ keyword }: { keyword?: string }) {
    const navigate = useNavigate();

    const [input, setInput] = useState(keyword);

    const onChangeHandler = event => setInput(event.target.value);

    const onSubmitHandler = event => {
        event.preventDefault();
        // input의 타입이 string | undefined로 했기 때문에
        // 그에 대한 내로잉을 해주고 trim() 해줘야 됨
        // 근데 if를 통해 블록 스코프를 나눴으니
        // 밖에서 k 변수를 만들어주고, if 내부에서 덮어쓰기를 해야함
        let k;
        if (typeof input === "string") {
            k = input.trim();
        }
        if (!k) return;
        navigate(`/search?keyword=${encodeURIComponent(k)}`);
    };

    return (
        <Form onSubmit={onSubmitHandler}>
            <Input onChange={onChangeHandler} value={input} />
            <Button type={"submit"}>Search</Button>
        </Form>
    );
}

export default SearchBar;