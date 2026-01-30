"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthButtons from "@/components/auth/AuthButtons";
import { useCart } from "@/components/providers/CartProvider";
import { Menu, X, ShoppingBag, User } from "lucide-react";

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  // 🔑 exact position state
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  const { cartCount } = useCart();

  useEffect(() => {
    const check = () => setMobileView(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const categories = {
    men: [
      { name: "All Men", href: "/category/men" },
      { name: "Jackets", href: "/category/men?category=Jackets" },
      { name: "Suits", href: "/category/men?category=Suits" },
      { name: "T-Shirts", href: "/category/men?category=T-Shirts" },
      { name: "Hoodies", href: "/category/men?category=Hoodies" },
      { name: "Shirts", href: "/category/men?category=Shirts" },
      { name: "Trousers", href: "/category/men?category=Trousers" },
    ],
    women: [
      { name: "All Women", href: "/category/women" },
      { name: "Dresses", href: "/category/women?category=Dresses" },
      { name: "Trousers", href: "/category/women?category=Trousers" },
    ],
    kids: [
      { name: "All Kids", href: "/category/kids" },
      { name: "Jackets", href: "/category/kids?category=Jackets" },
      { name: "Dresses", href: "/category/kids?category=Dresses" },
      { name: "Shirts", href: "/category/kids?category=Shirts" },
      { name: "T-Shirts", href: "/category/kids?category=T-Shirts" },
      { name: "Trousers", href: "/category/kids?category=Trousers" },
      { name: "Twinning", href: "/category/kids?category=Twinning" },
    ],
    newborns: [{ name: "Baby Dresses", href: "/category/newborns" }],
  };

  // ✅ EXACT POSITION HANDLER
  const openDropdown = (
    key: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setDropdownPos({
      top: rect.bottom + 8,                // thora sa neeche
      left: rect.left + rect.width / 2,    // button ke center se
    });

    setActiveDropdown(activeDropdown === key ? null : key);
  };

  return (
    <>
      {mobileView && (
        <div className="bg-white border-b sticky top-0 z-50">
          {/* top bar */}
          <div className="flex items-center justify-between px-3 py-3">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>

            <Link
              href="/"
              className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
            >
              StyleStore
            </Link>

            <div className="flex gap-3 items-center">
              <Link href="/cart" className="relative">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link href="/orders">
                <User size={20} />
              </Link>
            </div>
          </div>

          {/* category row */}
          <div className="border-t px-3 py-2 flex gap-4 overflow-x-auto text-sm">
            {/* HOME */}
<Link href="/" className="whitespace-nowrap font-medium">
  Home
</Link>

{["men", "women", "kids", "newborns"].map((key) => (
              <button
                key={key}
                onClick={(e) => openDropdown(key, e)}
                className="whitespace-nowrap font-medium"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)} ▾
              </button>
            ))}

            <Link href="/sale" className="text-red-600 font-bold">
              Sale
            </Link>
          </div>
        </div>
      )}

      {/* 🔥 DROPDOWN — EXACT BUTTON KE NEECHE */}
      {activeDropdown && (
        <div
          className="fixed z-[9999]"
          style={{
            top: dropdownPos.top,
            left: dropdownPos.left,
            transform: "translateX(-50%)",
          }}
        >
          <div className="mx-40 bg-white rounded-xl shadow-xl border max-h-[70vh] overflow-y-auto">
            {categories[activeDropdown as keyof typeof categories].map(
              (item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setActiveDropdown(null)}
                  className="block px-5 py-4 border-b last:border-0 hover:bg-purple-50"
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        </div>
      )}

      {/* hamburger menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[90px] bg-white z-[9999] p-4">
          <Link href="/category/men" className="block py-3">Men</Link>
          <Link href="/category/women" className="block py-3">Women</Link>
          <Link href="/category/kids" className="block py-3">Kids</Link>
          <Link href="/category/newborns" className="block py-3">Newborns</Link>
          <Link href="/sale" className="block py-3 text-red-600 font-bold">Sale</Link>
          <div className="pt-6">
            <AuthButtons />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
