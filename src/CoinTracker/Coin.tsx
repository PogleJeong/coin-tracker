import { useParams } from "react-router-dom";
import styled from "styled-components";

// react-router-dom v6 이상인 경우 interface 설정안해도 가능
// 자동으로 useParams 는 type 이 string or undefined 로 설정됨

const Container = styled.div`
    height: 100vh;
`;

const Content = styled.div`

`
const Title = styled.h1`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
`;
function Coin() {
    const { coinId } = useParams();
    return(
        <Container>
            <Title>Coin Tracker : {coinId}</Title>
            <Content>
            
            </Content>
        </Container>
    )
}
export default Coin;