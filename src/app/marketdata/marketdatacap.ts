interface MarketData {
  active_cryptocurrencies: number;
  total_market_cap: { usd: number, eth: number, btc: number };
  market_cap_percentage: { btc: number, eth: number };
  total_volume: { usd: number, eth: number, btc: number };

}

export const marketDataCap = async (): Promise<MarketData> => {
  const url = "https://api.coingecko.com/api/v3/global";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch table data");
  }
  const json = await response.json();
  return json.data;
};