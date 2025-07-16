import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { ShowCoinData } from "../Utils/formatNumbers";
import { compareMode } from "./activate-secondchart";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { setCoinNameSecond } from "./second-coin";
import { useAppDispatch } from "../lib/hooks";
import { setString } from "./coin-name";
import { setSymbol } from "./coin-symbol";
import { fetchTableChart } from "../tableChart/table";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
export default function CarouselLandingPage() {
  const dispatch = useAppDispatch();
  const boolean = useSelector((state: RootState) => state.secondChart);
  const [compareCoinMode, setCompareCoinMode] = useState(false);

  const defaultMarket = useSelector((state: RootState) => state.order);
  const rows = 50;
  const chartCurrencyEPage = useSelector(
    (state: RootState) => state.converterCurrency
  );

  const { data = [] } = useQuery({
    queryKey: ["tableData", defaultMarket, chartCurrencyEPage, rows],
    queryFn: () => fetchTableChart({ defaultMarket, chartCurrencyEPage, rows }),
    placeholderData: [],
  });

  const CarouselWithMemo = React.memo(() => {
    return (
      <div className="mainChartsAndCarousel">
        <Carousel className="carousel">
          <div className="space-between compare-button-container gap">
            <p className="text-coinTitleColor select-currency-padding">
              Select the currency to view statics
            </p>
            <button
              onClick={() => {
                setCompareCoinMode(!compareCoinMode);
                dispatch(compareMode());
              }}
            >
              <div
                className={`flex compare-button bg-compareMode pointer ${compareCoinMode ? "exit-compare" : ""}`}
              >
                <div>
                  {boolean ? (
                    <svg
                      className="home-portfolio-icon"
                      fill="hsl(var(--homeIcon))"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                  ) : (
                    <svg
                      className="home-portfolio-icon"
                      fill="hsl(var(--homeIcon))"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M320 488c0 9.5-5.6 18.1-14.2 21.9s-18.8 2.3-25.8-4.1l-80-72c-5.1-4.6-7.9-11-7.9-17.8s2.9-13.3 7.9-17.8l80-72c7-6.3 17.2-7.9 25.8-4.1s14.2 12.4 14.2 21.9l0 40 16 0c35.3 0 64-28.7 64-64l0-166.7C371.7 141 352 112.8 352 80c0-44.2 35.8-80 80-80s80 35.8 80 80c0 32.8-19.7 61-48 73.3L464 320c0 70.7-57.3 128-128 128l-16 0 0 40zM456 80a24 24 0 1 0 -48 0 24 24 0 1 0 48 0zM192 24c0-9.5 5.6-18.1 14.2-21.9s18.8-2.3 25.8 4.1l80 72c5.1 4.6 7.9 11 7.9 17.8s-2.9 13.3-7.9 17.8l-80 72c-7 6.3-17.2 7.9-25.8 4.1s-14.2-12.4-14.2-21.9l0-40-16 0c-35.3 0-64 28.7-64 64l0 166.7c28.3 12.3 48 40.5 48 73.3c0 44.2-35.8 80-80 80s-80-35.8-80-80c0-32.8 19.7-61 48-73.3L48 192c0-70.7 57.3-128 128-128l16 0 0-40zM56 432a24 24 0 1 0 48 0 24 24 0 1 0 -48 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <div>{boolean ? "Exit comparison" : "Compare"}</div>
                </div>
              </div>
            </button>
          </div>
          <CarouselContent>
            {data.length > 0 ? (
              <>
                {" "}
                {data?.map((data) => (
                  <CarouselItem key={data.id}>
                    <div className="bg-carouselBackground carousel-item mobile-width-height">
                      <Card className="flex">
                        <div className="carousel-image">
                          <Image
                            width={35}
                            height={35}
                            src={data.image}
                            alt="coin image"
                          />
                        </div>
                        <div className="carousel-title-container">
                          <div className="carousel-title-coin">
                            <span
                              className="hide pointer"
                              onClick={(e) => {
                                if (boolean === false) {
                                  dispatch(
                                    setString(e.currentTarget.innerText)
                                  );
                                  dispatch(setSymbol(data.symbol));
                                } else if (boolean === true) {
                                  dispatch(
                                    setCoinNameSecond(
                                      e.currentTarget.innerText.toLocaleLowerCase()
                                    )
                                  );
                                }
                              }}
                            >
                              {data.name}
                            </span>
                            <span className="hide">
                              ({data.symbol.toLocaleUpperCase()})
                            </span>
                            <span
                              onClick={(e) => {
                                if (boolean === false) {
                                  dispatch(setString(data.name));
                                  dispatch(
                                    setSymbol(data.symbol.toLocaleUpperCase())
                                  );
                                } else if (boolean === true) {
                                  dispatch(
                                    setCoinNameSecond(
                                      e.currentTarget.innerText.toLocaleLowerCase()
                                    )
                                  );
                                }
                              }}
                              className="hide-input-field-mobile pointer"
                            >
                              {data.symbol.toLocaleUpperCase()}
                            </span>
                          </div>
                          <span className="carousel-price-color flex hide">
                            <ShowCoinData
                              cryptoData={data?.current_price}
                              currencySymbol={chartCurrencyEPage.toLocaleUpperCase()}
                            />
                            <div
                              className="coin-1h-percentage-container carousel-text hide"
                              style={{
                                color:
                                  data.price_change_percentage_1h_in_currency >=
                                  0
                                    ? "#01F1E3"
                                    : "#FE1040",
                              }}
                            >
                              {data.price_change_percentage_1h_in_currency >=
                              0 ? (
                                <svg
                                  width={5}
                                  height={5}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="#01F1E3"
                                  viewBox="0 0 24 24"
                                  strokeWidth={0}
                                  stroke="currentColor"
                                  className="size-6 carousel-svg"
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
                                  width={5}
                                  height={5}
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="#FE1040"
                                  viewBox="0 0 24 24"
                                  strokeWidth={0}
                                  stroke="currentColor"
                                  className="size-6 carousel-svg"
                                >
                                  {" "}
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                  />{" "}
                                </svg>
                              )}
                              {Math.abs(
                                data.price_change_percentage_1h_in_currency
                              ).toFixed(2)}
                              %
                            </div>
                          </span>
                        </div>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}{" "}
              </>
            ) : (
              <>
                {" "}
                <div className="bg-carouselBackground rounded-xl  h-[40px]  w-[100%]">
                  <Skeleton className="h-[100%] w-[100%] bg-skeleton animate-pulse rounded-xl" />
                </div>
              </>
            )}
          </CarouselContent>
        </Carousel>
      </div>
    );
  });
  CarouselWithMemo.displayName = "CarouselWithMemo";
  return (
    <>
      <CarouselWithMemo />
    </>
  );
}
