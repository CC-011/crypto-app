"use client";
import { useAppDispatch } from "@/app/lib/hooks";
import { useEffect } from "react";
import { fetchIndividualCoinInfo } from "@/app/coins/coin";
import { useSelector } from "react-redux";
import { RootState } from "@/app/lib/store";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  ShowCoinPricesInUsDollars,
  ShowCoinPricesInBTC,
} from "../../Utils/formatNumbers";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function City() {
  const dispatch = useAppDispatch();
  const { coinName } = useParams<{ coinName: string }>();
  const { coinDescription } = useSelector((state: RootState) => state.coin);

  useEffect(() => {
    dispatch(fetchIndividualCoinInfo(coinName));
  }, [dispatch, coinName]);
  const router = useRouter();
  useEffect(() => {
    if (coinDescription?.error) {
      return router.push("/not-found");
    }
  }, [router, coinDescription?.error]);

  function copyToClipBoard(str: string) {
    navigator.clipboard.writeText(str);
    alert("Copied the text: " + str);
  }
  const volume: number = coinDescription?.market_data?.total_volume?.usd ?? 0;

  return (
    <Card>
      <Card className="coin-page">
        <Card>
          <Card className="bg-primarycard coin-image-name-container">
            <CardContent className="coin-image-margin">
              <div className="coin-image-container bg-coinPageImageBackground">
                <Avatar>
                  <AvatarImage
                    src={coinDescription?.image?.large ?? "No Image Found"}
                  />
                  <AvatarFallback>Coin Image</AvatarFallback>
                </Avatar>
              </div>
              <Card className="coin-name">
                {" "}
                <Card>{coinDescription?.name ?? "No Name Found"}</Card>
                <Card>
                  (
                  {coinDescription?.symbol.toLocaleUpperCase() ??
                    "No Symbol Found"}
                  )
                </Card>
              </Card>
            </CardContent>
          </Card>
          <Card className="bg-primarycard coin-links-container hide">
            <CardContent
              className="pointer"
              onClick={(event) => {
                event.preventDefault(),
                  window.open(coinDescription?.links?.homepage ?? "");
              }}
            >
              <svg
                className="fill-copybutton"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
              </svg>
            </CardContent>
            <CardContent>
              {coinDescription?.links?.homepage ?? "No data found"}
            </CardContent>
            <CardContent
              onClick={() =>
                copyToClipBoard(coinDescription?.links?.homepage ?? "")
              }
            >
              <svg
                className="fill-copybutton"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
              </svg>
            </CardContent>
          </Card>
        </Card>
        <Card className="bg-primarycard coin-profit">
          <CardContent className="coin-price">
            <ShowCoinPricesInUsDollars
              cryptoPricesInUsDollars={
                coinDescription?.market_data?.current_price?.usd ?? 0
              }
            />
          </CardContent>
          <CardContent>Profit: </CardContent>
          <Card className="coin-price-info">
            <Card className="flex">
              <CardContent className="gapPlusButton">
                <div className="flex">
                  {(coinDescription?.market_data?.high_24h?.usd ?? 0 >= 0) ? (
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
                  <p>All time high:</p>
                </div>
                <div className="coin-font-weight">
                  <ShowCoinPricesInUsDollars
                    cryptoPricesInUsDollars={
                      coinDescription?.market_data?.high_24h?.usd ?? 0
                    }
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="coin-price-date">
                {new Date(
                  coinDescription?.last_updated ?? "No date found"
                ).toString()}
              </CardContent>
            </Card>
          </Card>
          <Card>
            <Card className="flex">
              <CardContent className="gapPlusButton">
                <div className="flex">
                  {(coinDescription?.market_data?.low_24h?.usd ?? 0 >= 0) ? (
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
                  <p>All time low:</p>
                </div>
                <div className="coin-font-weight">
                  <ShowCoinPricesInUsDollars
                    cryptoPricesInUsDollars={
                      coinDescription?.market_data?.low_24h?.usd ?? 0
                    }
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="coin-price-date">
                {new Date(
                  coinDescription?.last_updated ?? "No date found"
                ).toString()}
              </CardContent>
            </Card>
          </Card>
        </Card>
        <Card className="bg-primarycard coin-market-info-container">
          <Card className="flex">
            <CardContent className="gapPlusButton">
              <div className="plusButton">
                <svg
                  className="fill-copybutton"
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
              </div>
              Market Cap
            </CardContent>
            <CardContent className="gapPlusButton coin-market-data">
              <ShowCoinPricesInUsDollars
                cryptoPricesInUsDollars={
                  coinDescription?.market_data?.market_cap?.usd ?? 0
                }
              />
            </CardContent>
          </Card>
          <Card>
            <Card className="flex">
              <CardContent className="gapPlusButton">
                <div className="plusButton">
                  <svg
                    className="fill-copybutton"
                    width={15}
                    height={15}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  </svg>
                </div>
                Fully Diluted Valuation
              </CardContent>
              <CardContent className="coin-market-data">
                <ShowCoinPricesInUsDollars
                  cryptoPricesInUsDollars={
                    coinDescription?.market_data?.fully_diluted_valuation
                      ?.usd ?? 0
                  }
                />
              </CardContent>
            </Card>
            <Card className="flex">
              <CardContent className="gapPlusButton">
                <div className="plusButton">
                  <svg
                    className="fill-copybutton"
                    width={15}
                    height={15}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                  </svg>
                </div>
                Volume 24h
              </CardContent>
              <CardContent className="coin-market-data">
                <ShowCoinPricesInUsDollars
                  cryptoPricesInUsDollars={
                    coinDescription?.market_data?.market_cap_change_24h ?? 0
                  }
                />
              </CardContent>
            </Card>
          </Card>
          <Card className="flex">
            <CardContent className="gapPlusButton">
              <div className="plusButton">
                <svg
                  className="fill-copybutton"
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
              </div>
              Volume/Market
            </CardContent>
            <CardContent className="coin-market-data">
              {coinDescription?.market_data?.market_cap?.usd ?? 0 / volume ?? 1}
            </CardContent>
          </Card>
          <Card className="flex">
            <CardContent className="gapPlusButton">
              <div className="plusButton">
                <svg
                  className="fill-copybutton"
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
              </div>
              Total Volume
            </CardContent>
            <CardContent className="coin-market-data">
              <ShowCoinPricesInBTC
                cryptoSymbol={
                  coinDescription?.symbol
                    ? coinDescription.symbol.length < 4
                      ? coinDescription.symbol
                      : "USD"
                    : "USD"
                }
                cryptoPricesInUsBitcoin={
                  coinDescription?.market_data?.total_volume?.usd ?? 0
                }
              />
            </CardContent>
          </Card>
          <Card className="flex">
            <CardContent className="gapPlusButton">
              <div className="plusButton">
                <svg
                  className="fill-copybutton"
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
              </div>
              Circulating Supply
            </CardContent>
            <CardContent className="coin-market-data">
              <ShowCoinPricesInBTC
                cryptoSymbol={
                  coinDescription?.symbol
                    ? coinDescription.symbol.length < 4
                      ? coinDescription.symbol
                      : "USD"
                    : "USD"
                }
                cryptoPricesInUsBitcoin={
                  coinDescription?.market_data?.circulating_supply ?? 0
                }
              />
            </CardContent>
          </Card>
          <Card className="flex">
            <CardContent className="gapPlusButton">
              <div className="plusButton">
                <svg
                  className="fill-copybutton"
                  width={15}
                  height={15}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
              </div>
              Max Supply
            </CardContent>
            <CardContent className="coin-market-data">
              <ShowCoinPricesInBTC
                cryptoSymbol={
                  coinDescription?.symbol
                    ? coinDescription.symbol.length < 4
                      ? coinDescription.symbol
                      : "USD"
                    : "USD"
                }
                cryptoPricesInUsBitcoin={
                  coinDescription?.market_data?.max_supply ?? 0
                }
              />
            </CardContent>
          </Card>
        </Card>
      </Card>
      <Card className="coin-description">
        <Card className="hide">
          <CardHeader>
            <h1 className="text-3xl font-semibold">Description</h1>
          </CardHeader>
          <CardContent>
            {coinDescription?.description?.en ?? "No description found"}
          </CardContent>
        </Card>
        <Card className="padding-top">
          <Card className="bg-primarycard coin-links-container gap-for-coin-links-container">
            <CardContent
              className="pointer"
              onClick={(event) => {
                event.preventDefault(),
                  window.open(coinDescription?.links?.homepage ?? "");
              }}
            >
              <svg
                className="fill-copybutton"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
              </svg>
            </CardContent>
            <CardContent>
              {coinDescription?.links?.homepage ?? "No data found"}
            </CardContent>
            <CardContent
              onClick={() =>
                copyToClipBoard(coinDescription?.links?.homepage ?? "")
              }
            >
              <svg
                className="fill-copybutton"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
              </svg>
            </CardContent>
          </Card>
          <Card className="bg-primarycard coin-links-container">
            <CardContent
              className="pointer"
              onClick={(event) => {
                event.preventDefault(),
                  window.open(coinDescription?.links?.whitepaper ?? "");
              }}
            >
              <svg
                className="fill-copybutton"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
              </svg>
            </CardContent>
            <CardContent>
              {" "}
              {coinDescription?.links.whitepaper ?? "No data found"}{" "}
            </CardContent>
            <CardContent
              onClick={() =>
                copyToClipBoard(coinDescription?.links.whitepaper ?? "")
              }
            >
              <svg
                className="fill-copybutton"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
              </svg>
            </CardContent>
          </Card>
          <Card className="bg-primarycard coin-links-container-last">
            <CardContent
              className="pointer"
              onClick={(event) => {
                event.preventDefault(),
                  window.open(coinDescription?.links.whitepaper ?? "");
              }}
            >
              <svg
                className="fill-copybutton"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
              </svg>
            </CardContent>
            <CardContent>
              {coinDescription?.links?.blockchain_site[2] ?? "No data found"}
            </CardContent>
            <CardContent
              onClick={() =>
                copyToClipBoard(
                  coinDescription?.links?.blockchain_site[2] ?? ""
                )
              }
            >
              <svg
                className="fill-copybutton"
                width={20}
                height={20}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l140.1 0L400 115.9 400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-204.1c0-12.7-5.1-24.9-14.1-33.9L366.1 14.1c-9-9-21.2-14.1-33.9-14.1L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-32-48 0 0 32c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l32 0 0-48-32 0z" />
              </svg>
            </CardContent>
          </Card>
        </Card>
      </Card>
    </Card>
  );
}
