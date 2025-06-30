import Link from "next/link";
import { Moon, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";
import { toggleBoolean } from "./hide-chart";
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
import { useTheme } from "next-themes";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export function Theme() {
  const { tableChart } = useSelector((state: RootState) => state.table);
  const boolean = useSelector((state: RootState) => state.boolean);
  const dispatch = useAppDispatch();
  const [filterByName, setFilterByName] = useState("");
  const [chartCurrencyEPage, setChartCurrencyEPage] = useState("usd");
  const [showMobileSearchInput, setShowSearchInput] = useState(false);
  const { theme, setTheme } = useTheme();
  const chartNameEPage = "bitcoin";
  const defaultMarket = "market_cap_desc";
  const usd = "$";
  const euro = "€";
  const gbp = "£";
  const bitcoin = "₿";
  const ethereum = "Ξ";
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

  const handleTheme = (theme: string) => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  const HomeSvg = () => {
    return (
      <svg
        fill="hsl(var(--homeIcon))"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
      </svg>
    );
  };

  const PortfolioSvg = () => {
    return (
      <svg
        fill="hsl(var(--homeIcon))"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
      </svg>
    );
  };

  const MagnifierSvg = () => {
    return (
      <svg
        className="absolute left-3 svg-left-magnifier-navbar top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <path
          fill="hsl(var(--magnifier-icon))"
          d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
        />
      </svg>
    );
  };

  return (
    <Card className="user-navbar-container user-navbar-padding">
      <Card className="user-navbar-gap">
        <Avatar>
          <AvatarImage src="https://i.ibb.co/f4HZnZF/Logoipsm.png" />
          <AvatarFallback>Crypto App Image</AvatarFallback>
        </Avatar>
        <p className="hide">Crypto App</p>
      </Card>
      <Card className="hide home-portfolio-gap flex">
        <div className="home-portfolio-icon">
          <HomeSvg />
        </div>
        <Link href="/">Home</Link>
      </Card>
      <Card className="hide home-portfolio-gap flex">
        <div className="home-portfolio-icon">
          <PortfolioSvg />
        </div>
        <Link href="/portfolio">Portfolio</Link>
      </Card>
      <Card className="user-input-gap">
        <Card>
          <Card>
            <div
              onClick={() => {
                setShowSearchInput(!showMobileSearchInput),
                  dispatch(toggleBoolean());
              }}
              className="relative w-full max-w-md"
            >
              <div className="flex align-items center">
                <MagnifierSvg />
              </div>
              <Input
                className="pl-9 searchButtonLandingPage placeholder:text-inputPlaceholder bg-searchBar pointer"
                type="search"
                placeholder="Search..."
                onChange={(e) => setFilterByName(e.currentTarget.value)}
              />
            </div>
            <div className="user-filtered-list bg-coinList">
              {filterByName ? (
                filtered?.map((data) => (
                  <Link
                    className="pointer"
                    key={data.id}
                    href={`/coin/${data.name.toLocaleLowerCase()}`}
                  >
                    {data.name}
                  </Link>
                ))
              ) : (
                <></>
              )}
            </div>
          </Card>
        </Card>
        <Select
          onValueChange={(value) => setChartCurrencyEPage(value.toLowerCase())}
        >
          <SelectTrigger
            style={{ color: "hsl(var(--currency-color))" }}
            className="w-[180px] max-[600px]:w-[70px] bg-currencyContainer selectCurrencyLandingPage flex space-between"
          >
            <div className="currency-icon bg-currencyIconContainer text-currencyIcon hide">
              {usd}
            </div>
            <SelectValue
              placeholder={`
                 ${chartCurrencyEPage.toLocaleUpperCase()}`}
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="usd">{usd} USD</SelectItem>
            <SelectItem value="gbp">{gbp} GBP</SelectItem>
            <SelectItem value="eur">{euro} EUR</SelectItem>
            <SelectItem value="btc">{bitcoin} BTC</SelectItem>
            <SelectItem value="eth">{ethereum} ETH</SelectItem>
          </SelectContent>
        </Select>
        <Card
          onClick={() => handleTheme(theme ?? "dark")}
          className="theme-icon-container pointer bg-themeContainer"
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] text-white rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100" />
          ) : (
            <Moon className="text-[#424286] h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-100" />
          )}
        </Card>
      </Card>
      {/*
      <Card
        className={`SearchCon ${checkHide ? "hide" : "show"} container-mobile-menu hide-input-field-mobile`}
      >
        {showMobileSearchInput ? (
          <Command className="bg-coinList">
            <CommandInput
              className="searchButtonMobile"
              placeholder="Search..."
              onValueChange={setFilterByName}
            />
            <CommandList>
              <CommandSeparator />
              <CommandGroup>
                {filterByName ? (
                  filtered?.map((data) => (
                    <div key={data.id} className="flex align gap-image">
                      <img
                        className="image-size-mobile"
                        src={data.image}
                        alt="coin image"
                      />
                      <Link
                        onClick={() =>
                          setShowSearchInput(!showMobileSearchInput)
                        }
                        href={`/coin/${data.name.toLocaleLowerCase()}`}
                      >
                        <CommandItem className="pointer">
                          {data.name}
                        </CommandItem>
                      </Link>
                    </div>
                  ))
                ) : (
                  <>
                    <CommandItem disabled>
                      <h3 className="text-align font-size-coin-search">
                        No results found, type in search bar to find coins
                      </h3>
                    </CommandItem>
                  </>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        ) : (
          <div></div>
        )}
      </Card>*/}
      {showMobileSearchInput && (
        <Card
          className={`SearchCon ${boolean ? "show" : "hide"} container-mobile-menu hide-input-field-mobile`}
        >
          <Command className="bg-coinList">
            <CommandInput
              className="searchButtonMobile"
              placeholder="Search..."
              onValueChange={setFilterByName}
            />
            <CommandList>
              <CommandSeparator />
              <CommandGroup>
                {filterByName ? (
                  filtered?.map((data) => (
                    <div key={data.id} className="flex align gap-image">
                      <img
                        className="image-size-mobile"
                        src={data.image}
                        alt="coin image"
                      />
                      <Link
                        onClick={() => {
                          setShowSearchInput(!showMobileSearchInput);
                          dispatch(toggleBoolean());
                          setFilterByName("");
                        }}
                        href={`/coin/${data.name.toLocaleLowerCase()}`}
                      >
                        <CommandItem className="pointer">
                          {data.name}
                        </CommandItem>
                      </Link>
                    </div>
                  ))
                ) : (
                  <CommandItem disabled>
                    <h3 className="text-align font-size-coin-search">
                      No results found, type in search bar to find coins
                    </h3>
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </Card>
      )}
    </Card>
  );
}
