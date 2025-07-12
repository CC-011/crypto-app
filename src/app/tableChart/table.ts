export interface InputValues {
  defaultMarket: string;
  chartCurrencyEPage: string;
  rows: number;
}

export interface TableChartData {
  name: string;
  id: number;
  image: string;
  symbol: string;
  high_24h: number;
  price_change_percentage_1h_in_currency: number;
  price_change_24h: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_change_24h: number;
  circulating_supply: number;
  total_volume: number;
  market_cap: number;
  total_supply: number;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export const fetchTableChart = async ({
  defaultMarket,
  chartCurrencyEPage,
  rows,
}: InputValues): Promise<TableChartData[]> => {
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${chartCurrencyEPage}&order=${defaultMarket}&per_page=${rows}&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch table data");
  }
  return response.json();
};
