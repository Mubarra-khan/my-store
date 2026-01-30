"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const Categories = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [lensPosition, setLensPosition] = useState({ x: 50, y: 50 });
  const [cart, setCart] = useState<Array<{id: string, name: string, price: number, image: string}>>([]);
  const [addedItems, setAddedItems] = useState<{[key: string]: boolean}>({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
    {
      title: "Men",
      description: "Hoodies, Jackets, Shirts, Suits, Trousers, T-Shirts",
      count: "200+ Products",
      color: "#3B82F6",
      image: "/categories/hoodie-banner.jpg"
    },
    {
      title: "Women", 
      description: "Dresses, Trousers, Shirts, Twinning Sets",
      count: "180+ Products",
      color: "#EC4899",
      image: "/categories/women-banner.jpg"
    },
    {
      title: "Kids",
      description: "Boys & Girls - Jackets, Shirts, Trousers, T-Shirts, Dresses",
      count: "150+ Products",
      color: "#10B981",
      image: "/categories/kids-banner.jpg"
    },
    {
      title: "Newborns",
      description: "Baby Dresses & Essentials",
      count: "80+ Products",
      color: "#FBBF24",
      image: "/categories/newborns-banner.jpg"
    }
  ];

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleCategoryClick = (categoryTitle: string) => {
    router.push(`/category/${categoryTitle.toLowerCase()}`);
  };

  const handleAddToCart = (e: React.MouseEvent, category: any) => {
    e.stopPropagation();
    
    // Generate unique product ID based on category
    const productId = `${category.title.toLowerCase()}-product-${Date.now()}`;
    const productName = `${category.title} Collection`;
    const productPrice = category.title === "Men" ? 2999 : 
                       category.title === "Women" ? 3499 : 
                       category.title === "Kids" ? 2299 : 1899;
    
    const newItem = {
      id: productId,
      name: productName,
      price: productPrice,
      image: category.image
    };
    
    setCart(prev => [...prev, newItem]);
    setAddedItems(prev => ({ ...prev, [category.title]: true }));
    
    // Show success message
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [category.title]: false }));
    }, 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredCard !== index || isMobile) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPosition({ x, y });
  };

  return (
    <section style={{ padding: isMobile ? '40px 15px' : '80px 20px', background: '#F9FAFB' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          marginBottom: isMobile ? '30px' : '50px',
          gap: isMobile ? '20px' : '0'
        }}>
          <div>
            <h2 style={{ 
              fontSize: isMobile ? '28px' : '36px', 
              fontWeight: 'bold', 
              marginBottom: '10px' 
            }}>
              Shop by Category
            </h2>
            <p style={{ color: '#6B7280', fontSize: isMobile ? '16px' : '18px' }}>
              Discover collections for everyone
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center', 
            gap: isMobile ? '10px' : '20px',
            width: isMobile ? '100%' : 'auto'
          }}>
            <Link 
              href="/cart"
              style={{ 
                background: '#3B82F6',
                color: 'white',
                border: 'none',
                padding: isMobile ? '10px 20px' : '8px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: isMobile ? '14px' : '14px',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center'
              }}
            >
              🛒 Cart ({cart.length})
            </Link>
            <Link 
              href="/all-categories"
              style={{ 
                background: 'none',
                border: 'none',
                color: '#8B5CF6', 
                fontWeight: 'bold',
                fontSize: isMobile ? '14px' : '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                padding: isMobile ? '10px 20px' : '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                width: isMobile ? '100%' : 'auto',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = '#F3F4F6';
                  e.currentTarget.style.paddingRight = '20px';
                  e.currentTarget.style.transform = 'translateX(5px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.paddingRight = isMobile ? '20px' : '16px';
                  e.currentTarget.style.transform = 'translateX(0)';
                }
              }}
            >
              View all categories →
            </Link>
          </div>
        </div>

        {/* Categories Grid with SMALL ELEGANT LENS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 
            'repeat(2, 1fr)' : // Mobile: 2 columns
            'repeat(auto-fit, minmax(280px, 1fr))', // Desktop: responsive
          gap: isMobile ? '16px' : '24px'
        }}>
          {categories.map((category, index) => (
            <div 
              key={index}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: !isMobile && hoveredCard === index 
                  ? `0 20px 40px ${category.color}30` 
                  : '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                height: '100%',
                cursor: 'pointer',
                transform: !isMobile && hoveredCard === index ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                position: 'relative',
                border: !isMobile && hoveredCard === index ? `2px solid ${category.color}30` : '2px solid transparent'
              }}
              onClick={() => handleCategoryClick(category.title)}
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => {
                if (!isMobile) {
                  setHoveredCard(null);
                  setLensPosition({ x: 50, y: 50 });
                }
              }}
            >
              {/* Animated Border Top - Only on desktop */}
              {!isMobile && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${category.color}, ${category.color}80)`,
                  transform: hoveredCard === index ? 'scaleX(1)' : 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.5s ease',
                  zIndex: 2
                }} />
              )}
              
              {/* Category Image with SMALL LENS - Only on desktop */}
              <div 
                style={{
                  position: 'relative',
                  height: isMobile ? '120px' : '200px',
                  overflow: 'hidden'
                }}
                onMouseMove={(e) => !isMobile && handleMouseMove(e, index)}
              >
                {/* Main Image with Zoom - Only on desktop */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${category.image || '/placeholder.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease',
                  transform: !isMobile && hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                }} />
                
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${category.color}40, ${category.color}20)`,
                  opacity: !isMobile && hoveredCard === index ? 0.8 : 0.4,
                  transition: 'opacity 0.3s ease'
                }} />
                
                {/* SMALL ELEGANT LENS - Only shows on hover (desktop only) */}
                {!isMobile && hoveredCard === index && (
                  <div style={{
                    position: 'absolute',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '2px solid white',
                    backgroundImage: `url(${category.image || '/placeholder.jpg'})`,
                    backgroundSize: '300% 300%',
                    backgroundPosition: `${lensPosition.x}% ${lensPosition.y}%`,
                    pointerEvents: 'none',
                    zIndex: 5,
                    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                    left: `calc(${lensPosition.x}% - 40px)`,
                    top: `calc(${lensPosition.y}% - 40px)`,
                    transition: 'left 0.1s ease, top 0.1s ease'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      backgroundColor: 'white',
                      boxShadow: '0 0 4px rgba(0,0,0,0.5)'
                    }} />
                  </div>
                )}
                
                {/* Hover Buttons - Only on desktop */}
                {!isMobile && (
                  <div style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '50%',
                    transform: hoveredCard === index 
                      ? 'translateX(-50%) translateY(0)' 
                      : 'translateX(-50%) translateY(20px)',
                    opacity: hoveredCard === index ? 1 : 0,
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    gap: '10px',
                    zIndex: 6
                  }}>
                    <button
                      style={{
                        background: 'white',
                        color: category.color,
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category.title);
                      }}
                    >
                      Shop Now
                      <span style={{ 
                        transition: 'transform 0.3s ease',
                        transform: hoveredCard === index ? 'translateX(5px)' : 'translateX(0)'
                      }}>
                        →
                      </span>
                    </button>
                    
                    <button
                      style={{
                        background: addedItems[category.title] ? category.color : 'white',
                        color: addedItems[category.title] ? 'white' : category.color,
                        border: `2px solid ${category.color}`,
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={(e) => handleAddToCart(e, category)}
                    >
                      {addedItems[category.title] ? '✓ Added' : '🛒 Add to Cart'}
                    </button>
                  </div>
                )}
                
                {/* Mobile Tap Message */}
                {isMobile && (
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: category.color,
                    zIndex: 6
                  }}>
                    Tap to Explore →
                  </div>
                )}
              </div>
              
              {/* Category Info */}
              <div style={{ padding: isMobile ? '16px' : '24px' }}>
                <h3 style={{ 
                  fontSize: isMobile ? '18px' : '22px', 
                  fontWeight: 'bold', 
                  marginBottom: isMobile ? '8px' : '10px',
                  color: !isMobile && hoveredCard === index ? category.color : '#1F2937',
                  transition: 'color 0.3s ease'
                }}>
                  {category.title}
                </h3>
                <p style={{ 
                  color: '#6B7280', 
                  marginBottom: isMobile ? '12px' : '15px',
                  lineHeight: 1.5,
                  height: isMobile ? '36px' : '42px',
                  overflow: 'hidden',
                  fontSize: isMobile ? '13px' : '14px'
                }}>
                  {category.description}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #F3F4F6',
                  paddingTop: isMobile ? '12px' : '15px'
                }}>
                  <span style={{ 
                    fontSize: isMobile ? '12px' : '14px', 
                    fontWeight: '600',
                    color: category.color,
                    transition: !isMobile ? 'transform 0.3s ease' : 'none',
                    transform: !isMobile && hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                  }}>
                    {category.count}
                  </span>
                  <div style={{ 
                    width: isMobile ? '24px' : '30px',
                    height: isMobile ? '24px' : '30px',
                    borderRadius: '50%',
                    background: `${category.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: !isMobile ? 'all 0.3s ease' : 'none',
                    transform: !isMobile && hoveredCard === index ? 'rotate(90deg)' : 'rotate(0)'
                  }}>
                    <span style={{ 
                      color: category.color,
                      fontSize: isMobile ? '14px' : '16px',
                      fontWeight: 'bold',
                      transition: !isMobile ? 'transform 0.3s ease' : 'none',
                      transform: !isMobile && hoveredCard === index ? 'translateX(3px)' : 'translateX(0)'
                    }}>
                      →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;