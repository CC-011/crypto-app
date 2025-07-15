interface IndividualCoinInfo {
    name: string,
    id: string,
    image: { large: string },
    symbol: string,
    links: { homepage: string, whitepaper: string, blockchain_site: string },
    last_updated: string,
    market_data: { 
       current_price: Record<string, number>;
       high_24h: Record<string, number>;
       low_24h: Record<string, number>;
       market_cap: Record<string, number>;
       fully_diluted_valuation: Record<string, number>;
       market_cap_change_24h: number, 
       total_volume: { usd: number }, 
       circulating_supply: number, 
       max_supply: number },
    market_cap_change_24h: number,
    circulating_supply: number,
    description: { en: string } 
    error: string
}

export const fetchIndividualCoinInfo = async ( data: string): Promise<IndividualCoinInfo> => {
  const url = `https://api.coingecko.com/api/v3/coins/${data}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch table data");
  }
  return response.json();
};