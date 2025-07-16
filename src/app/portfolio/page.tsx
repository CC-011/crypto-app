"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
const Portfolio = dynamic(
  () => import("../portfolio-component/portfolio-page"),
  {
    ssr: false,
    loading: () => <div>...loading</div>,
  }
);

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Portfolio />
    </Suspense>
  );
}
