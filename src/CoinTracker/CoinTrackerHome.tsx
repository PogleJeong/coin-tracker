import { useState } from "react"
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";

import { fetchCoins } from "../api";

// Reset CSS : https://github.com/zacanger/styled-reset/blob/master/src/index.ts

// 모바일처럼 가운데에 위치할 수 있게 스타일
const Container = styled.div`
    padding: 0px 20px;
    max-width: 80%;
    margin: 0 auto;
`;

const SearchBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: bisque;
    height: 80px;
    margin-bottom: 50px;
    border-radius: 15px;
    box-shadow: 2px 3px 5px 0px;
`

const TextBox = styled.span`
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 40px;
    margin-right: 20px;
    font-weight: bold;
    color:black;
`
const SearchBar = styled.div`
    position: relative;
`

const SearchInput = styled.input.attrs({placeholder: "typing coin name"})`
    border-radius: 5px;
    padding: 5px 10px;
    width: 400px;
    height: 40px;
`

const SearchResult = styled.div`
    position: absolute;
    top: 40px;
    left: 0px;
    width: 400px;
    max-height: 500px;
    overflow: scroll;
    background-color: white;
    padding: 0px 10px;
`

const SearchList = styled.ul`
    width: 100%;
    
`
const SearchItems = styled.li`
    display: flex;
    justify-content: left;
    align-items: center;
    height: 60px;
    padding: 0px 20px;
    color: black;
    &:hover {
        background-color: azure;
    }
    &:active {
        background-color: blanchedalmond;
    }
`

const CoinsList = styled.ul`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
`;

const Coin = styled.li`
    background-color: white;
    color: black;
    width: 100%;
    padding: 20px;
    border-radius: 15px;
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

const CoinName = styled.span`
    display: flex;
    justify-content: left;
    align-items: center;
    font-size: 14px;
`

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
};

// ** Link component 의 다양한 option!
// Link to={} state={}
// 단 Link state 로 받은 데이터는 무조건 Link state를 적어둔 페이지를 거쳐야 값을 받을 수 있다.
function CoinTrackerHome() {
    
    const [searchCoin , setSearchCoin] = useState("");
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
            <SearchBox>
                <TextBox>Coin Search</TextBox>
                <SearchBar>
                    <SearchInput value={searchCoin} onChange={(event)=>setSearchCoin(event.target.value)} />
                    {
                        searchCoin ? 
                        <SearchResult>
                            {data?.filter((item)=> item.name.toLowerCase().includes(searchCoin)).map((coin)=>(
                            <SearchList>
                                <Link to={`/coin-tracker/${coin.id}`} state={coin.name}>
                                    <SearchItems>
                                        <CoinLogo src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}></CoinLogo>
                                        <CoinName>{coin.name}</CoinName>
                                    </SearchItems>
                                </Link>
                            </SearchList>
                            ))}
                            
                        </SearchResult>
                        :
                        null
                    }
                </SearchBar>
            </SearchBox>
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