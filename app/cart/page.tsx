// app/cart/page.tsx
"use client";

import { useCart } from '@/components/providers/CartProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, cartCount, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={{ 
        padding: '80px 20px', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <ShoppingCart size={60} style={{ margin: '0 auto 20px', color: '#6B7280' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
          Please Login First
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '30px' }}>
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
          transition: 'all 0.3s ease'
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
        margin: '0 auto'
      }}>
        <ShoppingBag size={60} style={{ margin: '0 auto 20px', color: '#6B7280' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
          Your Cart is Empty
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '30px' }}>
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
          transition: 'all 0.3s ease'
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

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '70vh' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px' }}>
          Shopping Cart
        </h1>
        <p style={{ color: '#6B7280' }}>
          {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
        {/* Cart Items */}
        <div>
          {cartItems.map((item) => (
            <div key={item.id} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              {/* Product Image */}
              <div style={{
                width: '100px',
                height: '100px',
                background: '#F3F4F6',
                borderRadius: '8px',
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }} />
              
              {/* Product Info */}
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px' }}>
                  {item.name}
                </h3>
                <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>
                  {item.category} • {item.gender}
                </p>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid #D1D5DB',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#F3F4F6';
                        e.currentTarget.style.borderColor = '#9CA3AF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderColor = '#D1D5DB';
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span style={{ fontSize: '16px', fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        border: '1px solid #D1D5DB',
                        background: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#F3F4F6';
                        e.currentTarget.style.borderColor = '#9CA3AF';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.borderColor = '#D1D5DB';
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  {/* Price */}
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
              
              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#FEF2F2',
                  color: '#EF4444',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#FEE2E2';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#FEF2F2';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}
          
          {/* Clear Cart Button */}
          <button
            onClick={clearCart}
            style={{
              padding: '12px 24px',
              borderRadius: '8px',
              border: '1px solid #EF4444',
              background: 'white',
              color: '#EF4444',
              fontWeight: '600',
              cursor: 'pointer',
              marginTop: '10px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FEF2F2';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            Clear All Items
          </button>
        </div>

        {/* Order Summary */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          height: 'fit-content',
          position: 'sticky',
          top: '100px'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>
            Order Summary
          </h2>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#6B7280' }}>Subtotal</span>
              <span style={{ fontWeight: '500' }}>${cartTotal.toFixed(2)}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ color: '#6B7280' }}>Shipping</span>
              <span style={{ fontWeight: '500', color: '#10B981' }}>FREE</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
              <span style={{ fontWeight: '600' }}>Total</span>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937' }}>
                ${cartTotal.toFixed(2)}
              </span>
            </div>
          </div>
          
          {/* ✅ UPDATED: Proceed to Checkout Button with Link */}
          <Link 
            href="/checkout" 
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              marginBottom: '12px',
              textDecoration: 'none',
              display: 'block',
              textAlign: 'center'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Proceed to Checkout
          </Link>
          
          <Link href="/" style={{
            display: 'block',
            textAlign: 'center',
            color: '#6B7280',
            textDecoration: 'none',
            fontSize: '14px',
            padding: '12px',
            border: '1px solid #E5E7EB',
            borderRadius: '8px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#F9FAFB';
            e.currentTarget.style.color = '#374151';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#6B7280';
          }}
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}