"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { menuData } from "./menuData";
import Dropdown from "./Dropdown";
import { useAppSelector } from "@/redux/hooks";
import { useSelector } from "react-redux";
import { selectTotalPrice } from "@/redux/features/cart-slice";
import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const Header = () => {
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [stickyMenu, setStickyMenu] = useState(false);
  const { openCartModal } = useCartModalContext();

  const product = useAppSelector((state) => state.cartReducer.items);
  const totalPrice = useSelector(selectTotalPrice);


const router = useRouter();
const pathname = usePathname();

const handleGoToMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
  e.preventDefault(); 

  if (pathname === "/") {
    document.getElementById("menu")?.scrollIntoView({
      behavior: "smooth",
    });
  } else {
    router.push("/#menu");
  }
};






  const handleOpenCartModal = () => {
    openCartModal();
  };

  // Sticky menu
  const handleStickyMenu = () => {
    if (window.scrollY >= 80) {
      setStickyMenu(true);
    } else {
      setStickyMenu(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyMenu);
    return () => {
      window.removeEventListener("scroll", handleStickyMenu);
    };
  }, []);

  return (
    <div>
      {/* ===== HEADER ===== */}
      <header
        className={`fixed left-0 top-0 w-full z-50 transition-all duration-300 h-[150px] ${
          stickyMenu ? "bg-[#1E1E1E] shadow" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1170px] mx-auto px-4 sm:px-7.5 xl:px-0">
          <div
            className={`flex items-center justify-between py-4 lg:py-6 gap-4`}
          >
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/logo/Logo.png"
                alt="Logo"
                width={109}
                height={36}
              />
            </Link>

            {/* Hamburger + Cart on Mobile */}
            <div className="flex items-center gap-4 xl:hidden">
              {/* Cart (Bag Icon) */}
              <button
                onClick={handleOpenCartModal}
                className="relative flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white hover:text-[var(--gold)] transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6h18M16 10a4 4 0 01-8 0"
                  />
                </svg>
                {product.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-4.5 h-4.5 rounded-full bg-white text-[var(--gold)] text-xs flex items-center justify-center">
                    {product.length}
                  </span>
                )}
              </button>

              {/* Hamburger */}
              <button
                aria-label="Toggler"
                onClick={() => setNavigationOpen(!navigationOpen)}
              >
                <span className="block relative w-6 h-6">
                  <span
                    className={`absolute h-0.5 w-full bg-white top-1.5 left-0 transition-all duration-300 ${
                      navigationOpen ? "rotate-45 top-2.5" : ""
                    }`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-full bg-white top-2.5 left-0 transition-all duration-300 ${
                      navigationOpen ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-full bg-white top-3.5 left-0 transition-all duration-300 ${
                      navigationOpen ? "-rotate-45 top-2.5" : ""
                    }`}
                  ></span>
                </span>
              </button>
            </div>

            {/* Desktop Menu */}
            <nav
              className={`hidden xl:flex items-center gap-6 font-medium`}
              style={{ fontFamily: "Cinzel" }}
            >
              {menuData.map((menuItem, i) =>
                menuItem.submenu ? (
                  <Dropdown key={i} menuItem={menuItem} stickyMenu={stickyMenu} />
                ) : (
                  <Link
                    key={i}
                    href={menuItem.path}
                    className="text-white hover:text-[var(--gold)] transition-colors"
                  >
                    {menuItem.title}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop Cart + Wishlist */}
            <div className="hidden xl:flex items-center gap-4">
              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="flex items-center gap-1 text-white hover:text-[var(--gold)]"
              >
              <svg className="fill-current" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" > <path d="M5.97441 12.6073L6.43872 12.0183L5.97441 12.6073ZM7.99992 3.66709L7.45955 4.18719C7.60094 4.33408 7.79604 4.41709 7.99992 4.41709C8.2038 4.41709 8.3989 4.33408 8.54028 4.18719L7.99992 3.66709ZM10.0254 12.6073L10.4897 13.1962L10.0254 12.6073ZM6.43872 12.0183C5.41345 11.21 4.33627 10.4524 3.47904 9.48717C2.64752 8.55085 2.08325 7.47831 2.08325 6.0914H0.583252C0.583252 7.94644 1.3588 9.35867 2.35747 10.4832C3.33043 11.5788 4.57383 12.4582 5.51009 13.1962L6.43872 12.0183ZM2.08325 6.0914C2.08325 4.75102 2.84027 3.63995 3.85342 3.17683C4.81929 2.73533 6.15155 2.82823 7.45955 4.18719L8.54028 3.14699C6.84839 1.38917 4.84732 1.07324 3.22983 1.8126C1.65962 2.53035 0.583252 4.18982 0.583252 6.0914H2.08325ZM5.51009 13.1962C5.84928 13.4636 6.22932 13.7618 6.61834 13.9891C7.00711 14.2163 7.47619 14.4167 7.99992 14.4167V12.9167C7.85698 12.9167 7.65939 12.8601 7.37512 12.694C7.0911 12.5281 6.79171 12.2965 6.43872 12.0183L5.51009 13.1962ZM10.4897 13.1962C11.426 12.4582 12.6694 11.5788 13.6424 10.4832C14.641 9.35867 15.4166 7.94644 15.4166 6.0914H13.9166C13.9166 7.47831 13.3523 8.55085 12.5208 9.48717C11.6636 10.4524 10.5864 11.21 9.56112 12.0183L10.4897 13.1962ZM15.4166 6.0914C15.4166 4.18982 14.3402 2.53035 12.77 1.8126C11.1525 1.07324 9.15145 1.38917 7.45955 3.14699L8.54028 4.18719C9.84828 2.82823 11.1805 2.73533 12.1464 3.17683C13.1596 3.63995 13.9166 4.75102 13.9166 6.0914H15.4166ZM9.56112 12.0183C9.20813 12.2965 8.90874 12.5281 8.62471 12.694C8.34044 12.8601 8.14285 12.9167 7.99992 12.9167V14.4167C8.52365 14.4167 8.99273 14.2163 9.3815 13.9891C9.77052 13.7618 10.1506 13.4636 10.4897 13.1962L9.56112 12.0183Z" fill="#d8b572" /> </svg>
                Wishlist
              </Link>

              {/* Cart */}
              <button
                onClick={handleOpenCartModal}
                className="relative flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white hover:text-[var(--gold)] transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 6h18M16 10a4 4 0 01-8 0"
                  />
                </svg>
                {product.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-4.5 h-4.5 rounded-full bg-white text-[#000] text-xs flex items-center justify-center">
                    {product.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {navigationOpen && (
            <div className="xl:hidden bg-[#1E1E1E] w-full py-4 flex flex-col gap-4">
              {menuData.map((menuItem, i) =>
                menuItem.submenu ? (
                  <Dropdown key={i} menuItem={menuItem} stickyMenu={stickyMenu} />
                ) : (
                  <Link
                    key={i}
                    href={menuItem.path}
                    className="text-white hover:text-[var(--gold)] block px-4 py-2"
                  >
                    {menuItem.title}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section
        className="relative h-[72vh] w-full text-white flex items-center justify-center px-6"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url('/images/bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="text-center">
          <p
            className="text-[18px] sm:text-[20px] md:text-[22px] mb-3"
            style={{ fontFamily: "Grand Hotel" }}
          >
            Finest Sweets In Town
          </p>

          <h1
            className="cinzel text-[32px] sm:text-[40px] md:text-[50px] lg:text-[54px] text-[var(--gold)] font-bold leading-tight mb-4"
            style={{ fontFamily: "Cinzel" }}
          >
            TASTE THE RICH FLAVOR OF <br /> PREMIUM CHOCOLATES, NUTS & DATES
          </h1>

          <p className="max-w-[600px] mx-auto text-gray-300 text-xs sm:text-sm md:text-base">
            We only use the five star quality for our menu, come and get the
            richness in every sweets we serve.
          </p>

          <a
            href="#menu"
             onClick={handleGoToMenu}
            className="inline-flex items-center mt-6 sm:mt-8 gap-3 px-6 sm:px-8 py-2 sm:py-3 bg-[#F5BE32] text-[#000] transition-all duration-300 z-10 relative text-sm sm:text-base"
            style={{ fontFamily: "Cinzel", borderRadius: "2px" }}
          >
            GO TO MENU
            <span className="line block h-[2px] w-6 sm:w-8 bg-[#000] transition-all"></span>
          </a>
        </div>

        {/* Shadow overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ boxShadow: "inset 0 0 200px 120px rgba(0,0,0,0.55)" }}
        ></div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-[-10px] left-0 w-full h-[200px] z-0"
          style={{
            background: "linear-gradient(to bottom, rgba(30,30,30,0) 0%, #1E1E1E 100%)",
          }}
        ></div>
      </section>
    </div>
  );
};

export default Header;
