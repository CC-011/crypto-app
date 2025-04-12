"use client";
import { useAppDispatch } from "@/app/lib/hooks";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import { RootState } from "../lib/store";
import { coinPortfolioInfo } from "./portfolio";
import { coinValueAfterPurchase } from "./uniqueCoin";
import { coinValueDataAfterPurchase } from "./gainedValue";
import { useState } from "react";
import { ShowCoinPricesInUsDollars } from "../Utils/formatNumbers";
import { Container, Progress } from "../styledComponents/styles";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function PortfolioPage() {
  const dispatch = useAppDispatch();
  const { coinAfterPurchase } = useSelector(
    (state: RootState) => state.coinAfterPurchase
  );
  interface CoinEntry {
    id: string;
    date: string;
    amount: number;
  }
  const [ar, setArr] = useState<CoinEntry[]>([]);
  const [name, setName] = useState("bitcoin");
  const [purchasedDate, setPurchasedDate] = useState("");
  const [purchasedAmount, setPurchasedAmount] = useState(0);
  const [newFormatedDate, setNewFormatedDate] = useState("23-03-2025");
  const [showPopup, setShowPopUp] = useState(false);

  //setLocalStorageArray("coinAfterPurchase", coinAfterPurchase!);
  //const mySavedcoin = getLocalStorageArray("coinAfterPurchase");

  useEffect(() => {
    dispatch(coinValueAfterPurchase({ coin: name, date: newFormatedDate }));
  }, [dispatch, name, newFormatedDate]);

  const fetchDataBasedOnInput = () => {
    const noDupps = ar.reduce<{ [key: string]: { currentPrice: number } }>(
      (acc, el) => {
        if (acc[el.id]) return acc;
        return { ...acc, [el.id]: { currentPrice: 0 } }; // This is a placeholder
      },
      {}
    );

    //dispatch(coinValueAfterPurchase({ coin: name, date: newFormatedDate }));
    dispatch(
      coinValueDataAfterPurchase({ uniqueObject: noDupps, coinArray: ar })
    );
  };

  useEffect(() => {
    dispatch(coinPortfolioInfo());
  }, [dispatch]);
  const item = {
    id: name,
    date: newFormatedDate,
    amount: purchasedAmount,
  };
  //const copyArray = portfolio?.filter((data) => data);

  const addCoin = () => {
    const newItem = [...ar, { ...item }];
    setArr(newItem);
  };

  const splitted = purchasedDate.split("-");
  const newFormat = `${splitted[2]}-${splitted[1]}-${splitted[0]}`;
  const noFuturePurchases = new Date();
  //console.log(coinValue, name, newFormatedDate);
  //console.log(portfolio);
  return (
    <div>
      <div style={{ display: "flex", paddingBottom: "50px" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          <h3 style={{ fontSize: "20px" }}>Your statics</h3>
          <div></div>
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
        </div>
      </div>
      <div></div>
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
                    alignItems: "center",
                    height: "241px",
                    width: "297px",
                    background: "rgba(25, 25, 50, 1)",
                  }}
                >
                  coin
                </CardContent>
                <CardContent
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    height: "265px",
                  }}
                >
                  <div>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                      placeholder="Select coins"
                      style={{
                        width: "461px",
                        height: "44px",
                        background: "rgba(25, 25, 37, 1)",
                        padding: "8px",
                      }}
                    />
                  </div>
                  <div>
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
                  </div>
                  <div>
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
                  </div>
                  <div
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
                        addCoin(), setNewFormatedDate(newFormat), setName(name);
                        fetchDataBasedOnInput(), setShowPopUp(!showPopup);
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
                  </div>
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
            <>
              <>
                {coinAfterPurchase?.map((data) => (
                  <Card
                    style={{
                      display: "flex",
                      background: "rgba(25, 25, 50, 1)",
                      width: "1260px",
                      height: "300px",
                      marginBottom: "40px",
                    }}
                    key={data.id}
                  >
                    <CardContent
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "rgba(30, 25, 50, 1)",
                        width: "300px",
                        height: "300px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <div
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
                        </div>
                        <div style={{ fontSize: "28px" }}>
                          {" "}
                          {data.id ? data.id.toLocaleUpperCase() : data.id} (
                          {data.symbol
                            ? data.symbol.toLocaleUpperCase()
                            : data.symbol}
                          ){" "}
                        </div>
                      </div>
                    </CardContent>
                    <div>
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
                        <div
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
                            <CardContent>
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
                            <CardContent style={{ display: "flex" }}>
                              <div>
                                <div>
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
                                </div>
                              </div>
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
                              <Container style={{ width: "90px" }}>
                                <Progress
                                  style={{
                                    width:
                                      (data.total_volume / data.market_cap) *
                                      100,
                                  }}
                                />
                              </Container>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>Circ supply vs max supply</CardFooter>
                            <CardContent>
                              <p style={{ color: "rgba(1, 241, 227, 1)" }}>
                                {" "}
                                <ShowCoinPricesInUsDollars
                                  cryptoPricesInUsDollars={data.currentPrice}
                                />
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </Card>
                      <div
                        style={{
                          border: "1px solid rgba(255, 255, 255, 0.8)",
                          width: "810px",
                          marginTop: "5px",
                          marginLeft: "25px",
                          marginBottom: "5px",
                        }}
                      ></div>
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
                        <div style={{ display: "flex" }}>
                          <Card>
                            <CardFooter>Coin amount:</CardFooter>
                            <CardContent>
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
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <div>
                                <div>
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
                                </div>
                              </div>
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
                            <CardContent style={{ display: "flex" }}>
                              <div>
                                <div>
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
                                </div>
                              </div>
                              <p style={{ color: "rgba(1, 241, 227, 1)" }}>
                                {Math.abs(data.total).toFixed(2)}%
                              </p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardFooter>Circ supply vs max supply</CardFooter>
                            <CardContent>
                              <p style={{ color: "rgba(1, 241, 227, 1)" }}>
                                {" "}
                                {data.currentPrice}{" "}
                              </p>
                            </CardContent>
                          </Card>
                        </div>
                      </Card>
                    </div>
                  </Card>
                ))}
              </>
            </>
          </CardContent>
        </CardContent>
      </Card>
    </div>
  );
}

export default PortfolioPage;
