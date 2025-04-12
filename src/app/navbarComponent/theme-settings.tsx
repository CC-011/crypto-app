import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { useState, useEffect } from "react";
import { fetchChartData } from "../landingPageChart/landingPageChart";
import { fetchTableChart } from "../tableChart/table";
import { useAppDispatch } from "../lib/hooks";
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
import {
  Profile,
  NavbarContainer,
  NavBarRight,
  NavBarLeft,
  Img,
} from "../styledComponents/styles";
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

  //useEffect for tableChart
  useEffect(() => {
    dispatch(fetchTableChart({ defaultMarket, chartCurrencyEPage }));
  }, [dispatch, defaultMarket, chartCurrencyEPage]);

  interface Drop {
    filterByName: string;
  }

  const MyDropdown = ({ filterByName }: Drop) => {
    const [open, setOpen] = useState(false);

    // Open dropdown when filterByName changes

    useEffect(() => {
      if (filterByName) {
        setOpen(true);
      }
    }, [filterByName]);

    return (
      <DropdownMenu open={open} onOpenChange={setOpen}>
        {filterByName ? (
          <>
            {" "}
            <DropdownMenuTrigger></DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
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
    );
  };

  return (
    <NavbarContainer>
      <NavBarRight>
        <Img src="https://i.ibb.co/f4HZnZF/Logoipsm.png"></Img>
        Logoisum
      </NavBarRight>
      <Link href="/">Home</Link>
      <Link href="/portfolio">Portfolio</Link>
      <NavBarLeft>
        <div>
          <div>
            <Input
              className="searchButtonLandingPage"
              type="search"
              placeholder="search"
              onChange={(e) => setFilterByName(e.currentTarget.value)}
            />
          </div>
          <div>
            {" "}
            <MyDropdown filterByName={filterByName} />{" "}
          </div>
        </div>
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
        <Profile style={{ display: "flex", alignItems: "center" }}>
          {theme === "dark" ? (
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          ) : (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          )}
        </Profile>
      </NavBarLeft>
    </NavbarContainer>
  );
}
