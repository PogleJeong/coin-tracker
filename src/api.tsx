import axios from "axios";
// react query 를 통해 api 사용
// react query 에서 response 를 caching 함, 따라서 화면 전환이 일어나도 
// data 에 response 가 있는지 알고있음.

const BASE_URL = `https://api.coinpaprika.com/v1`;
const BASE_URL2 = `https://ohlcv-api.nomadcoders.workers.dev`;
export const fetchCoins = async() => {
    return await axios.get(`${BASE_URL}/coins`).then((response => response.data.slice(0,100)));
}

export const fetchCoinInfo = async(coinId: String) => {
    return await axios.get(`${BASE_URL}/coins/${coinId}`).then(response => response.data);
}

export const fetchCoinTickers = async(coinId: String) => {
    return await axios.get(`${BASE_URL}/tickers/${coinId}`).then(response => response.data);
}

export const fetchCoinHistory = async(coinId: String) => {
    return await axios.get(`${BASE_URL2}/?coinId=${coinId}`).then(response=> response.data);
}