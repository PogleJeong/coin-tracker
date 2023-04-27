import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, useParams, useMatch, Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(100, 10, 100, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(255, 255, 255, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
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

// useParams 는 type 정의필요없어짐
interface RouteParams {
    coinId: string;
}

// useLocation 에서 type 정의필요없어짐
interface RouteState {
    name: string;
}

// console 창에서 작업한 결과 가져오기
// 단축키 ctrl + D 
interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links_extended: object;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: String;
            ath_price: Number;
            market_cap: Number;
            market_cap_change_24h: Number;
            percent_change_1h: Number;
            percent_change_1y:Number;
            percent_change_6h:Number;
            percent_change_7d:Number;
            percent_change_12h:Number;
            percent_change_15m:Number;
            percent_change_24h:Number;
            percent_change_30d:Number;
            percent_change_30m:Number;
            percent_from_price_ath:Number;
            price: Number;
            volume_24h: Number;
            volume_24h_change_24h: Number;
        };
    }
}

function Coin() {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    const { state } = useLocation();
    const [info, setInfo] = useState<InfoData>();
    const [priceInfo, setPriceInfo] = useState<PriceData>();
    const priceMatch = useMatch("/coin-tracker/:coinId/price");
    const chartMatch = useMatch("/coin-tracker/:userId/chart");
    // useEffect 의 첫번째 () 에선 async 사용못함 
    // 함수 정의하지 않고 바로 실행 (async() => { 실행시킬 코드 })();
    useEffect(()=>{
        (async()=> {
        await axios.get(`https://api.coinpaprika.com/v1/coins/${coinId}`)
        .then((response)=>{
            const infoData = response.data
            setInfo(infoData);
            });

        await axios.get(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
        .then((response)=>{
            const priceData = response.data
            setPriceInfo(priceData);
            });
        })();
        setLoading(false);
    },[coinId]);
    // react hook 에서는 dependency 를 써주는게 최적화에 좋음
    // 어처피 coinId 는 안에서 변하지 않으므로 써주어도 상관없음.

    return(
        <Container>
            <Header>
            <Title>{state || "Loading..."}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader> 
            )
            : (
                <>
                <Overview>
                  <OverviewItem>
                    <span>Rank:</span>
                    <span>{info?.rank}</span>
                  </OverviewItem>
                  <OverviewItem>
                    <span>Symbol:</span>
                    <span>${info?.symbol}</span>
                  </OverviewItem>
                  <OverviewItem>
                    <span>Open Source:</span>
                    <span>{info?.open_source ? "Yes" : "No"}</span>
                  </OverviewItem>
                </Overview>
                <Description>{info?.description}</Description>
                <Overview>
                  <OverviewItem>
                    <span>Total Suply:</span>
                    <span>{priceInfo?.total_supply}</span>
                  </OverviewItem>
                  <OverviewItem>
                    <span>Max Supply:</span>
                    <span>{priceInfo?.max_supply}</span>
                  </OverviewItem>
                </Overview>
                <Tabs>
                    <Tab isActive={chartMatch !== null}>
                     <Link to="chart">Chart</Link>
                    </Tab>
                    <Tab isActive={priceMatch !== null}>
                        <Link to="price">Price</Link>
                    </Tab>
                </Tabs>
                <Outlet />
              </>
            )}
        </Container>
    );
}
export default Coin;