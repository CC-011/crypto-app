interface Coin {
  id: string;
  date: string;
  amount: number;
  idUnique?: number;
}

export const fetchCoinData = async (coins: Coin[]) => {
  const pricedCoinsObject = await Promise.all(
    coins.map(async (coin) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}`
      );
      const json = await res.json();
      return {
        ...coin,
        currentPrice: json.market_data.current_price.usd,
      };
    })
  );

  const newPortfolio = await Promise.all(
    pricedCoinsObject.map(async (coin) => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coin.id}/history?date=${coin.date}`
      );
      const json = await res.json();
      return {
        id: json.id,
        name: json.name,
        symbol: json.symbol,
        image: json.image?.small,
        market_cap: json.market_data?.market_cap?.usd,
        total_volume: json.market_data?.total_volume?.usd,
        total: coin.amount * json.market_data?.current_price?.usd,
        previousPrice: json.market_data?.current_price?.usd,
        currentPrice: coin.currentPrice,
        isBigger: json.market_data?.current_price?.usd > coin.currentPrice,
        idUnique: coin.idUnique,
      };
    })
  );

  return newPortfolio;
};
