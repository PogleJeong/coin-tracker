import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import styled from "styled-components";

const Artcle = styled.article`
    position: relative;
`

const Table = styled.div`
    position: absolute;
    left: -100%;
    border-collapse: collapse;
`

const Row = styled.tr`
    border: 1px solid white;
    padding: 25px;
`
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
   
`

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
    const { coinId } = useOutletContext<PriceProps>()
    const { isLoading, data } = useQuery<IChartData[]>(["price", coinId], ()=>fetchCoinHistory(coinId!));
    return(
        <div>
            {isLoading ? (
                "loading"
            ) : (
            <Artcle>
                <Table>
                    <Row>
                        <Head>Open Time</Head>
                        <Head>Close Time</Head>
                        <Head>Open</Head>
                        <Head>High</Head>
                        <Head>Low</Head>
                        <Head>Close</Head>
                    </Row>
                    {data?.map((info)=>(
                        <Row>
                            <Time>{new Date(Number(info.time_open) * 1000).toUTCString()}</Time>
                            <Time>{new Date(Number(info.time_close) * 1000).toUTCString()}</Time>
                            <Dollers>${Number(info.open).toFixed(2)}</Dollers>
                            <Dollers>${Number(info.high).toFixed(2)}</Dollers>
                            <Dollers>${Number(info.low).toFixed(2)}</Dollers>
                            <Dollers>${Number(info.close).toFixed(2)}</Dollers>
                        </Row>
                        ))}
                </Table>
            </Artcle>
            )}
        </div>
    )
}
export default Price;