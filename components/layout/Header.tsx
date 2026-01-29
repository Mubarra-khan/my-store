"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthButtons from '@/components/auth/AuthButtons';
import { useCart } from '@/components/providers/CartProvider';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount } = useCart();

  const categories = {
    men: [
      { name: 'All Men', href: '/category/men' },
      { name: 'Jackets', href: '/category/men?category=Jackets' },
      { name: 'Suits', href: '/category/men?category=Suits' },
      { name: 'T-Shirts', href: '/category/men?category=T-Shirts' },
      { name: 'Hoodies', href: '/category/men?category=Hoodies' },
      { name: 'Shirts', href: '/category/men?category=Shirts' },
      { name: 'Trousers', href: '/category/men?category=Trousers' }
    ],
    women: [
      { name: 'All Women', href: '/category/women' },
      { name: 'Dresses', href: '/category/women?category=Dresses' },
      { name: 'Trousers', href: '/category/women?category=Trousers' },
    ],
    kids: [
      { name: 'All Kids', href: '/category/kids' },
      { name: 'Jackets', href: '/category/kids?category=Jackets' },
      { name: 'Dresses', href: '/category/kids?category=Dresses' },
      { name: 'Shirts', href: '/category/kids?category=Shirts' },
      { name: 'T-Shirts', href: '/category/kids?category=T-Shirts' },
      { name: 'Trousers', href: '/category/kids?category=Trousers' },
      { name: 'Twinning', href: '/category/kids?category=Twinning' }
    ],
    newborns: [
      { name: 'Baby Dresses', href: '/category/newborns' }
    ]
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter something to search');
      return;
    }
    const searchTerm = encodeURIComponent(searchQuery.trim());
    window.location.href = `/search?q=${searchTerm}`;
    setShowSearch(false);
    setSearchQuery('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <>
      {/* Top Bar - Hidden on Mobile */}
      <div className="bg-gray-900 text-white text-sm py-2 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <span>✨ Free shipping on orders over $50</span>
            <div className="flex gap-6">
              <Link href="/support" className="text-white hover:text-gray-300 transition">
                Support
              </Link>
              <Link href="/track-order" className="text-white hover:text-gray-300 transition">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              StyleStore
            </Link>

            {/* Desktop Navigation - Hidden on Mobile */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link href="/" className="px-4 py-2 text-gray-700 hover:text-purple-600 transition rounded-lg">
                Home
              </Link>

              {/* Men Dropdown */}
              <div className="relative"
                onMouseEnter={() => setActiveDropdown('men')}
                onMouseLeave={() => setActiveDropdown(null)}>
                <button className="px-4 py-2 text-gray-700 hover:text-purple-600 transition rounded-lg flex items-center">
                  Men ▾
                </button>
                {activeDropdown === 'men' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-10">
                    {categories.men.map((item) => (
                      <Link key={item.name} href={item.href}
                        className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                        onClick={() => setActiveDropdown(null)}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Women Dropdown */}
              <div className="relative"
                onMouseEnter={() => setActiveDropdown('women')}
                onMouseLeave={() => setActiveDropdown(null)}>
                <button className="px-4 py-2 text-gray-700 hover:text-purple-600 transition rounded-lg flex items-center">
                  Women ▾
                </button>
                {activeDropdown === 'women' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-10">
                    {categories.women.map((item) => (
                      <Link key={item.name} href={item.href}
                        className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                        onClick={() => setActiveDropdown(null)}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Kids Dropdown */}
              <div className="relative"
                onMouseEnter={() => setActiveDropdown('kids')}
                onMouseLeave={() => setActiveDropdown(null)}>
                <button className="px-4 py-2 text-gray-700 hover:text-purple-600 transition rounded-lg flex items-center">
                  Kids ▾
                </button>
                {activeDropdown === 'kids' && (
                  <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-10">
                    {categories.kids.map((item) => (
                      <Link key={item.name} href={item.href}
                        className="block px-4 py-2 hover:bg-gray-50 text-gray-700"
                        onClick={() => setActiveDropdown(null)}>
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/category/newborns" className="px-4 py-2 text-gray-700 hover:text-purple-600 transition rounded-lg">
                Newborns
              </Link>

              <Link href="/sale" className="px-4 py-2 text-red-500 font-bold hover:text-red-600 transition rounded-lg">
                🏷️ Sale
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Mobile Menu Button */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2">
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Search Icon */}
              <button onClick={() => setShowSearch(true)} className="p-2 hover:text-purple-600 transition">
                <Search size={20} />
              </button>

              {/* Auth Buttons - Hidden on Mobile */}
              <div className="hidden md:block">
                <AuthButtons />
              </div>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 hover:text-purple-600 transition">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-white shadow-lg rounded-lg mt-2 p-4">
              <nav className="flex flex-col space-y-2">
                <Link href="/" className="py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                <Link href="/category/men" className="py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setIsMobileMenuOpen(false)}>
                  Men
                </Link>
                <Link href="/category/women" className="py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setIsMobileMenuOpen(false)}>
                  Women
                </Link>
                <Link href="/category/kids" className="py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setIsMobileMenuOpen(false)}>
                  Kids
                </Link>
                <Link href="/category/newborns" className="py-2 px-4 hover:bg-gray-50 rounded" onClick={() => setIsMobileMenuOpen(false)}>
                  Newborns
                </Link>
                <Link href="/sale" className="py-2 px-4 text-red-500 font-bold hover:bg-gray-50 rounded" onClick={() => setIsMobileMenuOpen(false)}>
                  🏷️ Sale
                </Link>
                
                {/* Mobile Auth Buttons */}
                <div className="pt-4 border-t mt-2">
                  <AuthButtons />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-bold">🔍 Search Products</h3>
              <button onClick={() => setShowSearch(false)} className="p-2">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="flex-1 p-3 border rounded-lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  autoFocus
                />
                <button onClick={handleSearch} className="bg-purple-600 text-white px-4 rounded-lg">
                  Search
                </button>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">Quick Categories:</div>
              <div className="flex flex-wrap gap-2">
                {['Jackets', 'Dresses', 'T-Shirts', 'Suits', 'Trousers'].map((cat) => (
                  <button key={cat} onClick={() => setSearchQuery(cat)}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;