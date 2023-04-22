// npm i styled-components
// theme : 모든 색상들을 가지고 있는 object
// index.js 에서 ThemeProvider 적용필수
// 지금 단계에서는 dark, white mode(theme) 만
import styled from "styled-components";

// 부모 component 에서 props 를 가져옴.
const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor}
`
const Styled_App = () => {
    return (
        <Wrapper>
          <Title>Hello</Title>
        </Wrapper>
    )
}

export default Styled_App;