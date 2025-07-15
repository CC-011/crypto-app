"use client";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import Buttons from "./navbarComponent/navigation-buttons";
const Charts = React.lazy(() => import("./landing-components/chart"));
const CarouselLandingPage = dynamic(
  () => import("./landing-components/carousel"),
  { ssr: false, loading: () => <div>Loading carousel...</div> }
);
const TableLandingPage = dynamic(() => import("./landing-components/table"), {
  ssr: false,
  loading: () => <div>loading...</div>,
});
const MobileChart = dynamic(() => import("./landing-components/mobile-charts"));

function List() {
  return (
    <div className="coinLandingPageContainer overflow-hidden">
      <div className="hide pt-[40px] pl-[40px]">
        <Buttons />{" "}
      </div>
      <Suspense fallback={<div>loading...</div>}>
        <CarouselLandingPage />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <Charts />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <MobileChart />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <TableLandingPage />
      </Suspense>
    </div>
  );
}

export default List;
