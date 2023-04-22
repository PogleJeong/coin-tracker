/*
    Typescript 는 Styled Component 를 자동으로 인식하지 못한다.

    따라서 styled component 를 사용하기 위해서는 npm 설치가 필요하다

    npm install @types/styled-components

    @types >> 아주 큰 Github repository, 모든 유명한 npm 라이브러리 저장소로 라이버러리나 패키지의 type definition 을 알려줌

    @types/styled-components 는 기존 JS의 styled-component 의 소스코드를 보고 Typescript에게 설명해준다는 의미를 가지고 있다.

    @types 의 뒷부분이 기존 라이브러리를 작성하여, 무엇을 참고하고 typescript 로 변환했는지 알려준다 
*/

/*
    interface 라는 객체를 이용해 함수의 (매개변수 : interface object) 로 사용한다면, 각 매개변수는 interface 객체와 매칭하여 어떤 변수타입을 갖는지 비교할 수 있다.
    이전 JS 의 propType 과 유사하나 interface 는 코드가 실행되기전에 확인해준다.
    웹페이지가 뜨기전에 에러를 보여주므로 시간을 단축할 수 있음.    
*/

import styled from "styled-components";

interface ContainerProps{
    bgColor: string
}

// ContainerProps 를 받는 div 태그
const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props)=> props.bgColor};
    border-radius: 100px;
`;

//interface 를 적용함 : object shape 를 typescript 에게 설명해주는 typescript의 개념
interface CircleProps {
    bgColor: string;
}

// bgColor 의 타입은 CircleProps 의 oibect 이다 라는 의미를 전달
const Circle = ({bgColor} : CircleProps) => {
    return <Container bgColor={bgColor}/>;
}

//component 의 props type 검증
const Styled_App = () => {
    return(
        <div>
            <Circle bgColor="teal" />
            <Circle bgColor="tomato" />
        </div>
    )
}
export default Styled_App;