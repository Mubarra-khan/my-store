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

  const categories = [
    {
      title: "Men",
      description: "Hoodies, Jackets, Shirts, Suits, Trousers, T-Shirts",
      count: "200+ Products",
      color: "#3B82F6",
      image: "/categories/men-banner.jpg"
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
    if (hoveredCard !== index) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setLensPosition({ x, y });
  };

  return (
    <section style={{ padding: '80px 20px', background: '#F9FAFB' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '50px' 
        }}>
          <div>
            <h2 style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              marginBottom: '10px' 
            }}>
              Shop by Category
            </h2>
            <p style={{ color: '#6B7280', fontSize: '18px' }}>
              Discover collections for everyone
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link 
              href="/cart"
              style={{ 
                background: '#3B82F6',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
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
                fontSize: '16px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#F3F4F6';
                e.currentTarget.style.paddingRight = '20px';
                e.currentTarget.style.transform = 'translateX(5px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.paddingRight = '16px';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              View all categories →
            </Link>
          </div>
        </div>

        {/* Categories Grid with SMALL ELEGANT LENS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {categories.map((category, index) => (
            <div 
              key={index}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: hoveredCard === index 
                  ? `0 20px 40px ${category.color}30` 
                  : '0 4px 20px rgba(0,0,0,0.05)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                height: '100%',
                cursor: 'pointer',
                transform: hoveredCard === index ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                position: 'relative',
                border: hoveredCard === index ? `2px solid ${category.color}30` : '2px solid transparent'
              }}
              onClick={() => handleCategoryClick(category.title)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => {
                setHoveredCard(null);
                setLensPosition({ x: 50, y: 50 });
              }}
            >
              {/* Animated Border Top */}
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
              
              {/* Category Image with SMALL LENS */}
              <div 
                style={{
                  position: 'relative',
                  height: '200px',
                  overflow: 'hidden'
                }}
                onMouseMove={(e) => handleMouseMove(e, index)}
              >
                {/* Main Image with Zoom */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${category.image || '/placeholder.jpg'})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease',
                  transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                }} />
                
                {/* Gradient Overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${category.color}40, ${category.color}20)`,
                  opacity: hoveredCard === index ? 0.8 : 0.4,
                  transition: 'opacity 0.3s ease'
                }} />
                
                {/* SMALL ELEGANT LENS - Only shows on hover */}
                {hoveredCard === index && (
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
                
                {/* Hover Buttons */}
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
              </div>
              
              {/* Category Info */}
              <div style={{ padding: '24px' }}>
                <h3 style={{ 
                  fontSize: '22px', 
                  fontWeight: 'bold', 
                  marginBottom: '10px',
                  color: hoveredCard === index ? category.color : '#1F2937',
                  transition: 'color 0.3s ease'
                }}>
                  {category.title}
                </h3>
                <p style={{ 
                  color: '#6B7280', 
                  marginBottom: '15px',
                  lineHeight: 1.5,
                  height: '42px',
                  overflow: 'hidden'
                }}>
                  {category.description}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #F3F4F6',
                  paddingTop: '15px'
                }}>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '600',
                    color: category.color,
                    transition: 'transform 0.3s ease',
                    transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)'
                  }}>
                    {category.count}
                  </span>
                  <div style={{ 
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: `${category.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === index ? 'rotate(90deg)' : 'rotate(0)'
                  }}>
                    <span style={{ 
                      color: category.color,
                      fontSize: '16px',
                      fontWeight: 'bold',
                      transition: 'transform 0.3s ease',
                      transform: hoveredCard === index ? 'translateX(3px)' : 'translateX(0)'
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