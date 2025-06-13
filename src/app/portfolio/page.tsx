"use client";
import { useAppDispatch } from "@/app/lib/hooks";
import React from "react";
import { RootState } from "../lib/store";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinData } from "./fetch";
import { useSelector } from "react-redux";
import { useState } from "react";
import { ShowCoinPricesInUsDollars } from "../Utils/formatNumbers";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addCoins, removeCoins } from "./payload";

function PortfolioPage() {
  const dispatch = useAppDispatch();
  const { tableChart } = useSelector((state: RootState) => state.table);
  const CoinDataState = useSelector((state: RootState) => state.coinItems);
  const { data } = useQuery({
    queryKey: ["user-portfolio", CoinDataState],
    queryFn: () => fetchCoinData(CoinDataState),
    enabled: CoinDataState.length > 0,
  });

  const [name, setName] = useState("bitcoin");
  const [purchasedDate, setPurchasedDate] = useState("");
  const [purchasedAmount, setPurchasedAmount] = useState(0);
  const [showPopup, setShowPopUp] = useState(false);
  const [filterByName, setFilterByName] = useState("");
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
    <Card>
      <Card className="popup-container">
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
          <Card className="popup bg-popupContainer">
            <Card className="popup-items-height-width">
              <CardContent className="popup-content">
                <CardTitle className="popup-select-coin">
                  Select coins
                </CardTitle>
                <CardTitle
                  className="pointer"
                  onClick={() => setShowPopUp(!showPopup)}
                >
                  X
                </CardTitle>
              </CardContent>
              <Card className="instructions-container bg-popupContainer">
                <CardContent className="instructions-styling">
                  <p>1. Type coin name, then select from dropdown</p>
                  <p>2. Type amount owned (default: 0)</p>
                  <p>3 Type date Purchased (default today)</p>
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
                        <Card className="bg-coinList">
                          {filtered?.map((data) => (
                            <p
                              key={data.id}
                              className="pointer"
                              onClick={() => {
                                setName(data.name.toLocaleLowerCase()),
                                  setFilterByName(data.name);
                              }}
                            >
                              {data.name}
                            </p>
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
                      className="cancel-button-styling bg-cancelCoin"
                      onClick={() => setShowPopUp(!showPopup)}
                    >
                      Cancel
                    </p>
                    <p
                      className="save-button-styling bg-saveCoin"
                      onClick={() => {
                        setShowPopUp(!showPopup),
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
                {data?.map((data: any) => (
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
                        <CardTitle className="coin-market">
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
                          <Card>
                            <button
                              onClick={() =>
                                dispatch(removeCoins(data.idUnique))
                              }
                            >
                              Delete coin
                            </button>
                          </Card>
                        </Card>
                      </Card>
                      <Card className="white-line"></Card>
                      <Card className="your-coin-container">
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
    </Card>
  );
}

export default PortfolioPage;
