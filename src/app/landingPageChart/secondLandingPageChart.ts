interface inputValues {
  secondChartName: string,
  chartCurrencyEPage: string
}

interface BitcoinData {
  prices: [];
  total_volumes: [];
  market_caps: [];
}

export const fetchSecondCoinData = async ({
 secondChartName,
  chartCurrencyEPage,
}: inputValues): Promise<BitcoinData> => {
  const url = `https://api.coingecko.com/api/v3/coins/${secondChartName}/market_chart?vs_currency=${chartCurrencyEPage}&days=300`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch table data");
  }
  return response.json();
};