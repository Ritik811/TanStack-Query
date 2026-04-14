import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const url = `https://v6.exchangerate-api.com/v6/${API_KEY}`;
const api = axios.create({
  baseURL: url,
});

export const currencyConverter = async (fromCurrency, toCurrency, amount) => {
  const res = await api.get(`/pair/${fromCurrency}/${toCurrency}/${amount}`);
  console.log(res);
  return res.data.conversion_result;
};
