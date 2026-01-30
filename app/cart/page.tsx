// app/cart/page.tsx
"use client";

import { useCart } from '@/components/providers/CartProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!user) {
    return (
      <div style={{ 
        padding: '80px 20px', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ShoppingCart size={60} style={{ margin: '0 auto 20px', color: '#6B7280' }} />
        <h1 style={{ 
          fontSize: 'clamp(24px, 5vw, 28px)', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          padding: '0 15px'
        }}>
          Please Login First
        </h1>
        <p style={{ 
          color: '#6B7280', 
          marginBottom: '30px',
          padding: '0 15px',
          fontSize: 'clamp(14px, 4vw, 16px)'
        }}>
          You need to login to view your shopping cart.
        </p>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          fontSize: 'clamp(14px, 4vw, 16px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        >
          <ArrowLeft size={20} />
          Go to Home
        </Link>
      </div>
    );
  }

  if (cartCount === 0) {
    return (
      <div style={{ 
        padding: '80px 20px', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto',
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ShoppingBag size={60} style={{ margin: '0 auto 20px', color: '#6B7280' }} />
        <h1 style={{ 
          fontSize: 'clamp(24px, 5vw, 28px)', 
          fontWeight: 'bold', 
          marginBottom: '16px',
          padding: '0 15px'
        }}>
          Your Cart is Empty
        </h1>
        <p style={{ 
          color: '#6B7280', 
          marginBottom: '30px',
          padding: '0 15px',
          fontSize: 'clamp(14px, 4vw, 16px)'
        }}>
          Add some products to your cart and they will appear here.
        </p>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          transition: 'all 0.3s ease',
          fontSize: 'clamp(14px, 4vw, 16px)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(124, 58, 237, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        >
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  const getGenderColor = (gender?: string) => {
    switch(gender) {
      case 'men': return '#3B82F6';
      case 'women': return '#EC4899';
      case 'kids': return '#10B981';
      case 'newborn': return '#F59E0B';
      default: return '#8B5CF6';
    }
  };

  return (
    <div style={{ 
      padding: 'clamp(20px, 4vw, 40px) clamp(15px, 3vw, 20px)', 
      maxWidth: '1200px', 
      margin: '0 auto', 
      minHeight: '70vh',
      background: isClient ? 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)' : '#F8FAFC'
    }}>
      <div style={{ marginBottom: 'clamp(20px, 4vw, 30px)' }}>
        <h1 style={{ 
          fontSize: 'clamp(24px, 5vw, 32px)', 
          fontWeight: 'bold', 
          marginBottom: '8px',
          paddingLeft: '10px'
        }}>
          🛒 Shopping Cart
        </h1>
        <p style={{ 
          color: '#6B7280',
          paddingLeft: '10px',
          fontSize: 'clamp(14px, 4vw, 16px)'
        }}>
          {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {/* Mobile responsive grid layout */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr',
        gap: '30px',
        // Media query for larger screens
        ...(typeof window !== 'undefined' && window.innerWidth >= 768 ? {
          gridTemplateColumns: '1fr 350px',
          gap: '40px'
        } : {})
      }}>
        {/* Cart Items */}
        <div>
          {cartItems.map((item, index) => (
            <div 
              key={item.id} 
              style={{
                background: index % 2 === 0 ? '#FFFFFF' : '#F9FAFB',
                borderRadius: '12px',
                padding: 'clamp(15px, 3vw, 20px)',
                marginBottom: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                // Media query for larger screens
                ...(typeof window !== 'undefined' && window.innerWidth >= 640 ? {
                  flexDirection: 'row',
                  alignItems: 'center'
                } : {}),
                alignItems: 'flex-start',
                transition: 'all 0.4s ease',
                borderLeft: `5px solid ${getGenderColor(item.gender)}`,
                border: '1px solid #E5E7EB',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.12)';
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = getGenderColor(item.gender);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#E5E7EB';
              }}
            >
              {/* Gender Badge */}
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                background: getGenderColor(item.gender),
                color: 'white',
                fontSize: '10px',
                fontWeight: 'bold',
                padding: '4px 10px',
                borderRadius: '20px',
                zIndex: 2
              }}>
                {item.gender?.toUpperCase() || 'PRODUCT'}
              </div>

              {/* Product Image and Info Container */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '20px',
                width: '100%',
                alignItems: 'flex-start'
              }}>
                {/* Product Image */}
                <div style={{
                  width: 'clamp(80px, 20vw, 100px)',
                  height: 'clamp(80px, 20vw, 100px)',
                  minWidth: '80px',
                  background: '#F3F4F6',
                  borderRadius: '10px',
                  backgroundImage: `url(${item.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  border: '2px solid #E5E7EB',
                  transition: 'all 0.3s ease',
                  flexShrink: 0
                }} 
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.borderColor = getGenderColor(item.gender);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.borderColor = '#E5E7EB';
                }}
                />
                
                {/* Product Info */}
                <div style={{ 
                  flex: 1,
                  width: '100%'
                }}>
                  <h3 style={{ 
                    fontSize: 'clamp(16px, 4vw, 18px)', 
                    fontWeight: 'bold', 
                    marginBottom: '4px', 
                    color: '#1F2937',
                    lineHeight: '1.4'
                  }}>
                    {item.name}
                  </h3>
                  <p style={{ 
                    color: '#6B7280', 
                    fontSize: 'clamp(12px, 3vw, 14px)', 
                    marginBottom: '12px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{
                      background: '#F3F4F6',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: 'clamp(10px, 2.5vw, 12px)',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.category}
                    </span>
                    <span>•</span>
                    <span style={{ fontWeight: '500', whiteSpace: 'nowrap' }}>
                      ${item.price.toFixed(2)} each
                    </span>
                  </p>
                </div>
              </div>

              {/* Quantity Controls and Actions Container */}
              <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                gap: '20px',
                flexWrap: 'wrap'
              }}>
                {/* Quantity Controls */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  background: '#F9FAFB',
                  padding: '8px 16px',
                  borderRadius: '30px',
                  border: '1px solid #E5E7EB'
                }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    style={{
                      width: 'clamp(28px, 7vw, 32px)',
                      height: 'clamp(28px, 7vw, 32px)',
                      borderRadius: '50%',
                      border: '1px solid #D1D5DB',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = getGenderColor(item.gender);
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = getGenderColor(item.gender);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = 'inherit';
                      e.currentTarget.style.borderColor = '#D1D5DB';
                    }}
                  >
                    <Minus size={16} />
                  </button>
                  
                  <span style={{ 
                    fontSize: 'clamp(14px, 3.5vw, 16px)', 
                    fontWeight: '600', 
                    minWidth: '30px', 
                    textAlign: 'center',
                    color: '#1F2937'
                  }}>
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    style={{
                      width: 'clamp(28px, 7vw, 32px)',
                      height: 'clamp(28px, 7vw, 32px)',
                      borderRadius: '50%',
                      border: '1px solid #D1D5DB',
                      background: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = getGenderColor(item.gender);
                      e.currentTarget.style.color = 'white';
                      e.currentTarget.style.borderColor = getGenderColor(item.gender);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = 'inherit';
                      e.currentTarget.style.borderColor = '#D1D5DB';
                    }}
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                {/* Price and Remove Button Container */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  flexWrap: 'wrap'
                }}>
                  {/* Price */}
                  <div style={{ 
                    fontSize: 'clamp(18px, 4.5vw, 20px)', 
                    fontWeight: 'bold', 
                    color: '#1F2937',
                    background: 'linear-gradient(135deg, #10B981, #3B82F6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                    <div style={{ 
                      fontSize: 'clamp(10px, 2.5vw, 12px)', 
                      color: '#6B7280', 
                      fontWeight: 'normal' 
                    }}>
                      Total
                    </div>
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => {
                      if (window.confirm(`Remove "${item.name}" from cart?`)) {
                        removeFromCart(item.id);
                      }
                    }}
                    style={{
                      padding: '10px',
                      borderRadius: '10px',
                      border: 'none',
                      background: '#FEF2F2',
                      color: '#EF4444',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#FEE2E2';
                      e.currentTarget.style.transform = 'rotate(15deg) scale(1.2)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(239, 68, 68, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#FEF2F2';
                      e.currentTarget.style.transform = 'rotate(0) scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Trash2 size={22} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Clear Cart Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px'
          }}>
            <button
              onClick={() => {
                if (window.confirm('Clear all items from cart?')) {
                  clearCart();
                }
              }}
              style={{
                padding: 'clamp(12px, 3vw, 14px) clamp(20px, 4vw, 28px)',
                borderRadius: '10px',
                border: '2px solid #EF4444',
                background: 'white',
                color: '#EF4444',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: 'clamp(14px, 3.5vw, 16px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FEF2F2';
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Trash2 size={18} />
              Clear All Items
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAFB 100%)',
          borderRadius: '15px',
          padding: 'clamp(20px, 4vw, 28px)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
          height: 'fit-content',
          position: 'sticky',
          top: '20px',
          border: '1px solid #E5E7EB',
          order: -1, // Mobile mein summary pehle aayega
          // Media query for larger screens
          ...(typeof window !== 'undefined' && window.innerWidth >= 768 ? {
            order: 0, // Desktop mein original order
            top: '100px'
          } : {})
        }}>
          <h2 style={{ 
            fontSize: 'clamp(20px, 4.5vw, 22px)', 
            fontWeight: 'bold', 
            marginBottom: '24px', 
            color: '#1F2937' 
          }}>
            📋 Order Summary
          </h2>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '15px',
              paddingBottom: '12px',
              borderBottom: '1px dashed #E5E7EB'
            }}>
              <span style={{ 
                color: '#6B7280', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: 'clamp(14px, 3.5vw, 16px)'
              }}>
                <span style={{ fontSize: 'clamp(16px, 4vw, 18px)' }}>🛒</span> 
                <span>Subtotal ({cartCount} items)</span>
              </span>
              <span style={{ 
                fontWeight: '600', 
                fontSize: 'clamp(15px, 3.8vw, 17px)'
              }}>
                ${cartTotal.toFixed(2)}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '15px',
              paddingBottom: '12px',
              borderBottom: '1px dashed #E5E7EB'
            }}>
              <span style={{ 
                color: '#6B7280', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '8px',
                fontSize: 'clamp(14px, 3.5vw, 16px)'
              }}>
                <span style={{ fontSize: 'clamp(16px, 4vw, 18px)' }}>🚚</span> 
                <span>Shipping</span>
              </span>
              <span style={{ 
                fontWeight: '600', 
                color: '#10B981',
                fontSize: 'clamp(14px, 3.5vw, 16px)'
              }}>
                FREE
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '25px', 
              paddingTop: '15px', 
              borderTop: '2px solid #E5E7EB',
              background: '#F9FAFB',
              padding: '15px',
              borderRadius: '10px'
            }}>
              <span style={{ 
                fontWeight: 'bold', 
                fontSize: 'clamp(16px, 4vw, 18px)', 
                color: '#1F2937' 
              }}>
                Total Amount
              </span>
              <span style={{ 
                fontSize: 'clamp(22px, 5.5vw, 28px)', 
                fontWeight: 'bold', 
                color: '#1F2937' 
              }}>
                ${cartTotal.toFixed(2)}
              </span>
            </div>
          </div>
          
          {/* Proceed to Checkout Button */}
          <Link 
            href="/checkout" 
            style={{
              width: '100%',
              padding: 'clamp(16px, 4vw, 18px)',
              background: 'linear-gradient(135deg, #7C3AED, #EC4899)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: 'clamp(15px, 3.8vw, 17px)',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              marginBottom: '15px',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 12px 30px rgba(124, 58, 237, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>
              💳 Proceed to Checkout
            </span>
          </Link>
          
          <Link href="/" style={{
            display: 'block',
            textAlign: 'center',
            color: '#6B7280',
            textDecoration: 'none',
            fontSize: 'clamp(14px, 3.5vw, 15px)',
            padding: 'clamp(12px, 3vw, 14px)',
            border: '2px solid #E5E7EB',
            borderRadius: '10px',
            transition: 'all 0.3s ease',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F9FAFB';
            e.currentTarget.style.color = '#374151';
            e.currentTarget.style.borderColor = '#D1D5DB';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#6B7280';
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
          >
            ← Continue Shopping
          </Link>

          {/* Security Badge */}
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#F0F9FF',
            borderRadius: '10px',
            border: '1px solid #BAE6FD',
            textAlign: 'center'
          }}>
            <div style={{ 
              fontSize: 'clamp(12px, 3vw, 14px)', 
              color: '#0C4A6E', 
              marginBottom: '5px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '6px' 
            }}>
              <span>🔒</span> Secure Checkout
            </div>
            <div style={{ 
              fontSize: 'clamp(10px, 2.5vw, 12px)', 
              color: '#6B7280' 
            }}>
              Your payment information is encrypted and secure
            </div>
          </div>
        </div>
      </div>

      {/* Responsive CSS Media Queries */}
      <style jsx global>{`
        @media (max-width: 767px) {
          /* Mobile specific adjustments */
          .cart-item {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          
          /* Improve touch targets for mobile */
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Adjust font sizes for better readability */
          h1, h2, h3 {
            word-wrap: break-word;
            overflow-wrap: break-word;
          }
          
          /* Prevent horizontal scrolling */
          body {
            overflow-x: hidden;
          }
        }
        
        @media (max-width: 639px) {
          /* Small mobile adjustments */
          .cart-item-content {
            flex-direction: column !important;
          }
          
          .quantity-controls {
            width: 100%;
            justify-content: center;
            margin-bottom: 15px;
          }
          
          .price-remove-container {
            width: 100%;
            justify-content: space-between;
          }
        }
        
        @media (min-width: 768px) and (max-width: 1023px) {
          /* Tablet adjustments */
          .cart-grid {
            gap: 30px !important;
          }
          
          .order-summary {
            width: 300px !important;
          }
        }
        
        /* Improve touch feedback for mobile */
        @media (hover: none) and (pointer: coarse) {
          button:active, 
          a:active {
            opacity: 0.7;
            transform: scale(0.98);
          }
          
          .cart-item:active {
            transform: scale(0.99) !important;
          }
        }
      `}</style>
    </div>
  );
}