import { useQuery } from "react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ReactApexChart from "react-apexcharts";

import { useRecoilValue} from 'recoil';
import { DarkMode } from "../Recoil/atoms";

/**
    APEXCHART 를 통해 Chart 시각화 : JS 라이브러리
    npm install --save react-apexcharts apexcharts
    
    https://apexcharts.com/docs/
*/

interface ChartProps {
    coinId: string,
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

function Chart() {
    const isDark = useRecoilValue(DarkMode);
    const { coinId } = useOutletContext<ChartProps>();
    const { isLoading, data } = useQuery<IChartData[]>(["chart", coinId], ()=>fetchCoinHistory(coinId));

    return(
        <div>
            {isLoading ? (
        "Loading chart..."
      ) : (
        <ReactApexChart
          type="candlestick"

          series={[
            {
              data: data?.map((q)=> [q.time_open, [q.open, q.high, q.low, q.close]]) as []
            }
          ]}

          options={{
            theme: {
              mode: isDark? "dark" : "light",
            },
            chart: {
              type: 'candlestick',
              height: 300,
              width: 500,
              toolbar: { // 차트안에 툴바 생략(다운로드기능 등)
                show: false,
              },
              background: "transparent",
            },
            title: {
              text: "Coin chart!",
              align: "left",
            },
            grid: { show: false },
            stroke: { // stroke : 선
              curve: "smooth",
              width: 4,
            },
            yaxis: { // y축
              show: false,
            },
            xaxis: { // x축
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              categories: data?.map((price) => new Date(Number(price.time_close) * 1000).toUTCString())
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0,100]},
              colors:["#0fbcf9"],
            },
            tooltip: {
                y: {
                  formatter: (value)=> `$${value.toFixed(2)}` // 두자리 수로 포멧팅
                }
              }   
            }
          }
        />
      )}
      </div>
    )
}

export default Chart;

 /*  {
  name: "Price",
  data: data?.map((price) => Number(price.close)) as number[]
}, */