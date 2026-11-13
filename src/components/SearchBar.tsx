import { useNavigate } from "react-router";
import { type ChangeEvent, useState } from "react";
import styled from "styled-components";
import * as React from "react";

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

// 2. 내부 코드 진행 상 input 태그의 값으로 input라는 state가 존재하고
//    그러므로 input state는 string 타입이여야 하고
//    그에 대한 초기값인 keyword는 당연히 string 타입이어야 하는구나
function SearchBar({ keyword }: { keyword: string }) {
    const navigate = useNavigate();

    const [input, setInput] = useState(keyword);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) =>
        setInput(event.target.value);

    const onSubmitHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const k = input.trim();
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
