
import { useLocation, useParams, useMatch, Outlet, Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo } from "../api";
import { useQuery } from "react-query";
import { useSetRecoilState, useRecoilValue } from 'recoil';

import { DarkMode } from "../Recoil/atoms";

// react-router-dom v6 이상인 경우 interface 설정안해도 가능
// 자동으로 useParams 는 type 이 string or undefined 로 설정됨
const Container = styled.div`
  position: relative;
    padding: 0px 20px;
    max-width: 800px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinLogo = styled.img`
    height:60px;
    aspect-ratio: 1/1;
    margin-right: 20px;
`;

const Title = styled.h1`
    font-size: 48px;
    font-weight: bold;
    color: ${props => props.theme.accentColor};
`

const Loader = styled.span`
    display: block;
    text-align: center;
    font-size: 30px;
`;

const Overviews = styled.div`
  display: grid;
  grid-template-columns: 1fr, 2fr;
`


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
  background-color: ${(props)=> props.isActive ? "gray" :  "rgba(255, 255, 255, 0.5)"};
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => props.isActive ? "white" : "black"};
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
  const { coinId } = useParams();

  // useMatch(url) 현재 페이지가 안자안의 url 과 같은 url이면 true 아니면 false 
  const priceMatch = useMatch("/coin-tracker/:coinId/price");
  const chartMatch = useMatch("/coin-tracker/:userId/chart");
  // react query 의 key 는 array 안에 속해있음. 따라서 다른 key를 추가하기 위해서는 array 사용
  // 기존변수명 : 사용할 변수명
  const {isLoading: infoLoading, data: infoData}  = useQuery<InfoData>(["info", coinId], ()=> fetchCoinInfo(coinId!));
  const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceData>(["tickers",coinId], ()=> fetchCoinInfo(coinId!));
    
    const loading = infoLoading || tickersLoading;

    return(
        <Container>
            <Header>
              <CoinLogo src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`} />
              <Title>{coinId || "Loading..."}</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader> 
            )
            : (
                <>
                  <Overview>
                    <OverviewItem>
                      <span>Rank:</span>
                      <span>{infoData?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>Symbol:</span>
                      <span>${infoData?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>Price:</span>
                      <span>{infoData?.open_source ? "Yes" : "No"}</span>
                    </OverviewItem>
                  </Overview>
                  <Description>{infoData?.description}</Description>
                  <Overview>
                    <OverviewItem>
                      <span>Total Suply:</span>
                      <span>{tickersData?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                      <span>Max Supply:</span>
                      <span>{tickersData?.max_supply}</span>
                    </OverviewItem>
                  </Overview>
         
                <Tabs>
                    {/* 현재 url 과 useMatch(url)의 url 과 같으면 active 됨. */ }
                    <Tab isActive={chartMatch !== null}>
                      <Link to="chart">Chart</Link>
                    </Tab>
                    <Tab isActive={priceMatch !== null}>
                      <Link to="price">Price</Link>
                    </Tab>
                </Tabs>
                <Outlet context={{coinId}}/>
              </>
            )}
        </Container>
    );
}
export default Coin;