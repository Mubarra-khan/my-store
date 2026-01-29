// app/category/newborns/page.tsx - MOBILE RESPONSIVE
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/components/providers/CartProvider'; // 👈 ADDED: CartProvider import

export default function NewbornsCategory() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({}); // 👈 ADDED: For feedback
  
  // 👇 ADDED: CartProvider hook
  const { addToCart } = useCart();
  
  useEffect(() => {
    if (queryCategory) {
      setSelectedCategory(queryCategory);
    } else {
      setSelectedCategory(null);
    }
  }, [queryCategory]);
  
  // ✅ Sirf 1 category - Baby Dresses
  const generateProducts = () => {
    const categories = [
      { 
        displayName: "Baby Dresses", 
        folder: "dresses", 
        imagePrefix: "dress",
        count: 16, // dress1.jpg to dress16.jpg
        basePrice: 19.99
      }
    ];
    
    let products = [];
    let id = 1;
    
    categories.forEach(category => {
      for (let i = 1; i <= category.count; i++) {
        const imagePath = `/products/newborns/${category.folder}/${category.imagePrefix}${i}.jpg`;
        
        products.push({
          id: id++,
          name: `Baby Dress ${i}`,
          price: (Number(category.basePrice) + (i * 0.5)).toFixed(2),
          image: imagePath,
          category: category.displayName,
          gender: "newborn", // 👈 ADDED: Gender field
          imageError: false
        });
      }
    });
    
    return products;
  };
  
  const [products, setProducts] = useState(() => generateProducts());
  
  const handleImageError = (productId: number) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, imageError: true }
          : product
      )
    );
  };
  
  // 👇 ADDED: CartProvider compatible add to cart function
  const handleAddToCart = (product: any) => {
    try {
      // Use CartProvider's addToCart function
      addToCart({
        id: product.id, // ✅ Number format mein
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        category: product.category,
        gender: product.gender // ✅ Newborns category ka gender
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
  
  // Sirf 1 category hai, isliye filter buttons nahi dikhayenge
  const filteredProducts = products; // No filtering needed for newborns

  return (
    <div style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      padding: '20px 16px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ 
        fontSize: 'clamp(24px, 5vw, 36px)', 
        fontWeight: 'bold', 
        marginBottom: '8px',
        textAlign: 'center'
      }}>
        Newborns Collection
      </h1>
      <p style={{ 
        color: '#6B7280', 
        marginBottom: '8px',
        fontSize: 'clamp(14px, 3vw, 16px)',
        textAlign: 'center'
      }}>
        Adorable baby dresses for your little ones
      </p>
      <p style={{ 
        color: '#9CA3AF', 
        fontSize: '14px', 
        marginBottom: '32px',
        textAlign: 'center'
      }}>
        {products.length} beautiful baby dresses available
      </p>
      
      {/* ✅ Simple Stats Card - MOBILE RESPONSIVE */}
      <div style={{ 
        marginBottom: '32px',
        padding: '20px 16px',
        background: 'linear-gradient(135deg, #FBBF24, #F59E0B)',
        borderRadius: '12px',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ 
          fontSize: 'clamp(36px, 8vw, 48px)', 
          marginBottom: '8px' 
        }}>
          👶
        </div>
        <div style={{ 
          fontSize: 'clamp(20px, 5vw, 28px)', 
          fontWeight: 'bold', 
          marginBottom: '4px' 
        }}>
          {products.length} Baby Dresses
        </div>
        <div style={{ 
          fontSize: '13px', 
          opacity: 0.9,
          lineHeight: '1.4'
        }}>
          Size: 0-6 Months | Soft Cotton | Easy Care
        </div>
      </div>
      
      {/* ✅ No Category Filter Buttons Needed (Sirf 1 category) */}
      
      {/* Products Grid - MOBILE RESPONSIVE */}
      {filteredProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '16px'
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              background: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              border: '2px solid #FBBF2420',
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <div style={{
                height: '180px',
                position: 'relative',
                background: '#FFFBEB',
                flexShrink: 0
              }}>
                {!product.imageError ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      objectPosition: 'center',
                      padding: '8px'
                    }}
                    onError={() => handleImageError(product.id)}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    color: '#FBBF24',
                    background: '#FFFBEB'
                  }}>
                    <div>👗</div>
                    <div style={{ 
                      fontSize: '12px', 
                      marginTop: '6px', 
                      color: '#92400E',
                      textAlign: 'center',
                      padding: '0 8px'
                    }}>
                      Baby Dress
                    </div>
                  </div>
                )}
                
                {/* 👈 ADDED: Added to Cart Badge - SMALLER FOR MOBILE */}
                {addedItems[product.id] && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: '#F59E0B',
                    color: 'white',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    zIndex: 2
                  }}>
                    ✓ Added
                  </div>
                )}
              </div>
              
              <div style={{ 
                padding: '12px', 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                <h3 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  marginBottom: '6px',
                  color: '#1f2937',
                  lineHeight: '1.3'
                }}>
                  {product.name}
                </h3>
                <div style={{ 
                  marginBottom: '12px',
                  flexGrow: 1
                }}>
                  <span style={{ 
                    background: '#FEF3C7', 
                    color: '#92400E', 
                    padding: '3px 8px', 
                    borderRadius: '10px',
                    fontSize: '11px',
                    display: 'inline-block'
                  }}>
                    Size: 0-6M
                  </span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #F3F4F6',
                  paddingTop: '12px',
                  marginTop: 'auto'
                }}>
                  <div>
                    <span style={{ 
                      fontSize: '15px', 
                      fontWeight: 'bold', 
                      color: '#92400E' 
                    }}>
                      ${product.price}
                    </span>
                    <div style={{ 
                      fontSize: '11px', 
                      color: '#9CA3AF',
                      marginTop: '2px'
                    }}>
                      Free Shipping
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)} // 👈 ADDED: onClick handler
                    style={{
                      background: addedItems[product.id] ? '#10B981' : '#FBBF24',
                      color: addedItems[product.id] ? 'white' : '#92400E',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '5px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '13px',
                      whiteSpace: 'nowrap',
                      minWidth: '70px'
                    }}
                  >
                    {addedItems[product.id] ? '✓ Added' : 'Add'} {/* 👈 UPDATED: Shorter text for mobile */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px 16px', 
          color: '#6b7280' 
        }}>
          <div style={{ 
            fontSize: '40px', 
            marginBottom: '16px' 
          }}>
            👶
          </div>
          <h3 style={{ 
            fontSize: '18px', 
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            No baby products found
          </h3>
          <p style={{ fontSize: '14px' }}>
            Check back soon for newborn essentials!
          </p>
        </div>
      )}
      
      {/* Newborns Tips Section - MOBILE RESPONSIVE */}
      <div style={{
        marginTop: '40px',
        padding: '20px 16px',
        background: '#FFFBEB',
        borderRadius: '12px',
        borderLeft: '5px solid #FBBF24'
      }}>
        <h3 style={{ 
          fontSize: '16px', 
          fontWeight: 'bold', 
          marginBottom: '12px',
          color: '#92400E',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          👶 Newborn Care Tips
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', 
          gap: '12px',
          color: '#92400E'
        }}>
          <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
            <strong>Soft Fabrics:</strong> 100% cotton for sensitive skin
          </div>
          <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
            <strong>Easy Dressing:</strong> Snap buttons for quick changes
          </div>
          <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
            <strong>Size Guide:</strong> 0-3M, 3-6M, 6-9M available
          </div>
          <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
            <strong>Machine Washable:</strong> Easy care for busy parents
          </div>
        </div>
      </div>
    </div>
  );
}