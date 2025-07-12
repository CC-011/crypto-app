"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { fetchIndividualCoinInfo } from "@/app/coins/coin";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
const CoinInfo = dynamic(
  () => import("@/app/coin-description/info-component"),
  {
    ssr: false,
    loading: () => <div>Loading coin page...</div>,
  }
);
export default function City() {
  const { coinName } = useParams<{ coinName: string }>();
  const { data } = useQuery({
    queryKey: ["chartData", coinName],
    queryFn: () => fetchIndividualCoinInfo(coinName),
  });
  const router = useRouter();
  useEffect(() => {
    if (data?.error) {
      return router.push("/not-found");
    }
  }, [router, data?.error]);

  return (
    <Suspense fallback={<div>loading...</div>}>
      {data ? <CoinInfo coinDescription={data} /> : <></>}
    </Suspense>
  );
}
