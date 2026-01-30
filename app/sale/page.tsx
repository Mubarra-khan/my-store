"use client"; // ✅ ADDED: "use client" directive

import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider'; // ✅ ADDED: CartProvider import
import { useState, useEffect } from 'react'; // ✅ ADDED: For feedback state and mobile detection

export default function SalePage() {
  // ✅ ADDED: Cart hook and feedback state
  const { addToCart } = useCart();
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

  // ✅ ADDED: Handle add to cart function
  const handleAddToCart = (product: any, category: string) => {
    try {
      // Generate unique ID for each product
      const productId = `${category.toLowerCase()}_${product.name.toLowerCase().replace(/\s+/g, '_')}`;
      
      // Parse price (remove $ and convert to number)
      const price = parseFloat(product.price.replace('$', ''));
      
      // Add to cart
      addToCart({
        id: Date.now() + Math.random(), // Unique ID
        name: product.name,
        price: price,
        image: product.image,
        category: category,
        gender: category.toLowerCase()
      });
      
      // Show feedback
      setAddedItems(prev => ({ ...prev, [productId]: true }));
      
      // Reset feedback after 2 seconds
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [productId]: false }));
      }, 2000);
      
      // Show success message
      alert(`✓ ${product.name} added to cart!`);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Could not add item to cart. Please try again.');
    }
  };

  // ✅ Exact image paths based on your structure
  const saleCategories = [
    {
      name: 'Men',
      href: '/category/men?filter=sale',
      color: '#3B82F6',
      products: [
        { name: 'Men\'s Jacket', price: '$49.99', discount: '50% off', image: '/products/men/jackets/jacket1.jpg' },
        { name: 'Formal Suit', price: '$99.99', discount: '40% off', image: '/products/men/suits/suit1.jpg' },
        { name: 'Casual T-Shirt', price: '$19.99', discount: '30% off', image: '/products/men/tshirts/tshirt1.jpg' },
        { name: 'Hoodie', price: '$39.99', discount: '25% off', image: '/products/men/hoodies/hoodie1.jpg' },
        { name: 'Formal Shirt', price: '$34.99', discount: '20% off', image: '/products/men/shirts/shirt1.jpg' },
      ]
    },
    {
      name: 'Women',
      href: '/category/women?filter=sale',
      color: '#EC4899',
      products: [
        { name: 'Elegant Dress', price: '$45.99', discount: '50% off', image: '/products/women/elegantdress/elegant1.jpg' },
        { name: 'Women Trousers', price: '$79.99', discount: '40% off', image: '/products/women/trousers/trouser1.jpg' },
        { name: 'Women Shirts', price: '$24.99', discount: '35% off', image: '/products/women/elegantdress/elegant25.jpg' },
        { name: 'Dresses', price: '$29.99', discount: '30% off', image: '/products/women/elegantdress/elegant8.jpg' },
        { name: 'Formal Wear', price: '$89.99', discount: '45% off', image: '/products/women/elegantdress/elegant6.jpg' },
      ]
    },
    {
      name: 'Kids',
      href: '/category/kids?filter=sale',
      color: '#10B981',
      products: [
        { name: 'Boys Jacket', price: '$29.99', discount: '40% off', image: '/products/kids/boys/jackets/jacket1.jpg' },
        { name: 'Girls Dress', price: '$34.99', discount: '35% off', image: '/products/kids/girls/dress/dress1.jpg' },
        { name: 'Kids T-Shirt', price: '$24.99', discount: '30% off', image: '/products/kids/boys/tshirts/tshirt1.jpg' },
        { name: 'Girls Twinning', price: '$19.99', discount: '25% off', image: '/products/kids/girls/twinning/twinning1.jpg' },
        { name: 'Boys Trousers', price: '$49.99', discount: '20% off', image: '/products/kids/boys/trousers/trouser1.jpg' },
      ]
    },
    {
      name: 'Newborns',
      href: '/category/newborns?filter=sale',
      color: '#FBBF24',
      products: [
        { name: 'Baby Romper', price: '$14.99', discount: '50% off', image: '/products/newborns/dresses/dress1.jpg' },
        { name: 'Baby Dress', price: '$19.99', discount: '40% off', image: '/products/newborns/dresses/dress2.jpg' },
        { name: 'Baby Set', price: '$24.99', discount: '35% off', image: '/products/newborns/dresses/dress3.jpg' },
        { name: 'Baby Bodysuit', price: '$17.99', discount: '30% off', image: '/products/newborns/dresses/dress4.jpg' },
        { name: 'Baby Jacket', price: '$22.99', discount: '25% off', image: '/products/newborns/dresses/dress5.jpg' },
      ]
    }
  ];

  return (
    <div style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      padding: isMobile ? '20px 12px' : '40px 20px' // Mobile: smaller padding
    }}>
      {/* Sale Banner - Mobile ke liye responsive */}
      <div style={{ 
        background: 'linear-gradient(135deg, #EF4444, #DC2626)',
        borderRadius: '16px',
        padding: isMobile ? '24px 16px' : '40px', // Mobile: smaller padding
        color: 'white',
        marginBottom: isMobile ? '30px' : '40px', // Mobile: smaller margin
        textAlign: 'center'
      }}>
        <h1 style={{ 
          fontSize: isMobile ? '32px' : '48px', // Mobile: smaller font
          fontWeight: 'bold', 
          marginBottom: '10px' 
        }}>
          SALE UP TO 70% OFF
        </h1>
        <p style={{ 
          fontSize: isMobile ? '16px' : '20px', // Mobile: smaller font
          opacity: 0.9 
        }}>
          Limited time offer. Shop now before it's gone!
        </p>
      </div>

      {/* Sale by Categories */}
      {saleCategories.map((category) => (
        <div key={category.name} style={{ marginBottom: isMobile ? '40px' : '50px' }}>
          {/* Category Header - Mobile ke liye flex direction */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: isMobile ? '20px' : '24px',
            flexDirection: isMobile ? 'column' : 'row', // Mobile: column, Desktop: row
            gap: isMobile ? '12px' : '0', // Mobile: gap between items
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <h2 style={{ 
              fontSize: isMobile ? '22px' : '28px', // Mobile: smaller font
              fontWeight: 'bold', 
              color: category.color 
            }}>
              {category.name} Sale
            </h2>
            <Link 
              href={category.href}
              style={{
                color: category.color,
                textDecoration: 'none',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: isMobile ? '14px' : '16px' // Mobile: smaller font
              }}
            >
              View all {category.name} sale items →
            </Link>
          </div>

          {/* ✅ Products Grid - Mobile ke liye 2 columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? 
              'repeat(2, 1fr)' : // Mobile: 2 columns
              'repeat(auto-fill, minmax(250px, 1fr))', // Desktop: responsive
            gap: isMobile ? '12px' : '25px' // Mobile: smaller gap
          }}>
            {category.products.map((product, index) => {
              // ✅ Generate unique ID for feedback
              const productId = `${category.name.toLowerCase()}_${product.name.toLowerCase().replace(/\s+/g, '_')}`;
              const isAdded = addedItems[productId];
              
              return (
                <div
                  key={index}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    color: '#1F2937',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease',
                    position: 'relative'
                  }}
                >
                  {/* Product Image - Mobile ke liye smaller height */}
                  <div style={{
                    height: isMobile ? '150px' : '200px', // Mobile: smaller image
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    {/* Discount Badge - Mobile ke liye smaller */}
                    <div style={{
                      position: 'absolute',
                      top: isMobile ? '8px' : '12px',
                      right: isMobile ? '8px' : '12px',
                      background: '#EF4444',
                      color: 'white',
                      padding: isMobile ? '4px 8px' : '6px 12px',
                      borderRadius: '20px',
                      fontSize: isMobile ? '12px' : '14px',
                      fontWeight: 'bold'
                    }}>
                      {product.discount}
                    </div>

                    {/* ✅ ADDED: Added to Cart Badge - Mobile ke liye smaller */}
                    {isAdded && (
                      <div style={{
                        position: 'absolute',
                        top: isMobile ? '8px' : '12px',
                        left: isMobile ? '8px' : '12px',
                        background: '#10B981',
                        color: 'white',
                        padding: isMobile ? '4px 8px' : '6px 12px',
                        borderRadius: '20px',
                        fontSize: isMobile ? '10px' : '12px',
                        fontWeight: 'bold',
                        zIndex: 2
                      }}>
                        ✓ Added
                      </div>
                    )}
                  </div>

                  {/* Product Info - Mobile ke liye smaller padding */}
                  <div style={{ padding: isMobile ? '12px' : '16px' }}>
                    <h3 style={{ 
                      fontSize: isMobile ? '14px' : '16px', // Mobile: smaller font
                      fontWeight: '600',
                      marginBottom: isMobile ? '6px' : '8px',
                      height: isMobile ? '36px' : 'auto',
                      overflow: 'hidden',
                      lineHeight: '1.3'
                    }}>
                      {product.name}
                    </h3>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      marginBottom: isMobile ? '10px' : '12px',
                      flexWrap: isMobile ? 'wrap' : 'nowrap'
                    }}>
                      <span style={{ 
                        fontSize: isMobile ? '16px' : '18px', // Mobile: smaller font
                        fontWeight: 'bold', 
                        color: '#EF4444',
                        marginBottom: isMobile ? '4px' : '0'
                      }}>
                        {product.price}
                      </span>
                      <span style={{
                        fontSize: isMobile ? '12px' : '14px', // Mobile: smaller font
                        color: '#6B7280',
                        textDecoration: 'line-through'
                      }}>
                        {/* Original prices based on discount */}
                        {product.discount === '50% off' ? `$${(parseFloat(product.price.replace('$', '')) * 2).toFixed(2)}` :
                         product.discount === '40% off' ? `$${(parseFloat(product.price.replace('$', '')) / 0.6).toFixed(2)}` :
                         product.discount === '35% off' ? `$${(parseFloat(product.price.replace('$', '')) / 0.65).toFixed(2)}` :
                         product.discount === '30% off' ? `$${(parseFloat(product.price.replace('$', '')) / 0.7).toFixed(2)}` :
                         product.discount === '25% off' ? `$${(parseFloat(product.price.replace('$', '')) / 0.75).toFixed(2)}` :
                         product.discount === '20% off' ? `$${(parseFloat(product.price.replace('$', '')) / 0.8).toFixed(2)}` : ''}
                      </span>
                    </div>

                    {/* ✅ ADDED: Add to Cart Button - Mobile ke liye full width */}
                    <button 
                      onClick={() => handleAddToCart(product, category.name)}
                      style={{
                        width: '100%',
                        padding: isMobile ? '8px' : '10px', // Mobile: smaller padding
                        background: isAdded ? '#10B981' : category.color,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: isMobile ? '13px' : '14px', // Mobile: smaller font
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {isAdded ? '✓ Added to Cart' : '🛒 Add to Cart'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* ✅ ADDED: Sale Tips Section - Mobile responsive */}
      <div style={{
        marginTop: isMobile ? '30px' : '50px',
        padding: isMobile ? '20px' : '30px',
        background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
        borderRadius: '16px',
        textAlign: 'center'
      }}>
        <h3 style={{ 
          fontSize: isMobile ? '20px' : '24px', // Mobile: smaller font
          fontWeight: 'bold', 
          marginBottom: isMobile ? '12px' : '16px', 
          color: '#92400E' 
        }}>
          🎉 Flash Sale Tips
        </h3>
        <p style={{ 
          color: '#92400E', 
          fontSize: isMobile ? '14px' : '16px', // Mobile: smaller font
          maxWidth: '800px', 
          margin: '0 auto' 
        }}>
          Add items to cart quickly! Sale prices are limited and items sell out fast. 
          Don't miss your chance to save up to 70% on premium products.
        </p>
      </div>
    </div>
  );
}