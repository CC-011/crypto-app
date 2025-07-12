"use client";
import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const Convertor = dynamic(() => import("../converter-component/convertor"), {
  ssr: false,
  loading: () => <div>...loading</div>,
});
export default function Converter() {
  return (
    <Suspense fallback={<div>loading..</div>}>
      <Convertor />;
    </Suspense>
  );
}
