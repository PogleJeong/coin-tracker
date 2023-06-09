import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { DarkMode } from "../Recoil/atoms";

const Wrapper = styled.div<{isDark: boolean}>`
    background-color: ${(props)=>props.isDark ? "gray": "beige"};
`

const Table = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    padding: 10px 30px;
    margin: 100px 0px;
    left: -20%;
    width: 140%;
    max-height: 1000px;
    overflow: scroll;
`

const Flex = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    //border: 2px solid ${(props)=>props.theme.textColor};
    padding: 20px 10px;
`

const Header = styled.div<{isDark: boolean}>`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2fr;
    background-color: ${(props)=>props.isDark ? "skyblue" : "beige"};
`

const Head = styled(Flex)`
    font-size: 24px;
    font-weight: bold;
`

const Info = styled(Flex)`
    font-size: 18px;
`

const Row = styled.div<{isDark: boolean}>`
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1fr 1fr 2fr;
    background-color:${(props)=> props.isDark ? "gray" : "white"};
    border: none;
    border-radius: 20px;
    margin-top: 20px;
    padding: 25px;
    transition: background-color 2s, scale 2s;
    &:hover {
        background-color: ${(props)=> props.isDark ? "skyblue" : "beige"};
        scale: 1.05;
    }
`

/* 
const Head = styled.th`
    border: 1px solid white;
    padding: 25px;
`

const Time = styled.td`
    border: 1px solid white;
    padding: 25px;
    font-size: 18px;
    min-width: 350px;
`

const Dollers = styled.td`
    border: 1px solid white;
    padding: 25px;
    font-size: 18px;
` */

interface PriceProps {
    coinId: String,
}

interface IChartData {
    time_open: String,
    time_close: String,
    open: String,
    high: String,
    low: String,
    close: String,
    volume: String,
    market_cap: Number,
}

function Price() {
    const isDark = useRecoilValue(DarkMode);
    const { coinId } = useOutletContext<PriceProps>()
    const { isLoading, data } = useQuery<IChartData[]>(["price", coinId], ()=>fetchCoinHistory(coinId!));
    return(
        <Wrapper isDark={isDark}>
            {isLoading ? (
                "loading..."
            ) : (
            <>
            <Table>
                <Header isDark={isDark}>
                    <Head>Open Time</Head>
                    <Head>Open</Head>
                    <Head>High</Head>
                    <Head>Low</Head>
                    <Head>Close</Head>
                    <Head>Close Time</Head>
                </Header>
                {data?.map((info, index)=>(
                <Row isDark={isDark} key={index}>
                    <Info >{new Date(Number(info.time_open) * 1000).toLocaleString('ko-KR', { timeZone: 'UTC' })}</Info>
                    <Info>${Number(info.open).toFixed(2)}</Info>
                    <Info>${Number(info.high).toFixed(2)}</Info>
                    <Info>${Number(info.low).toFixed(2)}</Info>
                    <Info>${Number(info.close).toFixed(2)}</Info>
                    <Info>{new Date(Number(info.time_close) * 1000).toLocaleString('ko-KR', { timeZone: 'UTC' })}</Info>
                </Row>
                ))}
            </Table>
            </>
            )}
        </Wrapper>
    )
}
export default Price;