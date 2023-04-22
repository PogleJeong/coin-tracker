/*
    typescript 에서의 reack hook
*/

import { useState } from "react";
import styled from "styled-components";

interface ContainerProps{
    bgColor: string;
    borderColor?: string;
}


const Container = styled.div<ContainerProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props)=> props.bgColor};
    border-radius: 100px;
    border: 1px solid ${(props) => props.borderColor};
`;

interface CircleProps {
    bgColor: string;
    borderColor?: string;
    text?: String;
}

// typescript 는 useState() 의 초기값을 보고 들어가야하는 data 의 datatype 을 자동으로 인식하고 설정함.

const Circle = ({bgColor, borderColor, text="default text"} : CircleProps) => {
    const [counter, setCounter] = useState(0);

    return (<Container bgColor={bgColor} borderColor={borderColor}>
        {text}
        </Container>);
}

const Styled_App = () => {
    return(
        <div>
            <Circle bgColor="teal" borderColor="yellow" />
            <Circle bgColor="tomato" text="hihihi" />
        </div>
    )
}
export default Styled_App;