interface marketData {
  marketNumbers: number;
}

const ShowMarketNumbersInCompactForm = ({ marketNumbers }: marketData) => {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(marketNumbers);
};

interface UsPrices {
  cryptoPricesInUsDollars: number;
}

const ShowCoinPricesInUsDollars = ({ cryptoPricesInUsDollars }: UsPrices) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cryptoPricesInUsDollars);
};

export { ShowMarketNumbersInCompactForm, ShowCoinPricesInUsDollars };
