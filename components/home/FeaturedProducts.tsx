"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/components/providers/CartProvider';

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentHoverIndex, setCurrentHoverIndex] = useState<number>(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});
  const [isMobile, setIsMobile] = useState(false);

  // @ts-ignore
const { addToCart, cart } = useCart();

  // ✅ ADDED: Check screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const products = [
    {
      id: 1,
      name: "Leather Jacket",
      price: 129.99,
      category: "Jackets",
      gender: "men",
      image: "/products/men/jackets/jacket1.jpg",
      rating: 4.8,
      reviews: 89
    },
    {
      id: 2,
      name: "Premium Suit",
      price: 299.99,
      category: "Suits",
      gender: "men",
      image: "/products/men/suits/suit1.jpg",
      rating: 4.9,
      reviews: 45
    },
    {
      id: 3,
      name: "Cotton T-Shirt",
      price: 24.99,
      category: "T-Shirts",
      gender: "men",
      image: "/products/men/tshirts/tshirt9.jpg",
      rating: 4.5,
      reviews: 124
    },
    {
      id: 4,
      name: "Warm Hoodie",
      price: 59.99,
      category: "Hoodies",
      gender: "men",
      image: "/products/men/hoodies/hoodie1.jpg",
      rating: 4.7,
      reviews: 78
    },
    {
      id: 5,
      name: "Elegant Dress",
      price: 79.99,
      category: "Dresses",
      gender: "women",
      image: "/products/women/elegantdress/elegant9.jpg",
      rating: 4.8,
      reviews: 92
    },
    {
      id: 6,
      name: "Women's Trousers",
      price: 49.99,
      category: "Trousers",
      gender: "women",
      image: "/products/women/trousers/trouser2.jpg",
      rating: 4.6,
      reviews: 67
    },
    {
      id: 7,
      name: "Kids Jacket",
      price: 34.99,
      category: "Jackets",
      gender: "kids",
      image: "/products/kids/boys/jackets/jacket1.jpg",
      rating: 4.4,
      reviews: 56
    },
    {
      id: 8,
      name: "Girl's Dress",
      price: 29.99,
      category: "Dresses",
      gender: "kids",
      image: "/products/kids/girls/dress/dress1.jpg",
      rating: 4.7,
      reviews: 89
    },
    {
      id: 9,
      name: "Men's Formal Shirt",
      price: 49.99,
      category: "Shirts",
      gender: "men",
      image: "/products/men/shirts/shirt8.jpg",
      rating: 4.6,
      reviews: 102
    },
    {
      id: 10,
      name: "Boy's T-Shirt",
      price: 19.99,
      category: "T-Shirts",
      gender: "kids",
      image: "/products/kids/boys/tshirts/tshirt1.jpg",
      rating: 4.3,
      reviews: 45
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHoverIndex((prevIndex) => (prevIndex + 1) % products.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getGenderColor = (gender: string) => {
    switch(gender) {
      case 'men': return '#3B82F6';
      case 'women': return '#EC4899';
      case 'kids': return '#10B981';
      default: return '#F59E0B';
    }
  };

  const handleAddToCart = (product: any) => {
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        gender: product.gender
      });
      
      setAddedItems(prev => ({ ...prev, [product.id]: true }));
      
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [product.id]: false }));
      }, 2000);
      
      alert(`✓ ${product.name} added to cart!`);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Could not add item to cart. Please try again.');
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLDivElement, Event>) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      parent.style.background = '#F1F5F9';
      parent.style.display = 'flex';
      parent.style.alignItems = 'center';
      parent.style.justifyContent = 'center';
      parent.style.fontSize = isMobile ? '24px' : '32px';
      parent.style.color = '#6B7280';
    }
  };

  return (
    <>
      <section style={{ 
        padding: isMobile ? '40px 15px' : '60px 20px', 
        background: '#F8FAFC' 
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: isMobile ? '30px' : '40px'
          }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              color: 'white',
              padding: isMobile ? '6px 15px' : '8px 20px',
              borderRadius: '50px',
              fontSize: isMobile ? '12px' : '14px',
              fontWeight: 'bold',
              marginBottom: isMobile ? '10px' : '12px'
            }}>
              🔥 FEATURED PRODUCTS
            </span>
            <h2 style={{ 
              fontSize: isMobile ? '24px' : '32px', 
              fontWeight: 'bold', 
              marginBottom: isMobile ? '10px' : '12px',
              color: '#1F2937'
            }}>
              Best Selling Items
            </h2>
            <p style={{ 
              color: '#6B7280', 
              fontSize: isMobile ? '14px' : '16px',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.5
            }}>
              Handpicked selection from all categories
            </p>
          </div>

          {/* ✅ UPDATED: Mobile 2 columns, Desktop same */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 
              'repeat(2, 1fr)' : // Mobile: 2 columns (do do pics)
              'repeat(auto-fit, minmax(260px, 1fr))', // Desktop: same
            gap: isMobile ? '12px' : '24px' // Mobile gap kam
          }}>
            {products.map((product, index) => (
              <div 
                key={product.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  height: isMobile ? '340px' : '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  border: '1px solid #F1F5F9',
                  borderLeft: `3px solid ${getGenderColor(product.gender)}`
                }}
                onMouseEnter={() => !isMobile && setCurrentHoverIndex(index)}
                onMouseLeave={() => {}}
              >
                {/* Gender Badge */}
                <div style={{
                  position: 'absolute',
                  top: isMobile ? '8px' : '10px',
                  left: isMobile ? '8px' : '10px',
                  background: getGenderColor(product.gender),
                  color: 'white',
                  fontSize: isMobile ? '8px' : '9px',
                  fontWeight: 'bold',
                  padding: isMobile ? '2px 6px' : '3px 8px',
                  borderRadius: '3px',
                  zIndex: 3,
                  opacity: 0.9
                }}>
                  {product.gender?.toUpperCase()}
                </div>

                {/* Hover Border Effect - Only on Desktop */}
                {!isMobile && (
                  <div 
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      borderRadius: '12px',
                      border: currentHoverIndex === index ? `1px solid ${getGenderColor(product.gender)}` : '1px solid transparent',
                      transition: 'all 0.3s ease',
                      pointerEvents: 'none',
                      zIndex: 1
                    }}
                  />
                )}

                {/* Product Image */}
                <div style={{
                  height: isMobile ? '180px' : '200px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#F9FAFB',
                  borderBottom: '1px solid #F3F4F6'
                }}>
                  <div 
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      transform: !isMobile && currentHoverIndex === index ? 'scale(1.03)' : 'scale(1)',
                      transition: 'transform 0.3s ease'
                    }}
                    onError={handleImageError}
                  />
                  
                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    style={{
                      position: 'absolute',
                      top: isMobile ? '6px' : '8px',
                      right: isMobile ? '6px' : '8px',
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #E5E7EB',
                      width: isMobile ? '28px' : '30px',
                      height: isMobile ? '28px' : '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: isMobile ? '13px' : '14px',
                      cursor: 'pointer',
                      boxShadow: '0 1px 5px rgba(0,0,0,0.05)',
                      zIndex: 3,
                      transform: !isMobile && currentHoverIndex === index ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {wishlist.includes(product.id) ? '❤️' : '🤍'}
                  </button>
                  
                  {/* Added to Cart Badge */}
                  {addedItems[product.id] && (
                    <div style={{
                      position: 'absolute',
                      top: isMobile ? '6px' : '8px',
                      left: isMobile ? '6px' : '8px',
                      background: '#10B981',
                      color: 'white',
                      fontSize: isMobile ? '8px' : '9px',
                      fontWeight: 'bold',
                      padding: isMobile ? '2px 5px' : '3px 6px',
                      borderRadius: '3px',
                      zIndex: 3,
                      animation: 'pulseBorder 2s infinite'
                    }}>
                      ✓ Added
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div style={{ 
                  padding: isMobile ? '14px' : '16px', 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column'
                }}>
                  <div style={{ marginBottom: '8px', flex: 1 }}>
                    <p style={{ 
                      color: '#6B7280', 
                      fontSize: isMobile ? '11px' : '12px',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                      fontWeight: '500'
                    }}>
                      {product.category}
                    </p>
                    <h3 style={{ 
                      fontSize: isMobile ? '15px' : '16px', 
                      fontWeight: 'bold',
                      marginBottom: '6px',
                      color: '#1F2937',
                      lineHeight: 1.3,
                      height: isMobile ? '34px' : '38px',
                      overflow: 'hidden'
                    }}>
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: isMobile ? '10px' : '12px' 
                  }}>
                    <span style={{ 
                      color: '#F59E0B', 
                      fontSize: isMobile ? '11px' : '12px',
                      marginRight: '4px'
                    }}>
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span style={{ 
                      color: '#6B7280', 
                      fontSize: isMobile ? '10px' : '11px',
                      marginLeft: '4px'
                    }}>
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price & Actions */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto'
                  }}>
                    <div>
                      <span style={{ 
                        fontSize: isMobile ? '16px' : '18px', 
                        fontWeight: 'bold',
                        color: '#1F2937'
                      }}>
                        ${product.price.toFixed(2)}
                      </span>
                      <div style={{ 
                        fontSize: isMobile ? '11px' : '12px', 
                        color: '#9CA3AF' 
                      }}>
                        {product.gender === 'men' ? "Men's" : 
                         product.gender === 'women' ? "Women's" : 
                         product.gender === 'kids' ? "Kids" : "Product"}
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      style={{
                        background: addedItems[product.id] 
                          ? '#10B981' 
                          : 'linear-gradient(135deg, #8B5CF6, #EC4899)',
                        color: 'white',
                        border: 'none',
                        padding: isMobile ? '6px 12px' : '7px 14px',
                        borderRadius: isMobile ? '4px' : '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: isMobile ? '11px' : '12px',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => {
                        if (!isMobile && !addedItems[product.id]) {
                          e.currentTarget.style.transform = 'scale(1.03)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 92, 246, 0.2)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isMobile) {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.boxShadow = 'none';
                        }
                      }}
                    >
                      {addedItems[product.id] ? '✓ Added' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Prompt Modal - Responsive */}
      {showLoginPrompt && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: isMobile ? '15px' : '0'
        }}>
          <div style={{
            background: 'white',
            padding: isMobile ? '20px' : '24px',
            borderRadius: '12px',
            width: isMobile ? '90%' : '350px',
            maxWidth: '90%',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ 
              marginBottom: isMobile ? '12px' : '16px', 
              fontSize: isMobile ? '18px' : '20px', 
              fontWeight: 'bold',
              color: '#EF4444'
            }}>
              Login Required
            </h3>
            
            <p style={{ 
              marginBottom: isMobile ? '16px' : '20px', 
              color: '#6B7280',
              fontSize: isMobile ? '13px' : '14px',
              lineHeight: 1.5
            }}>
              Please login to add items to your cart.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: isMobile ? '8px' : '10px', 
              justifyContent: 'flex-end',
              flexDirection: isMobile ? 'column' : 'row'
            }}>
              <button
                onClick={() => setShowLoginPrompt(false)}
                style={{
                  padding: isMobile ? '8px 16px' : '10px 20px',
                  background: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: isMobile ? '13px' : '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                }}
                style={{
                  padding: isMobile ? '8px 16px' : '10px 20px',
                  background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: isMobile ? '13px' : '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                Login Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style jsx global>{`
        @keyframes pulseBorder {
          0%, 100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.02);
          }
        }
      `}</style>
    </>
  );
};

export default FeaturedProducts;