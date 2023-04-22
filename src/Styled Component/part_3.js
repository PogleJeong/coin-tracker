// npm i styled-components
// 1. component 의 tag 를 바꾸고 싶지만 style은 유지하고 싶을때 사용하는 방법
// 1-1. component 의 "as" 사용
// 1-2. styled-component.tag.attrs({}) 을 사용하여 속성지정하기
import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
    color: white;
    background-color: tomato;
    border: 0;
    border-radius: 15px;
`;

const Input = styled.input.attrs({required: true, minlength:"10"})`
    background-color: gray;
`;

// Btn component 는 Button style 이지만 Tag는 as="a" 를 통해 a 태그가 됨.
// Input component 는 styled.input.attrs 를 사용하여 같은 속성을 지정할 수 있음
const Styled_App = () => {
  return (
    <Father>
       <Btn>Login</Btn>
       <Btn as="a" href="/">Login</Btn>
       <Input />
       <Input />
       <Input />
       <Input />
    </Father>
  )
}

export default Styled_App;