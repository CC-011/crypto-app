interface inputValues {
  chartNameEPage: string,
  chartCurrencyEPage: string
}

interface BitcoinData {
  prices: [];
  total_volumes: [];
  market_caps: [];
}

export const fetchChartData = async ({
 chartNameEPage,
  chartCurrencyEPage,
}: inputValues): Promise<BitcoinData> => {
  const url = `https://api.coingecko.com/api/v3/coins/${chartNameEPage}/market_chart?vs_currency=${chartCurrencyEPage}&days=300`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch table data");
  }
  return response.json();
};