"use client";

import { useState, useEffect } from 'react';
import { useCart } from '@/components/providers/CartProvider'; // ✅ CHANGE 1: Import CartProvider

const FeaturedProducts = () => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [currentHoverIndex, setCurrentHoverIndex] = useState<number>(0);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});

  // ✅ CHANGE 2: Remove local cart state and use CartProvider
  const { addToCart, cart } = useCart(); // ✅ CartProvider se cart lein

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

  // ✅ CHANGE 3: Remove these useEffect for local storage (CartProvider handle karega)
  /*
  useEffect(() => {
    const savedCart = localStorage.getItem('featuredCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('featuredCart', JSON.stringify(cart));
  }, [cart]);
  */

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

  // ✅ CHANGE 4: Update handleAddToCart to use CartProvider
  const handleAddToCart = (product: any) => {
    try {
      // CartProvider ka addToCart use karein
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        gender: product.gender
      });
      
      // Show feedback
      setAddedItems(prev => ({ ...prev, [product.id]: true }));
      
      // Reset after 2 seconds
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [product.id]: false }));
      }, 2000);
      
      // Show success message
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
      parent.style.fontSize = '32px';
      parent.style.color = '#6B7280';
    }
  };

  return (
    <>
      <section style={{ padding: '60px 20px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '40px'
          }}>
            <span style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              color: 'white',
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '12px'
            }}>
              🔥 FEATURED PRODUCTS
            </span>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              marginBottom: '12px',
              color: '#1F2937'
            }}>
              Best Selling Items
            </h2>
            <p style={{ 
              color: '#6B7280', 
              fontSize: '16px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Handpicked selection from all categories
            </p>
          </div>

          {/* Products Grid - Smaller Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}>
            {products.map((product, index) => (
              <div 
                key={product.id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  height: '380px',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer'
                }}
                onMouseEnter={() => setCurrentHoverIndex(index)}
                onMouseLeave={() => {}}
              >
                {/* Hover Border Effect */}
                <div 
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '12px',
                    border: currentHoverIndex === index ? `2px solid ${getGenderColor(product.gender)}` : '1px solid transparent',
                    transition: 'all 0.3s ease',
                    pointerEvents: 'none',
                    zIndex: 1
                  }}
                />

                {/* Product Image - Smaller */}
                <div style={{
                  height: '200px',
                  position: 'relative',
                  overflow: 'hidden',
                  background: '#F1F5F9'
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
                      transform: currentHoverIndex === index ? 'scale(1.05)' : 'scale(1)',
                      transition: 'transform 0.4s ease'
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
                      top: '8px',
                      right: '8px',
                      background: 'white',
                      border: 'none',
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      cursor: 'pointer',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                      zIndex: 3,
                      transform: currentHoverIndex === index ? 'scale(1.1)' : 'scale(1)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {wishlist.includes(product.id) ? '❤️' : '🤍'}
                  </button>
                  
                  {/* Added to Cart Badge */}
                  {addedItems[product.id] && (
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      background: '#10B981',
                      color: 'white',
                      fontSize: '10px',
                      fontWeight: 'bold',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      zIndex: 3,
                      animation: 'pulseBorder 2s infinite'
                    }}>
                      ✓ Added
                    </div>
                  )}
                </div>

                {/* Product Info - Smaller */}
                <div style={{ 
                  padding: '16px', 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column'
                }}>
                  <div style={{ marginBottom: '8px', flex: 1 }}>
                    <p style={{ 
                      color: '#6B7280', 
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      marginBottom: '4px',
                      fontWeight: '500'
                    }}>
                      {product.category}
                    </p>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: 'bold',
                      marginBottom: '6px',
                      color: '#1F2937',
                      lineHeight: 1.3,
                      height: '38px',
                      overflow: 'hidden'
                    }}>
                      {product.name}
                    </h3>
                  </div>

                  {/* Rating - Smaller */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '12px' 
                  }}>
                    <span style={{ 
                      color: '#F59E0B', 
                      fontSize: '12px',
                      marginRight: '4px'
                    }}>
                      {'★'.repeat(Math.floor(product.rating))}
                      {'☆'.repeat(5 - Math.floor(product.rating))}
                    </span>
                    <span style={{ 
                      color: '#6B7280', 
                      fontSize: '11px',
                      marginLeft: '4px'
                    }}>
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Price & Actions - Smaller */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 'auto'
                  }}>
                    <div>
                      <span style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        color: '#1F2937'
                      }}>
                        ${product.price.toFixed(2)}
                      </span>
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
                        padding: '8px 16px',
                        borderRadius: '6px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '12px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!addedItems[product.id]) {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 92, 246, 0.3)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
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

      {/* Login Prompt Modal */}
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
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '24px',
            borderRadius: '12px',
            width: '350px',
            maxWidth: '90%',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}>
            <h3 style={{ 
              marginBottom: '16px', 
              fontSize: '20px', 
              fontWeight: 'bold',
              color: '#EF4444'
            }}>
              Login Required
            </h3>
            
            <p style={{ 
              marginBottom: '20px', 
              color: '#6B7280',
              fontSize: '14px',
              lineHeight: 1.5
            }}>
              Please login to add items to your cart.
            </p>
            
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowLoginPrompt(false)}
                style={{
                  padding: '10px 20px',
                  background: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              
              <button
                onClick={() => {
                  setShowLoginPrompt(false);
                }}
                style={{
                  padding: '10px 20px',
                  background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer'
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