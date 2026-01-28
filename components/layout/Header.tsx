"use client";

import { useState } from 'react';
import Link from 'next/link';
import AuthButtons from '@/components/auth/AuthButtons';
import { useCart } from '@/components/providers/CartProvider'; // 👈 YEH IMPORT ADD KAREIN

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { cartCount } = useCart(); // 👈 YEH ADD KAREIN

  const styles = {
    topBar: {
      background: '#111827',
      color: 'white',
      padding: '8px 0',
      fontSize: '14px'
    },
    header: {
      background: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      position: 'sticky' as const,
      top: 0,
      zIndex: 1000
    },
    container: {
      maxWidth: '1280px',
      margin: '0 auto',
      padding: '0 16px'
    },
    logo: {
      fontSize: '28px',
      fontWeight: 'bold',
      background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      textDecoration: 'none'
    },
    navLink: {
      color: '#374151',
      textDecoration: 'none',
      fontWeight: 500,
      padding: '10px 16px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      background: 'white',
      minWidth: '200px',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      padding: '8px 0',
      zIndex: 1000
    },
    dropdownItem: {
      padding: '12px 20px',
      color: '#374151',
      textDecoration: 'none',
      display: 'block',
      transition: 'background 0.2s'
    }
  };

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
      { name: 'Shirts', href: '/category/women?category=Shirts' },
      { name: 'Twinning Sets', href: '/category/women?category=Twinning Sets' }
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

  return (
    <>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.container}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>✨ Free shipping on orders over $50</span>
            <div style={{ display: 'flex', gap: '24px' }}>
              <Link href="/support" style={{ color: 'white', textDecoration: 'none' }}>
                Support
              </Link>
              <Link href="/track-order" style={{ color: 'white', textDecoration: 'none' }}>
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header style={styles.header}>
        <div style={styles.container}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 0',
            position: 'relative'
          }}>
            {/* Logo */}
            <Link href="/" style={styles.logo}>
              StyleStore
            </Link>

            {/* Desktop Navigation */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {/* Home */}
              <Link href="/" style={styles.navLink}>
                Home
              </Link>

              {/* Men Dropdown */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown('men')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button style={{
                  ...styles.navLink,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit'
                }}>
                  Men ▾
                </button>
                {activeDropdown === 'men' && (
                  <div style={styles.dropdown}>
                    {categories.men.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        style={styles.dropdownItem}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Women Dropdown */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown('women')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button style={{
                  ...styles.navLink,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit'
                }}>
                  Women ▾
                </button>
                {activeDropdown === 'women' && (
                  <div style={styles.dropdown}>
                    {categories.women.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        style={styles.dropdownItem}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Kids Dropdown */}
              <div
                style={{ position: 'relative' }}
                onMouseEnter={() => setActiveDropdown('kids')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button style={{
                  ...styles.navLink,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: 'inherit'
                }}>
                  Kids ▾
                </button>
                {activeDropdown === 'kids' && (
                  <div style={styles.dropdown}>
                    {categories.kids.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        style={styles.dropdownItem}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Newborns */}
              <Link 
                href="/category/newborns" 
                style={styles.navLink}
                onClick={() => setActiveDropdown(null)}
              >
                Newborns
              </Link>

              {/* Sale */}
              <Link href="/sale" style={{
                ...styles.navLink,
                color: '#EF4444',
                fontWeight: 'bold'
              }}>
                🏷️ Sale
              </Link>
            </nav>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {/* Search Button */}
              <button style={{
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#374151',
              }}>
                🔍
              </button>
              
              {/* Auth Buttons */}
              <AuthButtons />
              
              {/* Cart */}
              <Link href="/cart" style={{
                position: 'relative',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '18px',
              }}>
                🛒
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#7C3AED',
                  color: 'white',
                  fontSize: '11px',
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;