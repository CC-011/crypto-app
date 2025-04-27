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
      <Card style={{ display: "flex", padding: "50px 0px" }}>
        <Card
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <h3 style={{ fontSize: "20px" }}>Your statics</h3>
          <Card></Card>
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "244px",
              height: "45px",
              background: "rgba(120, 120, 250, 1)",
              borderRadius: "6px",
              cursor: "pointer",
            }}
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
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: "2",
              position: "absolute",
              width: "886px",
              height: "393px",
              background: "rgba(19, 18, 26, 1)",
              padding: "48px",
              left: "270px",
              borderRadius: "20px",
              top: "300px",
            }}
          >
            <Card style={{ height: "100%", width: "100%" }}>
              <CardContent
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <CardTitle style={{ fontSize: "20px" }}>Select coins</CardTitle>
                <CardTitle
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPopUp(!showPopup)}
                >
                  X
                </CardTitle>
              </CardContent>
              <Card style={{ display: "flex", width: "805px" }}>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                    gap: "30px",
                    height: "241px",
                    width: "297px",
                    background: "rgba(25, 25, 50, 1)",
                  }}
                >
                  <p>1. Type coin name, then select from dropdown</p>
                  <p>2. Type amount owned (default: 0)</p>
                  <p>3 Type date Purchased (default today)</p>
                </CardContent>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    height: "265px",
                  }}
                >
                  <Card>
                    <input
                      type="text"
                      value={filterByName}
                      onChange={(e) => {
                        setFilterByName(e.currentTarget.value);
                      }}
                      placeholder="Select coins"
                      style={{
                        width: "461px",
                        height: "44px",
                        background: "rgba(25, 25, 37, 1)",
                        padding: "8px",
                      }}
                    />
                    <Card
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "absolute",
                        background: "rgba(25, 25, 37, 1)",
                      }}
                    >
                      {filterByName ? (
                        <Card>
                          {filtered?.map((data) => (
                            <p
                              key={data.id}
                              style={{ cursor: "pointer" }}
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
                      style={{
                        width: "461px",
                        height: "44px",
                        background: "rgba(25, 25, 37, 1)",
                        padding: "8px",
                      }}
                    />
                  </Card>
                  <Card>
                    <input
                      max={noFuturePurchases.toLocaleDateString()}
                      value={purchasedDate}
                      onChange={(e) => setPurchasedDate(e.currentTarget.value)}
                      placeholder="Purchased date"
                      type="date"
                      style={{
                        width: "461px",
                        height: "44px",
                        background: "rgba(25, 25, 37, 1)",
                        padding: "8px",
                      }}
                    />
                  </Card>
                  <Card
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "222.5px",
                        height: "45px",
                        background: "rgba(35, 35, 54, 1)",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
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
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "222.5px",
                        height: "45px",
                        background: "rgba(120, 120, 250, 1)",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                      onClick={() => setShowPopUp(!showPopup)}
                    >
                      Cancel
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
      <Card style={{ display: "flex", justifyContent: "center" }}>
        <CardContent>
          <CardContent>
            <Card></Card>
            <Card>
              <Card>
                {data?.map((data: any) => (
                  <Card
                    key={data.idUnique}
                    style={{
                      display: "flex",
                      width: "1260px",
                      height: "300px",
                      marginBottom: "40px",
                    }}
                    className="bg-titleCardPortfolio"
                  >
                    <CardContent
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "300px",
                        height: "300px",
                      }}
                      className="bg-infoCardPortfolio"
                    >
                      <Card
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Card
                          style={{
                            width: "64px",
                            height: "64px",
                            padding: "16px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            background: "rgba(44, 44, 74, 1)",
                            borderRadius: "8px",
                            marginBottom: "25px",
                          }}
                        >
                          <Avatar>
                            <AvatarImage src={data.image} />
                            <AvatarFallback>Coin Image</AvatarFallback>
                          </Avatar>
                        </Card>
                        <Card style={{ fontSize: "28px" }}>
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
                      <Card
                        style={{
                          paddingTop: "20px",
                          paddingLeft: "25px",
                          width: "100%",
                        }}
                      >
                        <CardTitle
                          style={{
                            fontSize: "20px",
                            fontWeight: "normal",
                            paddingBottom: "15px",
                          }}
                        >
                          Market price:
                        </CardTitle>
                        <Card
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Card>
                            <CardFooter>
                              <p>Current price </p>
                            </CardFooter>
                            <CardContent
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <p style={{ color: "rgba(1, 241, 227, 1)" }}>
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
                            <CardContent
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                              }}
                            >
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
                              <p style={{ color: "rgba(1, 241, 227, 1)" }}>
                                <ShowCoinPricesInUsDollars
                                  cryptoPricesInUsDollars={data.previousPrice}
                                />
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>Market Cop vs Volume</CardFooter>
                            <CardContent style={{ display: "flex" }}>
                              <p style={{ paddingRight: "25px" }}>
                                {Math.abs(
                                  data.total_volume / data.market_cap
                                ).toFixed(2)}
                                %
                              </p>
                              <Card
                                style={{
                                  height: "10px",
                                  position: "relative",
                                  width: "120px",
                                  borderRadius: "10px",
                                  margin: "auto 0",
                                  overflow: "hidden",
                                  border: "none",
                                  marginRight: "auto",
                                }}
                              >
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
                            <CardContent
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <p style={{ color: "rgba(1, 241, 227, 1)" }}>
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
                      <Card
                        style={{
                          border: "1px solid rgba(255, 255, 255, 0.8)",
                          width: "810px",
                          marginTop: "5px",
                          marginLeft: "25px",
                          marginBottom: "5px",
                        }}
                      ></Card>
                      <Card
                        style={{
                          paddingTop: "10px",
                          paddingLeft: "25px",
                          width: "100%",
                        }}
                      >
                        <CardTitle
                          style={{
                            fontSize: "20px",
                            fontWeight: "normal",
                            paddingBottom: "15px",
                          }}
                        >
                          Your coin:
                        </CardTitle>
                        <Card style={{ display: "flex" }}>
                          <Card>
                            <CardFooter>Coin amount:</CardFooter>
                            <CardContent
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <p style={{ color: "rgba(1, 241, 227, 1)" }}>
                                <ShowCoinPricesInUsDollars
                                  cryptoPricesInUsDollars={data.currentPrice}
                                />
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>Amount value</CardFooter>
                            <CardContent
                              style={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                alignItems: "center",
                              }}
                            >
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
                              <p style={{ color: "rgba(1, 241, 227, 1)" }}>
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
                            <CardContent
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                gap: "10px",
                              }}
                            >
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
                              <p style={{ color: "rgba(1, 241, 227, 1)" }}>
                                {Math.abs(data.total).toFixed(2)}%
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>Circ supply vs max supply</CardFooter>
                            <CardContent
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <p style={{ color: "rgba(1, 241, 227, 1)" }}>
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
