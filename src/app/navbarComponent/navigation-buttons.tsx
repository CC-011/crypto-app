import Link from "next/link";
import React from "react";
import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";

function Buttons() {
  const pathName = usePathname();
  return (
    <Card className="hide">
      <div className="flex align bg-intervalContainer nav-container">
        <Toggle
          className={`flex align center nav-buttons ${
            pathName === "/" ? "bg-intervalButton" : "bg-intervalContainer"
          }`}
        >
          <Link href="/">Coins</Link>
        </Toggle>
        <Toggle
          className={`flex align center nav-buttons ${
            pathName === "/coin-converter"
              ? "bg-intervalButton"
              : "bg-intervalContainer"
          }`}
        >
          <Link href="/coin-converter">Convertor</Link>
        </Toggle>
      </div>
    </Card>
  );
}

export default Buttons;
