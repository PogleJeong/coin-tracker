// Reset CSS : https://github.com/zacanger/styled-reset/blob/master/src/index.ts

import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "react-query";

// 모바일처럼 가운데에 위치할 수 있게 스타일
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

const CoinsList = styled.ul`

`;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    padding: 20px;
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition : color 0.2s ease-in;
    }
    &:hover {
        a{
            color: ${props => props.theme.accentColor};
        }
    }
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

const CoinLogo = styled.img`
    height:25px;
    aspect-ratio: 1/1;
    margin-right: 20px;
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


// ** Link component 의 다양한 option!
// Link to={} state={}
// 단 Link state 로 받은 데이터는 무조건 Link state를 적어둔 페이지를 거쳐야 값을 받을 수 있다.
function CoinTrackerHome() {
    
    // 첫번째 인자 : query 의 고유식별자
    // 두번째 인자 : fetcher 
    // 반환값 : isLoading (boolean) : 두번째 인자의 fetcher 함수의 종료유무를 알려줌
    // 반환값2 : fetcher 함수의 return 값 저장
    // ++ 새로고침하거나 다시 돌아와도 useQuery 는 데이터를 유지함(캐시)
    const {isLoading, data} = useQuery<CoinInterface[]>("allCoins", fetchCoins);

    /*     
    [ react-query 사용으로 변경하기 위해 주석처리 ]
    reacut query 가 주석처리된 부분을 한 줄의 코드로 변경시켜줌

    const [loading, setLoading] = useState<boolean>(true);
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    
    const getCoinApi = async() => {
        const response = await axios.get("https://api.coinpaprika.com/v1/coins")
        setCoins(response.data.slice(0,100));
        setLoading(false);
    }
    useEffect(()=>{
        getCoinApi();
    }, []) */;

    return (
        <Container>
            <Header>
                <Title>코인!</Title><br/>
            </Header>
                { isLoading ? (
                    <Loader>"Loading..."</Loader>
                ):(
                <CoinsList>
                    {data?.map((coin)=>(
                    <Coin key={coin.id}>
                    
                        <Link to={`/coin-tracker/${coin.id}`} state={coin.name}>
                            <CoinLogo src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>))}
                    
                </CoinsList>
                )}
        </Container>
    )
}
export default CoinTrackerHome;