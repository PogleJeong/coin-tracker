// npm i styled-components
// styled-components 에 animation 기능을 추가하는 방법배우기
// component 안에 속해있는 tag 선택하기 + tag 의 hover 등 옵션추가
// 특정 component 안의 component 에 적용하는 style 도 가능(tag 상관x)

import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const rotationAnimation = keyframes`
    0% {
      border-radius: 0px;
      transform: rotate(0deg);
    }
    50% {
      border-radius: 100px;
      transform: rotate(360deg);
    }
    100%{
      border-radius: 0px;
      transform: rotate(0deg);
    }
`;

// Emoji에 대한 style
const Emoji = styled.span`
  color: black;
  font-size: 30px;
`;

// Box 와 Box 안에 있는 Emoji 에 대한 style
const Box = styled.div`
    width: 200px;
    height: 200px;
    background-color: tomato;

    display: flex;
    justify-content: center;
    align-items: center;
    animation: ${rotationAnimation} 1s linear infinite;
    
    ${Emoji} {
      color: red;
      &:hover {
        font-size: 100px;
      }
      &:active {
        opacity: 0;
      }
    }
`;
const Styled_App = () => {
  return (
    <Wrapper>
      <Box>
        <Emoji>곰국</Emoji>
      </Box>
    </Wrapper>
  )
}

export default Styled_App;