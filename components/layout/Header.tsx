"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AuthButtons from '@/components/auth/AuthButtons';
import { useCart } from '@/components/providers/CartProvider';

const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { cartCount } = useCart();
  
  // ✅ ADDED: Search state
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ ADDED: Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ✅ ADDED: Responsive styles
  const styles = {
    topBar: {
      background: '#111827',
      color: 'white',
      padding: '8px 0',
      fontSize: isMobile ? '12px' : '14px',
      display: isMobile ? 'none' : 'block' // Hide on mobile
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
      padding: isMobile ? '0 12px' : '0 16px'
    },
    logo: {
      fontSize: isMobile ? '22px' : '28px',
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
      padding: isMobile ? '8px 12px' : '10px 16px',
      borderRadius: '8px',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: isMobile ? '14px' : '16px'
    },
    dropdown: {
      position: 'absolute' as const,
      top: '100%',
      left: 0,
      background: 'white',
      minWidth: isMobile ? '160px' : '200px',
      borderRadius: '8px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
      padding: '8px 0',
      zIndex: 1000
    },
    dropdownItem: {
      padding: isMobile ? '10px 16px' : '12px 20px',
      color: '#374151',
      textDecoration: 'none',
      display: 'block',
      transition: 'background 0.2s',
      fontSize: isMobile ? '14px' : '16px'
    },
    mobileMenuButton: {
      background: 'none',
      border: 'none',
      fontSize: '24px',
      cursor: 'pointer',
      color: '#374151',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
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
    
    const searchTerm = encodeURIComponent(searchQuery.trim());
    window.location.href = `/search?q=${searchTerm}`;
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
      {/* Top Bar - Hidden on Mobile */}
      <div style={styles.topBar}>
        <div style={styles.container}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}>
            <span>✨ Free shipping on orders over $50</span>
            <div style={{ display: 'flex', gap: isMobile ? '12px' : '24px' }}>
              <Link href="/support" style={{ color: 'white', textDecoration: 'none', fontSize: isMobile ? '12px' : '14px' }}>
                Support
              </Link>
              <Link href="/track-order" style={{ color: 'white', textDecoration: 'none', fontSize: isMobile ? '12px' : '14px' }}>
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
            padding: isMobile ? '15px 0' : '20px 0',
            position: 'relative'
          }}>
            {/* Logo */}
            <Link href="/" style={styles.logo}>
              StyleStore
            </Link>

            {/* Desktop Navigation - Hidden on Mobile */}
            {!isMobile && (
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
            )}

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '20px' }}>
              {/* Mobile Menu Button - Only on Mobile */}
              {isMobile && (
                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  style={styles.mobileMenuButton}
                >
                  {isMobileMenuOpen ? '✕' : '☰'}
                </button>
              )}

              {/* Search Icon */}
              <button 
                onClick={() => setShowSearch(true)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: isMobile ? '6px' : '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}
                title="Search Products"
              >
                <div style={{
                  width: isMobile ? '34px' : '38px',
                  height: isMobile ? '34px' : '38px',
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
                    width={isMobile ? "16" : "18"} 
                    height={isMobile ? "16" : "18"} 
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
              {!isMobile && <AuthButtons />}
              
              {/* Cart */}
              <Link href="/cart" style={{
                position: 'relative',
                color: '#374151',
                textDecoration: 'none',
                fontSize: isMobile ? '16px' : '18px',
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
                  fontSize: isMobile ? '10px' : '11px',
                  width: isMobile ? '18px' : '20px',
                  height: isMobile ? '18px' : '20px',
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

          {/* Mobile Menu - Only show when open */}
          {isMobile && isMobileMenuOpen && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'white',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              borderRadius: '0 0 12px 12px',
              zIndex: 999,
              padding: '16px',
              borderTop: '1px solid #E5E7EB'
            }}>
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/" style={styles.navLink} onClick={() => setIsMobileMenuOpen(false)}>
                  Home
                </Link>
                
                {/* Mobile Categories */}
                {['Men', 'Women', 'Kids', 'Newborns', 'Sale'].map((category) => (
                  <div key={category} style={{ position: 'relative' }}>
                    <Link 
                      href={category === 'Sale' ? '/sale' : `/category/${category.toLowerCase()}`}
                      style={styles.navLink}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {category} {category !== 'Sale' && '→'}
                    </Link>
                  </div>
                ))}
                
                {/* Mobile Auth Buttons */}
                <div style={{ marginTop: '15px', borderTop: '1px solid #E5E7EB', paddingTop: '15px' }}>
                  <AuthButtons />
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Search Modal - Responsive */}
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
          animation: 'fadeIn 0.3s ease',
          padding: isMobile ? '15px' : '0'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            width: isMobile ? '100%' : '600px',
            maxWidth: '90%',
            maxHeight: '80vh',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            animation: 'slideUp 0.3s ease'
          }}>
            {/* Search Header */}
            <div style={{
              padding: isMobile ? '15px' : '20px',
              borderBottom: '1px solid #E5E7EB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h3 style={{ 
                fontSize: isMobile ? '18px' : '20px', 
                fontWeight: 'bold', 
                color: '#1F2937' 
              }}>
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
                  fontSize: isMobile ? '22px' : '24px',
                  cursor: 'pointer',
                  color: '#6B7280',
                  padding: '5px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Search Input */}
            <div style={{ padding: isMobile ? '15px' : '20px' }}>
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
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
                    padding: isMobile ? '12px 16px' : '15px 20px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '10px',
                    fontSize: isMobile ? '15px' : '16px',
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
                    padding: isMobile ? '12px 20px' : '15px 25px',
                    background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: isMobile ? '15px' : '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  Search
                </button>
              </div>

              {/* Search Suggestions */}
              <div>
                <p style={{ 
                  color: '#6B7280', 
                  fontSize: isMobile ? '13px' : '14px', 
                  marginBottom: '10px',
                  fontWeight: '500'
                }}>
                  Quick Categories:
                </p>
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '8px',
                  justifyContent: isMobile ? 'center' : 'flex-start'
                }}>
                  {['Jackets', 'Dresses', 'T-Shirts', 'Suits', 'Hoodies', 'Shirts', 'Trousers', 'Baby Dresses'].map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSearchQuery(category);
                        setTimeout(() => handleSearch(), 100);
                      }}
                      style={{
                        padding: isMobile ? '6px 12px' : '8px 15px',
                        background: '#F3F4F6',
                        border: '1px solid #E5E7EB',
                        borderRadius: '20px',
                        color: '#374151',
                        fontSize: isMobile ? '13px' : '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
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
                padding: isMobile ? '12px' : '15px', 
                background: '#F0F9FF', 
                borderRadius: '10px',
                border: '1px solid #BAE6FD'
              }}>
                <p style={{ 
                  color: '#0C4A6E', 
                  fontSize: isMobile ? '13px' : '14px',
                  margin: 0
                }}>
                  💡 <strong>Tip:</strong> Search by product name, category, or gender.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
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
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Header;