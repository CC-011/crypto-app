import React from "react";
import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";
import Link from "next/link";

function Buttons() {
  const pathName = usePathname();
  return (
    <Card className="hide">
      <div className="flex align bg-intervalContainer nav-container">
        <Link href="/">
          <Toggle
            className={`flex align center nav-buttons ${
              pathName === "/" ? "bg-intervalButton" : "bg-intervalContainer"
            }`}
          >
            <p>Coins</p>
          </Toggle>
        </Link>
        <Link href="/coin-converter">
          <Toggle
            className={`flex align center nav-buttons ${
              pathName === "/coin-converter"
                ? "bg-intervalButton"
                : "bg-intervalContainer"
            }`}
          >
            <p>Convertor</p>
          </Toggle>
        </Link>
      </div>
    </Card>
  );
}

export default Buttons;
