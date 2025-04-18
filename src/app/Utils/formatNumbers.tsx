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

interface BtcPrices {
  cryptoSymbol: string;
  cryptoPricesInUsBitcoin: number;
}

const ShowCoinPricesInBTC = ({
  cryptoPricesInUsBitcoin,
  cryptoSymbol,
}: BtcPrices) => {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: cryptoSymbol,
  }).format(cryptoPricesInUsBitcoin);
};

export {
  ShowMarketNumbersInCompactForm,
  ShowCoinPricesInUsDollars,
  ShowCoinPricesInBTC,
};
