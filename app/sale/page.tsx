"use client"; // ✅ ADDED: "use client" directive

import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider'; // ✅ ADDED: CartProvider import
import { useState } from 'react'; // ✅ ADDED: For feedback state

export default function SalePage() {
  // ✅ ADDED: Cart hook and feedback state
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<{[key: string]: boolean}>({});

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
    <div style={{ padding: '40px 20px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Sale Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #EF4444, #DC2626)',
        borderRadius: '16px',
        padding: '40px',
        color: 'white',
        marginBottom: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
          SALE UP TO 70% OFF
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.9 }}>
          Limited time offer. Shop now before it's gone!
        </p>
      </div>

      {/* Sale by Categories */}
      {saleCategories.map((category) => (
        <div key={category.name} style={{ marginBottom: '50px' }}>
          {/* Category Header */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '24px'
          }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: category.color }}>
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
                gap: '8px'
              }}
            >
              View all {category.name} sale items →
            </Link>
          </div>

          {/* Products Grid - 5 products */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '24px'
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
                  {/* Product Image */}
                  <div style={{
                    height: '200px',
                    backgroundImage: `url(${product.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}>
                    {/* Discount Badge */}
                    <div style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#EF4444',
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {product.discount}
                    </div>

                    {/* ✅ ADDED: Added to Cart Badge */}
                    {isAdded && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: '#10B981',
                        color: 'white',
                        padding: '6px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        zIndex: 2
                      }}>
                        ✓ Added
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: '16px' }}>
                    <h3 style={{ 
                      fontSize: '16px', 
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      {product.name}
                    </h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#EF4444' }}>
                        {product.price}
                      </span>
                      <span style={{
                        fontSize: '14px',
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

                    {/* ✅ ADDED: Add to Cart Button */}
                    <button 
                      onClick={() => handleAddToCart(product, category.name)}
                      style={{
                        width: '100%',
                        padding: '10px',
                        background: isAdded ? '#10B981' : category.color,
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '14px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!isAdded) {
                          e.currentTarget.style.opacity = '0.9';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isAdded) {
                          e.currentTarget.style.opacity = '1';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }
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

      {/* ✅ ADDED: Sale Tips Section */}
      <div style={{
        marginTop: '50px',
        padding: '30px',
        background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
        borderRadius: '16px',
        textAlign: 'center'
      }}>
        <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#92400E' }}>
          🎉 Flash Sale Tips
        </h3>
        <p style={{ color: '#92400E', fontSize: '16px', maxWidth: '800px', margin: '0 auto' }}>
          Add items to cart quickly! Sale prices are limited and items sell out fast. 
          Don't miss your chance to save up to 70% on premium products.
        </p>
      </div>
    </div>
  );
}