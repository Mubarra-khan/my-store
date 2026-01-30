// app/orders/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';
import { Package, Truck, CheckCircle, XCircle, Search, Clock, Home, ShoppingBag } from 'lucide-react';

export default function OrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [searchOrderId, setSearchOrderId] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  // Mock orders data
  const mockOrders = [
    {
      id: 'ORD-12345678',
      date: '2024-01-15',
      total: 129.99,
      status: 'delivered',
      items: [
        { name: 'Leather Jacket', quantity: 1, price: 129.99 }
      ],
      shippingAddress: '123 Main St, New York, NY 10001',
      estimatedDelivery: '2024-01-20'
    },
    {
      id: 'ORD-87654321',
      date: '2024-01-10',
      total: 299.99,
      status: 'shipped',
      items: [
        { name: 'Premium Suit', quantity: 1, price: 299.99 }
      ],
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
      estimatedDelivery: '2024-01-25'
    },
    {
      id: 'ORD-11223344',
      date: '2024-01-05',
      total: 84.98,
      status: 'processing',
      items: [
        { name: 'Cotton T-Shirt', quantity: 2, price: 24.99 },
        { name: 'Warm Hoodie', quantity: 1, price: 59.99 }
      ],
      shippingAddress: '789 Pine Rd, Chicago, IL 60007',
      estimatedDelivery: '2024-01-30'
    }
  ];

  useEffect(() => {
    // Load orders from localStorage or use mock data
    const savedOrders = localStorage.getItem('lastOrder');
    const allOrders = savedOrders ? [JSON.parse(savedOrders), ...mockOrders] : mockOrders;
    setOrders(allOrders);
  }, []);

  const handleSearch = () => {
    if (!searchOrderId.trim()) {
      alert('Please enter an order ID');
      return;
    }

    const foundOrder = orders.find(order => 
      order.id.toLowerCase().includes(searchOrderId.toLowerCase()) || 
      order.orderNumber?.toLowerCase().includes(searchOrderId.toLowerCase())
    );

    if (foundOrder) {
      setSearchResult(foundOrder);
    } else {
      setSearchResult(null);
      alert('Order not found. Please check your order ID.');
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'delivered':
        return <CheckCircle size={20} color="#10B981" />;
      case 'shipped':
        return <Truck size={20} color="#3B82F6" />;
      case 'processing':
        return <Clock size={20} color="#F59E0B" />;
      default:
        return <Package size={20} color="#6B7280" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'delivered': return '#10B981';
      case 'shipped': return '#3B82F6';
      case 'processing': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      default: return 'Pending';
    }
  };

  if (!user) {
    return (
      <div style={{ 
        padding: '80px 20px', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <Package size={60} style={{ margin: '0 auto 20px', color: '#6B7280' }} />
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '16px' }}>
          Please Login First
        </h1>
        <p style={{ color: '#6B7280', marginBottom: '30px' }}>
          You need to login to view your orders.
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
          fontWeight: '600'
        }}>
          <Home size={20} />
          Go to Home
        </Link>
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
      {/* Page Header - Mobile Responsive */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: 'clamp(24px, 5vw, 32px)', 
          fontWeight: 'bold', 
          marginBottom: '8px',
          lineHeight: '1.2'
        }}>
          Track Your Orders
        </h1>
        <p style={{ 
          color: '#6B7280',
          fontSize: 'clamp(14px, 3vw, 16px)'
        }}>
          View and track all your orders in one place
        </p>
      </div>

      {/* Search Order Section - Mobile Responsive */}
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        padding: 'clamp(16px, 4vw, 24px)', 
        marginBottom: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        <h2 style={{ 
          fontSize: 'clamp(18px, 4vw, 20px)', 
          fontWeight: 'bold', 
          marginBottom: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px'
        }}>
          <Search size={20} />
          Search Order by ID
        </h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '12px',
          '@media (min-width: 640px)': {
            flexDirection: 'row'
          }
        }}>
          <input
            type="text"
            placeholder="Enter Order ID (e.g., ORD-12345678)"
            value={searchOrderId}
            onChange={(e) => setSearchOrderId(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '1px solid #D1D5DB',
              borderRadius: '8px',
              fontSize: 'clamp(14px, 3vw, 16px)',
              width: '100%',
              boxSizing: 'border-box'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: 'clamp(14px, 3vw, 16px)',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              '@media (min-width: 640px)': {
                width: 'auto'
              }
            }}
          >
            <Search size={18} />
            Search
          </button>
        </div>
      </div>

      {/* Search Result - Mobile Responsive */}
      {searchResult && (
        <div style={{ 
          background: 'white', 
          borderRadius: '12px', 
          padding: 'clamp(16px, 4vw, 24px)', 
          marginBottom: '30px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
          borderLeft: `4px solid ${getStatusColor(searchResult.status)}`
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '12px',
            marginBottom: '20px',
            '@media (min-width: 640px)': {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0'
            }
          }}>
            <h3 style={{ 
              fontSize: 'clamp(18px, 4vw, 20px)', 
              fontWeight: 'bold',
              order: 1
            }}>
              Order Found: {searchResult.id || searchResult.orderNumber}
            </h3>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              order: 2,
              '@media (min-width: 640px)': {
                order: 3
              }
            }}>
              {getStatusIcon(searchResult.status)}
              <span style={{ 
                color: getStatusColor(searchResult.status),
                fontWeight: '600',
                fontSize: 'clamp(14px, 3vw, 16px)'
              }}>
                {getStatusText(searchResult.status)}
              </span>
            </div>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr',
            gap: '20px',
            '@media (min-width: 640px)': {
              gridTemplateColumns: '1fr 1fr'
            }
          }}>
            <div>
              <h4 style={{ 
                fontSize: 'clamp(14px, 3vw, 16px)', 
                fontWeight: '600', 
                marginBottom: '8px' 
              }}>
                Order Details
              </h4>
              <p style={{ color: '#6B7280', marginBottom: '4px', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>
                Date: {searchResult.date}
              </p>
              <p style={{ color: '#6B7280', marginBottom: '4px', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>
                Total: ${searchResult.total?.toFixed(2)}
              </p>
              <p style={{ color: '#6B7280', fontSize: 'clamp(13px, 2.5vw, 14px)' }}>
                Estimated Delivery: {searchResult.estimatedDelivery}
              </p>
            </div>
            
            <div>
              <h4 style={{ 
                fontSize: 'clamp(14px, 3vw, 16px)', 
                fontWeight: '600', 
                marginBottom: '8px' 
              }}>
                Shipping Address
              </h4>
              <p style={{ 
                color: '#6B7280', 
                fontSize: 'clamp(13px, 2.5vw, 14px)',
                wordBreak: 'break-word'
              }}>
                {searchResult.shippingAddress}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* All Orders - Mobile Responsive */}
      <div>
        <h2 style={{ 
          fontSize: 'clamp(20px, 4.5vw, 24px)', 
          fontWeight: 'bold', 
          marginBottom: '20px' 
        }}>
          My Orders ({orders.length})
        </h2>
        
        {orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <ShoppingBag size={60} style={{ margin: '0 auto 20px', color: '#6B7280' }} />
            <h3 style={{ 
              fontSize: 'clamp(18px, 4vw, 20px)', 
              fontWeight: 'bold', 
              marginBottom: '12px' 
            }}>
              No Orders Yet
            </h3>
            <p style={{ 
              color: '#6B7280', 
              marginBottom: '24px',
              fontSize: 'clamp(14px, 3vw, 16px)'
            }}>
              You haven't placed any orders yet.
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
              fontSize: 'clamp(14px, 3vw, 16px)'
            }}>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {orders.map((order, index) => (
              <div 
                key={index}
                style={{ 
                  background: 'white', 
                  borderRadius: '12px', 
                  padding: 'clamp(16px, 4vw, 24px)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  borderLeft: `4px solid ${getStatusColor(order.status)}`,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                }}
              >
                {/* Order Header - Mobile Responsive */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '20px',
                  '@media (min-width: 768px)': {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0'
                  }
                }}>
                  <div style={{ order: 1 }}>
                    <h3 style={{ 
                      fontSize: 'clamp(16px, 3.5vw, 18px)', 
                      fontWeight: 'bold', 
                      marginBottom: '4px' 
                    }}>
                      Order #{order.id || order.orderNumber}
                    </h3>
                    <p style={{ 
                      color: '#6B7280', 
                      fontSize: 'clamp(13px, 2.5vw, 14px)' 
                    }}>
                      Placed on {order.date}
                    </p>
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '12px',
                    order: 2,
                    '@media (min-width: 768px)': {
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '16px',
                      order: 3
                    }
                  }}>
                    <div style={{ 
                      background: `${getStatusColor(order.status)}20`,
                      padding: '8px 16px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      alignSelf: 'flex-start',
                      '@media (min-width: 768px)': {
                        alignSelf: 'center'
                      }
                    }}>
                      {getStatusIcon(order.status)}
                      <span style={{ 
                        color: getStatusColor(order.status),
                        fontWeight: '600',
                        fontSize: 'clamp(13px, 2.5vw, 14px)'
                      }}>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    
                    <div style={{ 
                      fontSize: 'clamp(18px, 4vw, 20px)', 
                      fontWeight: 'bold',
                      order: 1,
                      '@media (min-width: 768px)': {
                        order: 2
                      }
                    }}>
                      ${order.total?.toFixed(2)}
                    </div>
                  </div>
                </div>
                
                {/* Order Items */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ 
                    fontSize: 'clamp(14px, 3vw, 16px)', 
                    fontWeight: '600', 
                    marginBottom: '12px' 
                  }}>
                    Items ({order.items?.length || 0})
                  </h4>
                  <div style={{ display: 'grid', gap: '8px' }}>
                    {(order.items || []).map((item: any, itemIndex: number) => (
                      <div key={itemIndex} style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: '8px',
                        padding: '12px',
                        background: '#F9FAFB',
                        borderRadius: '8px',
                        '@media (min-width: 480px)': {
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }
                      }}>
                        <div>
                          <p style={{ 
                            fontWeight: '500',
                            fontSize: 'clamp(14px, 3vw, 15px)'
                          }}>
                            {item.name}
                          </p>
                          <p style={{ 
                            color: '#6B7280', 
                            fontSize: 'clamp(12px, 2.5vw, 14px)' 
                          }}>
                            Qty: {item.quantity} × ${item.price?.toFixed(2)}
                          </p>
                        </div>
                        <div style={{ 
                          fontWeight: '600',
                          fontSize: 'clamp(14px, 3vw, 16px)'
                        }}>
                          ${(item.quantity * item.price).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Order Footer - Mobile Responsive */}
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '16px',
                  paddingTop: '20px',
                  borderTop: '1px solid #E5E7EB',
                  '@media (min-width: 640px)': {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0'
                  }
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ 
                      color: '#6B7280', 
                      fontSize: 'clamp(12px, 2.5vw, 14px)', 
                      marginBottom: '4px',
                      wordBreak: 'break-word'
                    }}>
                      Shipping to: {order.shippingAddress}
                    </p>
                    {order.estimatedDelivery && (
                      <p style={{ 
                        color: '#6B7280', 
                        fontSize: 'clamp(12px, 2.5vw, 14px)' 
                      }}>
                        Estimated delivery: {order.estimatedDelivery}
                      </p>
                    )}
                  </div>
                  
                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    gap: '8px',
                    '@media (min-width: 480px)': {
                      flexDirection: 'row',
                      gap: '12px'
                    }
                  }}>
                    <Link 
                      href={`/orders/${order.id || order.orderNumber}`}
                      style={{
                        padding: '10px 16px',
                        background: '#F3F4F6',
                        color: '#374151',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: 'clamp(13px, 2.5vw, 14px)',
                        fontWeight: '500',
                        transition: 'all 0.2s ease',
                        textAlign: 'center',
                        display: 'inline-block',
                        boxSizing: 'border-box',
                        width: '100%',
                        '@media (min-width: 480px)': {
                          width: 'auto'
                        }
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#E5E7EB';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#F3F4F6';
                      }}
                    >
                      View Details
                    </Link>
                    
                    <button
                      style={{
                        padding: '10px 16px',
                        background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: 'clamp(13px, 2.5vw, 14px)',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        width: '100%',
                        '@media (min-width: 480px)': {
                          width: 'auto'
                        }
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Track Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}