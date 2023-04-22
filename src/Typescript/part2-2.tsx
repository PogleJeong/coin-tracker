/*
    Optional Props

    interface 에서는 기본적으로 required 속성을 가지고 있어서 정의되어있는 변수가 하나라도 Component 에 없으면 에러발생
    이를 위해 required 가 아닌 optional으로 변환해주어야한다.

    borderColor: string 에서 borderColor?: string 으로 적어주면 끝.
*/

/*
    ?? (Null 병합 연산자 (Nullish coalescing operator))

    ??앞에 값이 null이거나 undefined이면 오른쪽 값을, 그렇지 않으면 왼쪽 값을 반환하는 논리연산자
        null ?? "hello" // "hello"
        undefined ?? "hello" // "hello"
        "hi" ?? "hello" // "hi"
*/

import styled from "styled-components";

interface ContainerProps{
    bgColor: string;
    borderColor?: string;
}

// ContainerProps 를 받는 div 태그
const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props)=> props.bgColor};
    border-radius: 100px;
    border: 1px solid ${(props) => props.borderColor};
`;

//interface 를 적용함 : object shape 를 typescript 에게 설명해주는 typescript의 개념
interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: String;
}

// bgColor 의 타입은 CircleProps 의 oibect 이다 라는 의미를 전달
const Circle = ({bgColor, borderColor, text="default text"} : CircleProps) => {
    return (<Container bgColor={bgColor} borderColor={borderColor}>
        {text}
        </Container>);
}

//component 의 props type 검증
const Styled_App = () => {
    return(
        <div>
            <Circle bgColor="teal" borderColor="yellow" />
            <Circle bgColor="tomato" text="hihihi" />
        </div>
    )
}
export default Styled_App;