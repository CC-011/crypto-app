interface inputValues {
  coinNameOne: string | null,
  coinInterval: number,
  chartCurrencyEPage: string
}

interface BitcoinData {
  prices: [number, number][];
}

export const fetchConverterData = async ({
  coinNameOne,
  coinInterval,
  chartCurrencyEPage
}: inputValues): Promise<BitcoinData> => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinNameOne}/market_chart?vs_currency=${chartCurrencyEPage}&days=${coinInterval}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch table data");
  }
  return response.json();
};
