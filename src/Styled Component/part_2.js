// npm i styled-components
// 1. 최적화하기 (중복제거)
// component에 props 사용 : props 는 component 에 data를 보내는 방법

// 2. 확장하기 (extension)
// styled-component 를 styled(확장할 component) 로 지정

import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

// 설정변경 가능한 컴포넌트 생성
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color: white;
`;

// 확장 : Box component의 style 을 모두 포함
const Circle = styled(Box)`
    border-radius: 50px;
`;

const Styled_App = () => {
  return (
    <Father>
        <Box bgColor="teal" >
            <Text>text</Text>
        </Box>
        <Circle bgColor="tomato" />
    </Father>
  )
}

export default Styled_App;