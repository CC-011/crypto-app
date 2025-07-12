import { useRouter } from "next/navigation";
import React from "react";
import { Card } from "@/components/ui/card";
import { usePathname } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";

function Buttons() {
  const pathName = usePathname();
  const router = useRouter();
  const Navigator = (path: string) => {
    return router.push(path);
  };
  return (
    <Card className="hide">
      <div className="flex align bg-intervalContainer nav-container">
        <Toggle
          onClick={() => Navigator("/")}
          className={`flex align center nav-buttons ${
            pathName === "/" ? "bg-intervalButton" : "bg-intervalContainer"
          }`}
        >
          <p>Coins</p>
        </Toggle>
        <Toggle
          onClick={() => Navigator("/coin-converter")}
          className={`flex align center nav-buttons ${
            pathName === "/coin-converter"
              ? "bg-intervalButton"
              : "bg-intervalContainer"
          }`}
        >
          <p>Convertor</p>
        </Toggle>
      </div>
    </Card>
  );
}

export default Buttons;
