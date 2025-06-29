import Link from "next/link";
import { usePathname } from "next/navigation";
import { Toggle } from "@/components/ui/toggle";
function NavbarMobile() {
  const pathName = usePathname();
  const PortfolioSvg = () => {
    return (
      <svg
        width={20}
        height={20}
        fill="hsl(var(--homeIcon))"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path d="M264.5 5.2c14.9-6.9 32.1-6.9 47 0l218.6 101c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 149.8C37.4 145.8 32 137.3 32 128s5.4-17.9 13.9-21.8L264.5 5.2zM476.9 209.6l53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 277.8C37.4 273.8 32 265.3 32 256s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0l152-70.2zm-152 198.2l152-70.2 53.2 24.6c8.5 3.9 13.9 12.4 13.9 21.8s-5.4 17.9-13.9 21.8l-218.6 101c-14.9 6.9-32.1 6.9-47 0L45.9 405.8C37.4 401.8 32 393.3 32 384s5.4-17.9 13.9-21.8l53.2-24.6 152 70.2c23.4 10.8 50.4 10.8 73.8 0z" />
      </svg>
    );
  };

  const HomeSvg = () => {
    return (
      <svg
        width={20}
        height={20}
        fill="hsl(var(--homeIcon))"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
      >
        <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
      </svg>
    );
  };
  return (
    <div className="hide-input-field-mobile">
      <div>
        <div className="mobile-nav-container-bottom">
          <Toggle
            className={`mobile-nav-bottom-h-w ${
              pathName === "/" ? "bg-[hsl(var(--mobile-menu))]" : ""
            }`}
          >
            <div className="flex column">
              <div className="flex align center">
                <HomeSvg />
              </div>
              <Link href="/">Overview</Link>
            </div>
          </Toggle>
          <Toggle
            className={`mobile-nav-bottom-h-w ${
              pathName === "/portfolio" ? "bg-[hsl(var(--mobile-menu))]" : ""
            }`}
          >
            <div className="flex column">
              <div className="flex center">
                <PortfolioSvg />
              </div>
              <Link href="/portfolio">Portfolio</Link>
            </div>
          </Toggle>
        </div>
      </div>
    </div>
  );
}

export default NavbarMobile;
