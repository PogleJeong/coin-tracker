// npm i styled-components

// 일반 style 적용과 styled-components 적용
import styled from "styled-components";

const General_App = () => {
  return (
    <div style={{display: "flex"}}>
        <div style={{backgroundColor: "teal", width: 100, height: 100}}></div>
          <span style={{color: "white"}}></span>
        <div style={{backgroundColor: "tomato", width: 100, height: 100}}></div>
    </div>
  )
}

const Father = styled.div`
  display: flex;
`;

const BoxOne = styled.div`
  background-color: teal;
  width: 100px;
  height: 100px;
`;

const BoxTwo = styled.div`
  background-color: tomato;
  width: 100px;
  height: 100px;
`;

const Text = styled.span`
  color: white;
`;

const Styled_App = () => {
  return (
    <Father>
        <BoxOne>
          <Text>Hello</Text>
        </BoxOne>
        <BoxTwo />
    </Father>
  )
}

export default Styled_App;