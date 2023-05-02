import axios from "axios";
// react query 를 통해 api 사용
// react query 에서 response 를 caching 함, 따라서 화면 전환이 일어나도 
// data 에 response 가 있는지 알고있음.

export async function fetchCoins() {
    return await axios.get("https://api.coinpaprika.com/v1/coins").then((response => response.data.slice(0,100)));
}