import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

// react-router-dom v6 이상인 경우 interface 설정안해도 가능
// 자동으로 useParams 는 type 이 string or undefined 로 설정됨
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${props => props.theme.accentColor};
`

const Loader = styled.span`
    display: block;
    text-align: center;
    font-size: 30px;
`;

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

interface RouterState {
    name:string;
}

interface 
function Coin() {
    const [loading , setLoading] = useState(true);
    const { coinId } = useParams();
    const location = useLocation();
    const name = location.state as RouterState; // hook 에 interface 적용방법
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});

    // useEffect 의 첫번째 () 에선 async 사용못함 
    // 함수 정의하지 않고 바로 실행 (async() => { 실행시킬 코드 })();
    useEffect(()=>{
        (async()=> {
        await axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        .then((response)=>{
            console.log(response.data);
            const infoData = response.data
            setInfo(infoData);
            });

        await axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        .then((response)=>{
            console.log(response.data);
            const priceData = response.data
            setPriceInfo(priceData);
            });
        })();
    });
    return(
        <Container>
            <Header>
                <Title>Coin Tracker : {name? `${name}` : "Loading..."}</Title>
            </Header>
            {loading ? <Loader>Loading...</Loader> : <span>{info.hello}</span>}
        </Container>
    )
}
export default Coin;