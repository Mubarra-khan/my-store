// app/checkout/page.tsx
"use client";

import { useState } from 'react';
import { useCart } from '@/components/providers/CartProvider';
import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Truck, Shield, Lock, Wallet, Banknote, Smartphone } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: ''
  });

  // ✅ FUNCTION DECLARATIONS MOVED TO TOP
  const getPaymentMethodText = (method: string) => {
    switch(method) {
      case 'cod': return 'Cash on Delivery';
      case 'card': return 'Credit/Debit Card';
      case 'wallet': return 'Digital Wallet';
      case 'bank': return 'Bank Transfer';
      default: return 'Cash on Delivery';
    }
  };

  const getPaymentIcon = (method: string) => {
    switch(method) {
      case 'cod': return <Banknote size={18} />;
      case 'card': return <CreditCard size={18} />;
      case 'wallet': return <Wallet size={18} />;
      case 'bank': return <Smartphone size={18} />;
      default: return <Banknote size={18} />;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      alert('Please fill all required fields correctly.');
      return;
    }

    setIsProcessing(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate random order number
    const newOrderNumber = `ORD-${Date.now().toString().slice(-8)}`;
    setOrderNumber(newOrderNumber);
    setIsOrderPlaced(true);
    setIsProcessing(false);
    clearCart();

    // Store order in localStorage
    const order = {
      orderNumber: newOrderNumber,
      items: cartItems,
      total: cartTotal,
      date: new Date().toISOString(),
      customer: formData,
      paymentMethod: paymentMethod
    };
    localStorage.setItem('lastOrder', JSON.stringify(order));
  };

  const validateForm = () => {
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'zipCode'];
    for (const field of required) {
      if (!formData[field as keyof typeof formData]) {
        return false;
      }
    }
    return true;
  };

  if (!user) {
    return (
      <div style={{ 
        padding: '60px 16px', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <Lock size={60} style={{ margin: '0 auto 20px', color: '#6B7280' }} />
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 28px)', fontWeight: 'bold', marginBottom: '16px' }}>
          Please Login First
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '30px', fontSize: 'clamp(14px, 3vw, 16px)' }}>
          You need to login to proceed with checkout.
        </p>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: 'clamp(14px, 3vw, 16px)',
          width: '100%',
          maxWidth: '200px',
          margin: '0 auto'
        }}>
          <ArrowLeft size={20} />
          Go to Home
        </Link>
      </div>
    );
  }

  if (cartItems.length === 0 && !isOrderPlaced) {
    return (
      <div style={{ 
        padding: '60px 16px', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <CreditCard size={60} style={{ margin: '0 auto 20px', color: '#6B7280' }} />
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 28px)', fontWeight: 'bold', marginBottom: '16px' }}>
          Your Cart is Empty
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '30px', fontSize: 'clamp(14px, 3vw, 16px)' }}>
          Add some products to your cart before checkout.
        </p>
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: 'clamp(14px, 3vw, 16px)',
          width: '100%',
          maxWidth: '250px',
          margin: '0 auto'
        }}>
          <ArrowLeft size={20} />
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (isOrderPlaced) {
    return (
      <div style={{ 
        padding: '40px 16px', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: '#10B981',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          color: 'white'
        }}>
          <Shield size={40} />
        </div>
        
        <h1 style={{ 
          fontSize: 'clamp(24px, 5vw, 32px)', 
          fontWeight: 'bold', 
          marginBottom: '16px', 
          color: '#10B981' 
        }}>
          Order Placed Successfully!
        </h1>
        
        <p style={{ fontSize: 'clamp(16px, 3vw, 18px)', marginBottom: '8px' }}>
          Order Number: <strong>{orderNumber}</strong>
        </p>
        
        <p style={{ 
          color: '#6B7280', 
          marginBottom: '24px',
          fontSize: 'clamp(14px, 3vw, 16px)'
        }}>
          Thank you for your purchase! You will receive a confirmation email shortly.
        </p>
        
        <div style={{ 
          background: '#F3F4F6', 
          padding: '20px', 
          borderRadius: '12px',
          marginBottom: '30px',
          textAlign: 'left'
        }}>
          <h3 style={{ 
            fontSize: 'clamp(16px, 3.5vw, 18px)', 
            fontWeight: 'bold', 
            marginBottom: '12px' 
          }}>
            Order Summary:
          </h3>
          <p style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>
            Total Amount: <strong>${cartTotal.toFixed(2)}</strong>
          </p>
          <p style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>
            Items: {cartItems.length}
          </p>
          <p style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>
            Payment Method: {getPaymentMethodText(paymentMethod)}
          </p>
          <p style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>
            Shipping to: {formData.address}, {formData.city}
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '12px'
        }}>
          <Link href="/" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: 'clamp(14px, 3vw, 16px)',
            width: '100%'
          }}>
            <ArrowLeft size={20} />
            Continue Shopping
          </Link>
          
          <Link href="/orders" style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: '#3B82F6',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: 'clamp(14px, 3vw, 16px)',
            width: '100%'
          }}>
            <Truck size={20} />
            Track Order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '20px 16px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Progress Steps - Mobile Responsive */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '30px', 
        position: 'relative',
        padding: '0 10px'
      }}>
        <div style={{ textAlign: 'center', zIndex: 2, flex: 1 }}>
          <div style={{
            width: 'clamp(30px, 8vw, 40px)',
            height: 'clamp(30px, 8vw, 40px)',
            background: '#7C3AED',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            margin: '0 auto 8px',
            fontWeight: 'bold',
            fontSize: 'clamp(14px, 3vw, 16px)'
          }}>
            1
          </div>
          <span style={{ 
            fontSize: 'clamp(12px, 2.5vw, 14px)', 
            fontWeight: '600',
            display: 'block',
            whiteSpace: 'nowrap'
          }}>
            Cart
          </span>
        </div>
        
        <div style={{ textAlign: 'center', zIndex: 2, flex: 1 }}>
          <div style={{
            width: 'clamp(30px, 8vw, 40px)',
            height: 'clamp(30px, 8vw, 40px)',
            background: '#7C3AED',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            margin: '0 auto 8px',
            fontWeight: 'bold',
            fontSize: 'clamp(14px, 3vw, 16px)'
          }}>
            2
          </div>
          <span style={{ 
            fontSize: 'clamp(12px, 2.5vw, 14px)', 
            fontWeight: '600',
            display: 'block',
            whiteSpace: 'nowrap'
          }}>
            Checkout
          </span>
        </div>
        
        <div style={{ textAlign: 'center', zIndex: 2, flex: 1 }}>
          <div style={{
            width: 'clamp(30px, 8vw, 40px)',
            height: 'clamp(30px, 8vw, 40px)',
            background: '#E5E7EB',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#6B7280',
            margin: '0 auto 8px',
            fontWeight: 'bold',
            fontSize: 'clamp(14px, 3vw, 16px)'
          }}>
            3
          </div>
          <span style={{ 
            fontSize: 'clamp(12px, 2.5vw, 14px)', 
            color: '#6B7280',
            display: 'block',
            whiteSpace: 'nowrap'
          }}>
            Confirmation
          </span>
        </div>
        
        {/* Progress Line */}
        <div style={{
          position: 'absolute',
          top: 'clamp(15px, 4vw, 20px)',
          left: '15%',
          right: '15%',
          height: '3px',
          background: '#E5E7EB',
          zIndex: 1
        }} />
        <div style={{
          position: 'absolute',
          top: 'clamp(15px, 4vw, 20px)',
          left: '15%',
          width: '40%',
          height: '3px',
          background: '#7C3AED',
          zIndex: 1
        }} />
      </div>

      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '30px'
      }}>
        {/* Left Column - Forms */}
        <div style={{ 
          flex: 1
        }}>
          {/* Contact Information */}
          <div style={{ 
            background: 'white', 
            borderRadius: '12px', 
            padding: 'clamp(16px, 4vw, 24px)', 
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(18px, 4vw, 20px)', 
              fontWeight: 'bold', 
              marginBottom: '20px' 
            }}>
              Contact Information
            </h2>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ 
                display: 'grid', 
                gap: '16px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: 'clamp(13px, 2.5vw, 14px)', 
                    fontWeight: '500' 
                  }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: 'clamp(14px, 3vw, 16px)',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: 'clamp(13px, 2.5vw, 14px)', 
                    fontWeight: '500' 
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: 'clamp(14px, 3vw, 16px)',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: 'clamp(13px, 2.5vw, 14px)', 
                  fontWeight: '500' 
                }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div style={{ 
            background: 'white', 
            borderRadius: '12px', 
            padding: 'clamp(16px, 4vw, 24px)', 
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(18px, 4vw, 20px)', 
              fontWeight: 'bold', 
              marginBottom: '20px' 
            }}>
              Shipping Address
            </h2>
            
            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontSize: 'clamp(13px, 2.5vw, 14px)', 
                  fontWeight: '500' 
                }}>
                  Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    fontSize: 'clamp(14px, 3vw, 16px)',
                    boxSizing: 'border-box'
                  }}
                  required
                />
              </div>
              
              <div style={{ 
                display: 'grid', 
                gap: '16px'
              }}>
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: 'clamp(13px, 2.5vw, 14px)', 
                    fontWeight: '500' 
                  }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: 'clamp(14px, 3vw, 16px)',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
                
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px', 
                    fontSize: 'clamp(13px, 2.5vw, 14px)', 
                    fontWeight: '500' 
                  }}>
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '8px',
                      fontSize: 'clamp(14px, 3vw, 16px)',
                      boxSizing: 'border-box'
                    }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div style={{ 
            background: 'white', 
            borderRadius: '12px', 
            padding: 'clamp(16px, 4vw, 24px)', 
            marginBottom: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(18px, 4vw, 20px)', 
              fontWeight: 'bold', 
              marginBottom: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px' 
            }}>
              <CreditCard size={20} />
              Payment Method
            </h2>
            
            <div style={{ display: 'grid', gap: '12px' }}>
              {/* Cash on Delivery */}
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  border: paymentMethod === 'cod' ? '2px solid #7C3AED' : '1px solid #D1D5DB',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: paymentMethod === 'cod' ? '#F5F3FF' : 'white'
                }}
                onClick={() => setPaymentMethod('cod')}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  style={{ width: '20px', height: '20px', minWidth: '20px' }}
                />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Banknote size={24} color={paymentMethod === 'cod' ? '#7C3AED' : '#6B7280'} />
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <span style={{ 
                        fontWeight: '600',
                        fontSize: 'clamp(14px, 3vw, 16px)'
                      }}>
                        Cash on Delivery
                      </span>
                      <span style={{ 
                        fontSize: 'clamp(12px, 2.5vw, 14px)', 
                        color: '#6B7280' 
                      }}>
                        Pay when you receive
                      </span>
                    </div>
                    <p style={{ 
                      color: '#6B7280', 
                      fontSize: 'clamp(12px, 2.5vw, 14px)', 
                      marginTop: '4px',
                      display: 'none'
                    }}>
                      Pay with cash when your order is delivered
                    </p>
                  </div>
                </div>
              </label>

              {/* Credit/Debit Card */}
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  border: paymentMethod === 'card' ? '2px solid #7C3AED' : '1px solid #D1D5DB',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: paymentMethod === 'card' ? '#F5F3FF' : 'white'
                }}
                onClick={() => setPaymentMethod('card')}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  style={{ width: '20px', height: '20px', minWidth: '20px' }}
                />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <CreditCard size={24} color={paymentMethod === 'card' ? '#7C3AED' : '#6B7280'} />
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <span style={{ 
                        fontWeight: '600',
                        fontSize: 'clamp(14px, 3vw, 16px)'
                      }}>
                        Credit/Debit Card
                      </span>
                      <span style={{ 
                        fontSize: 'clamp(12px, 2.5vw, 14px)', 
                        color: '#6B7280' 
                      }}>
                        Visa, MasterCard, etc.
                      </span>
                    </div>
                    <p style={{ 
                      color: '#6B7280', 
                      fontSize: 'clamp(12px, 2.5vw, 14px)', 
                      marginTop: '4px',
                      display: 'none'
                    }}>
                      Pay securely with your card
                    </p>
                  </div>
                </div>
              </label>

              {/* Digital Wallet */}
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  border: paymentMethod === 'wallet' ? '2px solid #7C3AED' : '1px solid #D1D5DB',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: paymentMethod === 'wallet' ? '#F5F3FF' : 'white'
                }}
                onClick={() => setPaymentMethod('wallet')}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="wallet"
                  checked={paymentMethod === 'wallet'}
                  onChange={() => setPaymentMethod('wallet')}
                  style={{ width: '20px', height: '20px', minWidth: '20px' }}
                />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Wallet size={24} color={paymentMethod === 'wallet' ? '#7C3AED' : '#6B7280'} />
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <span style={{ 
                        fontWeight: '600',
                        fontSize: 'clamp(14px, 3vw, 16px)'
                      }}>
                        Digital Wallet
                      </span>
                      <span style={{ 
                        fontSize: 'clamp(12px, 2.5vw, 14px)', 
                        color: '#6B7280' 
                      }}>
                        EasyPaisa, JazzCash, etc.
                      </span>
                    </div>
                    <p style={{ 
                      color: '#6B7280', 
                      fontSize: 'clamp(12px, 2.5vw, 14px)', 
                      marginTop: '4px',
                      display: 'none'
                    }}>
                      Pay via mobile wallet
                    </p>
                  </div>
                </div>
              </label>

              {/* Bank Transfer */}
              <label 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px',
                  border: paymentMethod === 'bank' ? '2px solid #7C3AED' : '1px solid #D1D5DB',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: paymentMethod === 'bank' ? '#F5F3FF' : 'white'
                }}
                onClick={() => setPaymentMethod('bank')}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === 'bank'}
                  onChange={() => setPaymentMethod('bank')}
                  style={{ width: '20px', height: '20px', minWidth: '20px' }}
                />
                <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Smartphone size={24} color={paymentMethod === 'bank' ? '#7C3AED' : '#6B7280'} />
                  <div style={{ width: '100%' }}>
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <span style={{ 
                        fontWeight: '600',
                        fontSize: 'clamp(14px, 3vw, 16px)'
                      }}>
                        Bank Transfer
                      </span>
                      <span style={{ 
                        fontSize: 'clamp(12px, 2.5vw, 14px)', 
                        color: '#6B7280' 
                      }}>
                        Direct bank transfer
                      </span>
                    </div>
                    <p style={{ 
                      color: '#6B7280', 
                      fontSize: 'clamp(12px, 2.5vw, 14px)', 
                      marginTop: '4px',
                      display: 'none'
                    }}>
                      Transfer directly to our bank account
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div style={{ 
          width: '100%'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: 'clamp(16px, 4vw, 24px)',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: '20px'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(18px, 4vw, 20px)', 
              fontWeight: 'bold', 
              marginBottom: '20px' 
            }}>
              Order Summary
            </h2>
            
            {/* Order Items */}
            <div style={{ 
              marginBottom: '20px', 
              maxHeight: '200px', 
              overflowY: 'auto'
            }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #F3F4F6'
                }}>
                  <div style={{ flex: 1, paddingRight: '12px' }}>
                    <p style={{ 
                      fontSize: 'clamp(13px, 2.5vw, 14px)', 
                      fontWeight: '500', 
                      marginBottom: '4px',
                      wordBreak: 'break-word'
                    }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: 'clamp(11px, 2vw, 12px)', color: '#6B7280' }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <div style={{ 
                    fontSize: 'clamp(14px, 3vw, 16px)', 
                    fontWeight: '600',
                    minWidth: '60px',
                    textAlign: 'right'
                  }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Order Totals */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '12px' 
              }}>
                <span style={{ 
                  color: '#6B7280',
                  fontSize: 'clamp(14px, 3vw, 16px)'
                }}>
                  Subtotal
                </span>
                <span style={{ 
                  fontWeight: '500',
                  fontSize: 'clamp(14px, 3vw, 16px)'
                }}>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '12px' 
              }}>
                <span style={{ 
                  color: '#6B7280',
                  fontSize: 'clamp(14px, 3vw, 16px)'
                }}>
                  Shipping
                </span>
                <span style={{ 
                  fontWeight: '500', 
                  color: '#10B981',
                  fontSize: 'clamp(14px, 3vw, 16px)'
                }}>
                  FREE
                </span>
              </div>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '20px', 
                paddingTop: '12px', 
                borderTop: '1px solid #E5E7EB' 
              }}>
                <span style={{ 
                  fontWeight: '600',
                  fontSize: 'clamp(16px, 3.5vw, 18px)'
                }}>
                  Total
                </span>
                <span style={{ 
                  fontSize: 'clamp(18px, 4vw, 24px)', 
                  fontWeight: 'bold', 
                  color: '#1F2937' 
                }}>
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>
            
            {/* Card Details Form (Visible only when card payment selected) */}
            {paymentMethod === 'card' && (
              <div style={{ 
                background: '#F9FAFB', 
                borderRadius: '12px', 
                padding: '20px', 
                marginBottom: '20px',
                border: '1px solid #E5E7EB'
              }}>
                <h3 style={{ 
                  fontSize: 'clamp(16px, 3.5vw, 18px)', 
                  fontWeight: 'bold', 
                  marginBottom: '16px' 
                }}>
                  Card Details
                </h3>
                
                <div style={{ display: 'grid', gap: '12px' }}>
                  {/* Card Number */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: 'clamp(13px, 2.5vw, 14px)', 
                      fontWeight: '500' 
                    }}>
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        background: 'white',
                        boxSizing: 'border-box'
                      }}
                      onInput={(e) => {
                        // Format card number with spaces
                        const target = e.target as HTMLInputElement;
                        let value = target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
                        if (value.length > 16) value = value.substring(0, 16);
                        
                        const parts = [];
                        for (let i = 0; i < value.length; i += 4) {
                          parts.push(value.substring(i, i + 4));
                        }
                        target.value = parts.join(' ');
                        setFormData(prev => ({ ...prev, cardNumber: target.value }));
                      }}
                    />
                    <p style={{ 
                      fontSize: 'clamp(11px, 2vw, 12px)', 
                      color: '#6B7280', 
                      marginTop: '4px' 
                    }}>
                      Enter 16-digit card number
                    </p>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr',
                    gap: '12px'
                  }}>
                    {/* Expiry Date */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontSize: 'clamp(13px, 2.5vw, 14px)', 
                        fontWeight: '500' 
                      }}>
                        Expiry Date (MM/YY) *
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength={5}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #D1D5DB',
                          borderRadius: '8px',
                          fontSize: 'clamp(14px, 3vw, 16px)',
                          background: 'white',
                          boxSizing: 'border-box'
                        }}
                        onInput={(e) => {
                          // Format expiry date
                          const target = e.target as HTMLInputElement;
                          let value = target.value.replace(/[^0-9]/g, '');
                          if (value.length >= 2) {
                            value = value.substring(0, 2) + '/' + value.substring(2, 4);
                          }
                          if (value.length > 5) value = value.substring(0, 5);
                          target.value = value;
                          setFormData(prev => ({ ...prev, cardExpiry: target.value }));
                        }}
                      />
                    </div>
                    
                    {/* CVC */}
                    <div>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '8px', 
                        fontSize: 'clamp(13px, 2.5vw, 14px)', 
                        fontWeight: '500' 
                      }}>
                        CVC *
                      </label>
                      <input
                        type="text"
                        name="cardCVC"
                        value={formData.cardCVC}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength={3}
                        style={{
                          width: '100%',
                          padding: '12px',
                          border: '1px solid #D1D5DB',
                          borderRadius: '8px',
                          fontSize: 'clamp(14px, 3vw, 16px)',
                          background: 'white',
                          boxSizing: 'border-box'
                        }}
                        onInput={(e) => {
                          // Allow only numbers
                          const target = e.target as HTMLInputElement;
                          target.value = target.value.replace(/[^0-9]/g, '').substring(0, 3);
                          setFormData(prev => ({ ...prev, cardCVC: target.value }));
                        }}
                      />
                      <p style={{ 
                        fontSize: 'clamp(11px, 2vw, 12px)', 
                        color: '#6B7280', 
                        marginTop: '4px' 
                      }}>
                        3-digit security code
                      </p>
                    </div>
                  </div>
                  
                  {/* Card Name */}
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '8px', 
                      fontSize: 'clamp(13px, 2.5vw, 14px)', 
                      fontWeight: '500' 
                    }}>
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      placeholder="John Doe"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #D1D5DB',
                        borderRadius: '8px',
                        fontSize: 'clamp(14px, 3vw, 16px)',
                        background: 'white',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                  
                  {/* Dummy Card Info */}
                  <div style={{ 
                    background: '#F0F9FF', 
                    padding: '12px', 
                    borderRadius: '8px',
                    border: '1px solid #BAE6FD',
                    fontSize: 'clamp(12px, 2.5vw, 13px)',
                    color: '#0369A1'
                  }}>
                    <p style={{ margin: 0, fontWeight: '500' }}>💳 Test Card Details:</p>
                    <p style={{ margin: '4px 0 0 0' }}>
                      <strong>Card:</strong> 4242 4242 4242 4242
                    </p>
                    <p style={{ margin: '2px 0 0 0' }}>
                      <strong>Expiry:</strong> 12/34 &nbsp; <strong>CVC:</strong> 123
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: 'clamp(11px, 2vw, 12px)' }}>
                      Use these dummy details for testing. No real transaction will occur.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Digital Wallet Info */}
            {paymentMethod === 'wallet' && (
              <div style={{ 
                background: '#F0F9FF', 
                borderRadius: '12px', 
                padding: '16px', 
                marginBottom: '20px',
                border: '1px solid #BAE6FD'
              }}>
                <h3 style={{ 
                  fontSize: 'clamp(16px, 3.5vw, 18px)', 
                  fontWeight: 'bold', 
                  marginBottom: '12px', 
                  color: '#0369A1' 
                }}>
                  Digital Wallet Instructions
                </h3>
                <p style={{ 
                  color: '#0369A1', 
                  marginBottom: '8px',
                  fontSize: 'clamp(13px, 2.5vw, 14px)'
                }}>
                  After placing your order, you will receive payment instructions via SMS/email.
                </p>
                <div style={{ 
                  fontSize: 'clamp(12px, 2.5vw, 14px)', 
                  color: '#075985' 
                }}>
                  <p style={{ margin: '4px 0' }}><strong>EasyPaisa:</strong> Send to 0312-3456789 (John Doe)</p>
                  <p style={{ margin: '4px 0' }}><strong>JazzCash:</strong> Send to 0300-1234567 (Jane Smith)</p>
                </div>
              </div>
            )}

            {/* Bank Transfer Info */}
            {paymentMethod === 'bank' && (
              <div style={{ 
                background: '#F0F9FF', 
                borderRadius: '12px', 
                padding: '16px', 
                marginBottom: '20px',
                border: '1px solid #BAE6FD'
              }}>
                <h3 style={{ 
                  fontSize: 'clamp(16px, 3.5vw, 18px)', 
                  fontWeight: 'bold', 
                  marginBottom: '12px', 
                  color: '#0369A1' 
                }}>
                  Bank Transfer Details
                </h3>
                <div style={{ 
                  fontSize: 'clamp(12px, 2.5vw, 14px)', 
                  color: '#075985' 
                }}>
                  <p style={{ margin: '4px 0' }}><strong>Bank:</strong> Habib Bank Limited (HBL)</p>
                  <p style={{ margin: '4px 0' }}><strong>Account Title:</strong> StyleStore Online Shopping</p>
                  <p style={{ margin: '4px 0' }}><strong>Account Number:</strong> 1234-5678901-2</p>
                  <p style={{ margin: '4px 0' }}><strong>IBAN:</strong> PK36HABB0012345678901234</p>
                  <p style={{ margin: '4px 0' }}><strong>Branch Code:</strong> 1234</p>
                  <p style={{ 
                    marginTop: '12px', 
                    fontSize: 'clamp(11px, 2vw, 13px)' 
                  }}>
                    Please use your order number as payment reference.
                  </p>
                </div>
              </div>
            )}
            
            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: 'clamp(16px, 3.5vw, 18px)',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                opacity: isProcessing ? 0.7 : 1,
                boxSizing: 'border-box'
              }}
              onMouseEnter={(e) => {
                if (!isProcessing) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(124, 58, 237, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
            
            <p style={{ 
              fontSize: 'clamp(11px, 2vw, 12px)', 
              color: '#6B7280', 
              textAlign: 'center', 
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px'
            }}>
              <Shield size={14} />
              Your payment information is secure
            </p>
          </div>
          
          {/* Back to Cart */}
          <Link href="/cart" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            color: '#6B7280',
            textDecoration: 'none',
            fontSize: 'clamp(13px, 2.5vw, 14px)',
            padding: '12px',
            marginTop: '12px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#374151';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#6B7280';
          }}
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}