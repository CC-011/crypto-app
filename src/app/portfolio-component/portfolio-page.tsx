import { useAppDispatch } from "@/app/lib/hooks";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { RootState } from "../lib/store";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinData } from "../portfolio/fetch";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ShowCoinPricesInUsDollars } from "../Utils/formatNumbers";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addCoins } from "../portfolio/payload";
import { toggleCond } from "../portfolio/hide-menu";
import { fetchTableChart } from "../tableChart/table";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { toggleBoolean } from "../navbarComponent/hide-chart";
function PortfolioPage() {
  const dispatch = useAppDispatch();
  const CoinDataState = useSelector((state: RootState) => state.coinItems);
  const boolean = useSelector((state: RootState) => state.boolean);

  interface CoinData {
    id: string;
    name: string;
    symbol: string;
    image: string;
    market_cap: number;
    total_volume: number;
    total: number;
    previousPrice: number;
    currentPrice: number;
    isBigger: boolean;
    idUnique?: number;
  }

  const { data } = useQuery({
    queryKey: ["user-portfolio", CoinDataState],
    queryFn: () => fetchCoinData(CoinDataState),
    enabled: CoinDataState.length > 0,
  });
  const [coinPrev, setCoinPrev] = useState<CoinData[]>(data ?? []);
  const remove = (idUnique: number) => {
    const updated = coinPrev.filter((el) => el.idUnique !== idUnique);
    setCoinPrev(updated);
    localStorage.setItem("coin", JSON.stringify(updated));
  };
  const defaultMarket = useSelector((state: RootState) => state.order);
  const rows = 50;
  const chartCurrencyEPage = useSelector(
    (state: RootState) => state.converterCurrency
  );

  const { data: tableChart } = useQuery({
    queryKey: ["tableData", defaultMarket, chartCurrencyEPage, rows],
    queryFn: () => fetchTableChart({ defaultMarket, chartCurrencyEPage, rows }),
  });

  useEffect(() => {
    if (typeof window !== "undefined" && data && data.length > 0) {
      localStorage.setItem("coin", JSON.stringify(data));
    }
  }, [data]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const prev = localStorage.getItem("coin");
      setCoinPrev(prev ? JSON.parse(prev) : []);
    }
  }, []);

  const [name, setName] = useState("bitcoin");
  const [symbol, setSymbol] = useState("");
  const [purchasedDate, setPurchasedDate] = useState("");
  const [purchasedAmount, setPurchasedAmount] = useState(0);
  const [coinImageUrl, setCoinImageUrl] = useState("");
  const [showPopup, setShowPopUp] = useState(false);
  const [filterByName, setFilterByName] = useState("");
  const [showMobileCoinMenu, setShowMobileCoinMenu] = useState(false);
  const path = usePathname();

  const filtered = tableChart?.filter((data) =>
    data.name.toLocaleLowerCase().startsWith(filterByName)
  );

  const splitted = purchasedDate.split("-");
  const newFormat = `${splitted[2]}-${splitted[1]}-${splitted[0]}`;
  const noFuturePurchases = new Date();

  interface barPercentage {
    number: number;
  }

  function ProgressCustom({ number }: barPercentage) {
    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(number), 500);
      return () => clearTimeout(timer);
    }, [number]);

    return <Progress value={progress} className="w-[100%]" />;
  }

  return (
    <Card className="overflow-hidden">
      <Card className="popup-container hide">
        <Card className="popup-space-around">
          <h3 className="popup-h3">Your statics</h3>
          <Card></Card>
          <h3
            className="popup-add-asset"
            onClick={() => setShowPopUp(!showPopup)}
          >
            Add Asset
          </h3>
        </Card>
      </Card>
      <Card></Card>
      <>
        {showPopup ? (
          <Card
            className={`positionedBox ${boolean ? "positionedBox--hidden" : "positionedBox--visible"} popup bg-popupContainer`}
          >
            <Card className="popup-items-height-width">
              <CardContent className="popup-content">
                <CardTitle className="popup-select-coin">
                  Select coins
                </CardTitle>
                <CardTitle
                  className="pointer"
                  onClick={() => {
                    setFilterByName("");
                    setShowPopUp(!showPopup);
                    dispatch(toggleBoolean());
                  }}
                >
                  X
                </CardTitle>
              </CardContent>
              <Card className="instructions-container bg-popupContainer">
                <CardContent className="instructions-styling">
                  <div className="flex center align column instructions-gap">
                    <div>
                      <img className="instructions-image" src={coinImageUrl} />
                    </div>
                    <Card>
                      <div className="flex">
                        <p> {name ?? ""}</p>
                        <p>{symbol ? <>({symbol})</> : <></>}</p>
                      </div>
                    </Card>
                  </div>
                </CardContent>
                <CardContent className="user-input-spacing">
                  <Card>
                    <input
                      className="input-coin-name bg-searchBar"
                      type="text"
                      value={filterByName}
                      onChange={(e) => {
                        setFilterByName(e.currentTarget.value);
                      }}
                      placeholder="Select coins"
                    />
                    <Card className="filterList">
                      {filterByName ? (
                        <Card className="bg-coinList filter-list-width">
                          {filtered?.map((data) => (
                            <div key={data.id} className="flex align">
                              <img
                                className="filter-list-image"
                                src={data.image}
                                alt="coin image"
                              />
                              <p
                                className="pointer"
                                onClick={() => {
                                  setName(data.name.toLocaleLowerCase()),
                                    setSymbol(data.symbol.toLocaleUpperCase());
                                  setCoinImageUrl(data.image);
                                  setFilterByName(data.name);
                                }}
                              >
                                {data.name}
                              </p>
                            </div>
                          ))}
                        </Card>
                      ) : (
                        <></>
                      )}
                    </Card>
                  </Card>
                  <Card>
                    <input
                      min={"1"}
                      value={
                        purchasedAmount ? purchasedAmount : "Purchased amount"
                      }
                      onChange={(e) =>
                        setPurchasedAmount(+e.currentTarget.value)
                      }
                      type="number"
                      placeholder="Purchased amount"
                      className="input-coin-amount bg-searchBar"
                    />
                  </Card>
                  <Card>
                    <input
                      max={noFuturePurchases.toLocaleDateString()}
                      value={purchasedDate}
                      onChange={(e) => setPurchasedDate(e.currentTarget.value)}
                      placeholder="Purchased date"
                      type="date"
                      className="input-coin-date bg-searchBar"
                    />
                  </Card>
                  <Card className="save-cancel-spacing">
                    <p
                      className="cancel-button-styling bg-cancelCoin pointer"
                      onClick={() => {
                        setFilterByName("");
                        setShowPopUp(!showPopup);
                        dispatch(toggleBoolean());
                      }}
                    >
                      Cancel
                    </p>
                    <p
                      className="save-button-styling bg-saveCoin pointer"
                      onClick={() => {
                        setFilterByName("");
                        setShowPopUp(!showPopup), dispatch(toggleBoolean());
                        dispatch(
                          addCoins({
                            id: name,
                            date: newFormat,
                            amount: purchasedAmount,
                            idUnique: Math.random(),
                          })
                        );
                      }}
                    >
                      Save and Continue
                    </p>
                  </Card>
                </CardContent>
              </Card>
            </Card>
          </Card>
        ) : (
          <Card></Card>
        )}
      </>
      <Card className="portfolio-coin-containers">
        <CardContent>
          <CardContent>
            <Card></Card>
            <Card>
              <Card>
                {coinPrev?.map((data: any) => (
                  <Card
                    key={data.idUnique}
                    className="bg-titleCardPortfolio portfolio-coin-list"
                  >
                    <CardContent className="bg-infoCardPortfolio portfolio-coin-info">
                      <Card className="coin-image-spacing">
                        <Card className="coin-image-styling">
                          <Avatar>
                            <AvatarImage src={data.image} />
                            <AvatarFallback>Coin Image</AvatarFallback>
                          </Avatar>
                        </Card>
                        <Card className="coin-font-size">
                          {" "}
                          {data.id ? data.id.toLocaleUpperCase() : data.id} (
                          {data.symbol
                            ? data.symbol.toLocaleUpperCase()
                            : data.symbol}
                          ){" "}
                        </Card>
                      </Card>
                    </CardContent>
                    <Card>
                      <Card className="coin-market-headers">
                        <CardTitle className="coin-market hide">
                          Market price:
                        </CardTitle>
                        <Card className="space-between">
                          <Card>
                            <CardFooter>
                              <p>Current price </p>
                            </CardFooter>
                            <CardContent className="current-price">
                              <p className="portfolio-coin-data-color">
                                <ShowCoinPricesInUsDollars
                                  cryptoPricesInUsDollars={data.currentPrice}
                                />
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>
                              <p>Price change 24h</p>
                            </CardFooter>
                            <CardContent className="price-change-spacing">
                              <Card>
                                <Card>
                                  {data.previousPrice >= 0 ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="#00FC2A"
                                      viewBox="0 0 24 24"
                                      strokeWidth={0}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      {" "}
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                      />{" "}
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="#FE1040"
                                      viewBox="0 0 24 24"
                                      strokeWidth={0}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      {" "}
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                      />{" "}
                                    </svg>
                                  )}
                                </Card>
                              </Card>
                              <p className="portfolio-coin-data-color">
                                <ShowCoinPricesInUsDollars
                                  cryptoPricesInUsDollars={data.previousPrice}
                                />
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>Market Cop vs Volume</CardFooter>
                            <CardContent className="flex">
                              <p className="padding-right-market-cap">
                                {Math.abs(
                                  data.total_volume / data.market_cap
                                ).toFixed(2)}
                                %
                              </p>
                              <Card className="progress-bar">
                                <ProgressCustom
                                  number={
                                    (data.total_volume / data.market_cap) * 100
                                  }
                                />
                              </Card>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>Circ supply vs max supply</CardFooter>
                            <CardContent className="center">
                              <p className="portfolio-coin-data-color">
                                {" "}
                                <ShowCoinPricesInUsDollars
                                  cryptoPricesInUsDollars={data.currentPrice}
                                />
                              </p>
                            </CardContent>
                          </Card>
                          <Card className="pointer">
                            <button onClick={() => remove(data.idUnique)}>
                              x
                            </button>
                          </Card>
                        </Card>
                      </Card>
                      <Card className="white-line hide"></Card>
                      <Card className="your-coin-container hide">
                        <CardTitle className="your-coin-title">
                          Your coin:
                        </CardTitle>
                        <Card className="flex">
                          <Card>
                            <CardFooter>Coin amount:</CardFooter>
                            <CardContent className="center">
                              <p className="portfolio-coin-data-color">
                                <ShowCoinPricesInUsDollars
                                  cryptoPricesInUsDollars={data.currentPrice}
                                />
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>Amount value</CardFooter>
                            <CardContent className="space-evenly">
                              <Card>
                                <Card>
                                  {data.previousPrice >= 0 ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="#00FC2A"
                                      viewBox="0 0 24 24"
                                      strokeWidth={0}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      {" "}
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                      />{" "}
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="#FE1040"
                                      viewBox="0 0 24 24"
                                      strokeWidth={0}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      {" "}
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                      />{" "}
                                    </svg>
                                  )}
                                </Card>
                              </Card>
                              <p className="portfolio-coin-data-color">
                                <ShowCoinPricesInUsDollars
                                  cryptoPricesInUsDollars={data.previousPrice}
                                />
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>
                              Amount price change since purchase
                            </CardFooter>
                            <CardContent className="price-change-since-purchase">
                              <Card>
                                <Card>
                                  {data.total >= 0 ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="#00FC2A"
                                      viewBox="0 0 24 24"
                                      strokeWidth={0}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      {" "}
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m4.5 15.75 7.5-7.5 7.5 7.5"
                                      />{" "}
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="#FE1040"
                                      viewBox="0 0 24 24"
                                      strokeWidth={0}
                                      stroke="currentColor"
                                      className="size-6"
                                    >
                                      {" "}
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                      />{" "}
                                    </svg>
                                  )}
                                </Card>
                              </Card>
                              <p className="portfolio-coin-data-color">
                                {Math.abs(data.total).toFixed(2)}%
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>Circ supply vs max supply</CardFooter>
                            <CardContent className="center">
                              <p className="portfolio-coin-data-color">
                                <ShowCoinPricesInUsDollars
                                  cryptoPricesInUsDollars={data.previousPrice}
                                />
                              </p>
                            </CardContent>
                          </Card>
                        </Card>
                      </Card>
                    </Card>
                  </Card>
                ))}
              </Card>
            </Card>
          </CardContent>
        </CardContent>
      </Card>
      {/*
      <Card className="portfolio-container-menu">
        <Card className="hide portfolio-menu">
          {showMobileCoinMenu ? (
            <div className="bg-popupContainer menu-width">
              <div
                onClick={() => {
                  setShowMobileCoinMenu(!showMobileCoinMenu),
                    dispatch(toggleBoolean());
                }}
              >
                X
              </div>
              <Command className="bg-coinList">
                <CommandInput
                  placeholder="Search..."
                  onValueChange={setFilterByName}
                />
                <CommandList>
                  <CommandSeparator />
                  <CommandGroup>
                    {filterByName ? (
                      filtered?.map((data) => (
                        <div key={data.id} className="flex align gap-image">
                          <img
                            className="image-size-mobile"
                            src={data.image}
                            alt="coin image"
                          />
                          <CommandItem
                            className="pointer"
                            onSelect={() => {
                              setName(data.name.toLocaleLowerCase());
                              setFilterByName(data.name);
                              setCoinImageUrl(data.image);
                              setShowPopUp((prev) => !prev);
                              setShowMobileCoinMenu((prev) => !prev);
                            }}
                          >
                            {data.name}
                          </CommandItem>
                        </div>
                      ))
                    ) : (
                      <>
                        <CommandItem disabled>
                          <h3 className="text-align font-size-coin-search">
                            Search for a coin to add to your portfolio
                          </h3>
                        </CommandItem>
                      </>
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          ) : (
            <div></div>
          )}
        </Card>
      </Card>*/}
      {showMobileCoinMenu && (
        <Card className="portfolio-container-menu">
          <Card className="portfolio-menu">
            <div className="menu-width">
              <div className="bg-coinList space-between">
                <div></div>
                <div
                  className="pointer"
                  onClick={() => {
                    setFilterByName("");
                    setShowMobileCoinMenu(false);
                    dispatch(toggleBoolean());
                  }}
                >
                  x
                </div>
              </div>
              <Command className="bg-coinList">
                <CommandInput
                  placeholder="Search..."
                  onValueChange={setFilterByName}
                />
                <CommandList>
                  <CommandSeparator />
                  <CommandGroup>
                    {filterByName ? (
                      filtered?.map((data) => (
                        <div key={data.id} className="flex align gap-image">
                          <img
                            className="image-size-mobile"
                            src={data.image}
                            alt="coin image"
                          />
                          <CommandItem
                            className="pointer"
                            onSelect={() => {
                              setName(data.name.toLocaleLowerCase());
                              setFilterByName(data.name);
                              setCoinImageUrl(data.image);
                              setShowPopUp((prev) => !prev);
                              setShowMobileCoinMenu((prev) => !prev);
                            }}
                          >
                            {data.name}
                          </CommandItem>
                        </div>
                      ))
                    ) : (
                      <CommandItem disabled>
                        <h3 className="text-align font-size-coin-search">
                          Search for a coin to add to your portfolio
                        </h3>
                      </CommandItem>
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </Card>
        </Card>
      )}

      <Card className="hide-add-button-mobile button-Position-At-Bottom  container-button pointer">
        {path === "/portfolio" && boolean ? (
          <></>
        ) : (
          <>
            <Button
              variant="outline"
              onClick={() => {
                setShowMobileCoinMenu(!showMobileCoinMenu),
                  dispatch(toggleCond());
                dispatch(toggleBoolean());
              }}
            >
              +
            </Button>
          </>
        )}
      </Card>
    </Card>
  );
}

export default PortfolioPage;
