import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { useState, useEffect } from "react";
import { fetchChartData } from "../landingPageChart/landingPageChart";
import { fetchTableChart } from "../tableChart/table";
import { useAppDispatch } from "../lib/hooks";
import { setLocalStorage, getLocalStorage } from "../localStorage/localStorage";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";

export function Theme() {
  const { tableChart } = useSelector((state: RootState) => state.table);
  const dispatch = useAppDispatch();
  const [filterByName, setFilterByName] = useState("");
  const [chartCurrencyEPage, setChartCurrencyEPage] = useState("usd");
  const { theme, setTheme } = useTheme();
  const chartNameEPage = "bitcoin";
  const defaultMarket = "market_cap_desc";
  const filtered = tableChart?.filter((data) =>
    data.name.toLocaleLowerCase().startsWith(filterByName)
  );
  useEffect(() => {
    dispatch(fetchChartData({ chartNameEPage, chartCurrencyEPage }));
  }, [dispatch, chartNameEPage, chartCurrencyEPage]);

  useEffect(() => {
    dispatch(fetchTableChart({ defaultMarket, chartCurrencyEPage }));
  }, [dispatch, defaultMarket, chartCurrencyEPage]);

  useEffect(() => {
    const previousTheme = getLocalStorage("theme");
    setTheme(previousTheme ?? "dark");
  });

  useEffect(() => {
    setLocalStorage("theme", theme);
  }, [theme]);

  useEffect(() => {
    setLocalStorage("currency", chartCurrencyEPage);
  }, [chartCurrencyEPage]);

  useEffect(() => {
    const previousCurrency = getLocalStorage("currency");
    setChartCurrencyEPage(previousCurrency ?? "usd");
  }, []);

  interface Drop {
    filterByName: string;
  }

  const MyDropdown = ({ filterByName }: Drop) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
      if (filterByName) {
        setOpen(true);
      }
    }, [filterByName]);

    return (
      <Card>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          {filterByName ? (
            <>
              {" "}
              <DropdownMenuTrigger></DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="dropdown-menu">
                  {filterByName ? (
                    filtered?.map((data) => (
                      <Link
                        key={data.id}
                        href={`/coin/${data.name.toLocaleLowerCase()}`}
                      >
                        {data.name}
                      </Link>
                    ))
                  ) : (
                    <></>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </>
          ) : (
            <></>
          )}
        </DropdownMenu>
      </Card>
    );
  };

  return (
    <Card className="user-navbar-container">
      <Card className="user-navbar-gap">
        <Avatar>
          <AvatarImage src="https://i.ibb.co/f4HZnZF/Logoipsm.png" />
          <AvatarFallback>Crypto App Image</AvatarFallback>
        </Avatar>
        Crypto App
      </Card>
      <Link href="/">Home</Link>
      <Link href="/portfolio">Portfolio</Link>
      <Card className="user-input-gap">
        <Card>
          <Card>
            <Input
              className="searchButtonLandingPage"
              type="search"
              placeholder="search"
              onChange={(e) => setFilterByName(e.currentTarget.value)}
            />
          </Card>
          <Card className="user-filtered-list">
            {" "}
            <MyDropdown filterByName={filterByName} />{" "}
          </Card>
        </Card>
        <Select
          onValueChange={(value) => setChartCurrencyEPage(value.toLowerCase())}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">USD</SelectItem>
            <SelectItem value="gbp">GBP</SelectItem>
            <SelectItem value="eur">EUR</SelectItem>
            <SelectItem value="btc">BTC</SelectItem>
            <SelectItem value="eth">ETH</SelectItem>
          </SelectContent>
        </Select>
        <DropdownMenu>
          <DropdownMenuTrigger>Select theme</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light mode
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark mode
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Card className="theme-icon-container">
          {theme === "dark" ? (
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          )}
        </Card>
      </Card>
    </Card>
  );
}
