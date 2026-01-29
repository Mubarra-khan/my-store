"use client";

import { useState } from 'react';
import Link from 'next/link';
import AuthButtons from '@/components/auth/AuthButtons';
import { useCart } from '@/components/providers/CartProvider';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { cartCount } = useCart();
  
  // ✅ ADDED: Search state
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  // ✅ ADDED: Handle search function
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Please enter something to search');
      return;
    }
    
    // Convert search query to URL format
    const searchTerm = encodeURIComponent(searchQuery.trim());
    
    // Redirect to search page with query
    window.location.href = `/search?q=${searchTerm}`;
    
    // Close search modal
    setShowSearch(false);
    setSearchQuery('');
  };

  // ✅ ADDED: Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
             {/* ✅ PROFESSIONAL: Search Icon */}
<button 
  onClick={() => setShowSearch(true)}
  style={{
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  }}
  title="Search Products"
>
  <div style={{
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    border: '1.5px solid #D1D5DB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    background: 'white'
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.borderColor = '#7C3AED';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.borderColor = '#D1D5DB';
    e.currentTarget.style.boxShadow = 'none';
  }}
  >
    <svg 
      width="18" 
      height="18" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="#6B7280"
      strokeWidth="2"
      style={{ transition: 'all 0.2s ease' }}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  </div>
</button>
              
              {/* Auth Buttons */}
              <AuthButtons />
              
              {/* Cart */}
              <Link href="/cart" style={{
                position: 'relative',
                color: '#374151',
                textDecoration: 'none',
                fontSize: '18px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#7C3AED';
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              >
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

      {/* ✅ ADDED: Search Modal */}
      {showSearch && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            width: '600px',
            maxWidth: '90%',
            maxHeight: '80vh',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'slideUp 0.3s ease'
          }}>
            {/* Search Header */}
            <div style={{
              padding: '20px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1F2937' }}>
                🔍 Search Products
              </h3>
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6B7280',
                  padding: '5px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div style={{ padding: '20px' }}>
              <div style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '20px'
              }}>
                <input
                  type="text"
                  placeholder="Search in Men, Women, Kids, Newborns, Sale..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{
                    flex: 1,
                    padding: '15px 20px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '10px',
                    fontSize: '16px',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#7C3AED';
                    e.target.style.boxShadow = '0 0 0 3px rgba(124, 58, 237, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E5E7EB';
                    e.target.style.boxShadow = 'none';
                  }}
                  autoFocus
                />
                <button
                  onClick={handleSearch}
                  style={{
                    padding: '15px 25px',
                    background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Search
                </button>
              </div>

              {/* Search Suggestions */}
              <div>
                <p style={{ 
                  color: '#6B7280', 
                  fontSize: '14px', 
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>
                  Quick Categories:
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Jackets', 'Dresses', 'T-Shirts', 'Suits', 'Hoodies', 'Shirts', 'Trousers', 'Baby Dresses'].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSearchQuery(category);
                        setTimeout(() => handleSearch(), 100);
                      }}
                      style={{
                        padding: '8px 15px',
                        background: '#F3F4F6',
                        border: '1px solid #E5E7EB',
                        borderRadius: '20px',
                        color: '#374151',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#E5E7EB';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#F3F4F6';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Tips */}
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                background: '#F0F9FF', 
                borderRadius: '10px',
                border: '1px solid #BAE6FD'
              }}>
                <p style={{ 
                  color: '#0C4A6E', 
                  fontSize: '14px',
                  margin: 0
                }}>
                  💡 <strong>Tip:</strong> Search by product name, category, or gender. Example: "Men's Jacket", "Women Dress", "Kids T-Shirt"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ✅ ADDED: CSS Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;