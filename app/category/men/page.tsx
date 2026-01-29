// app/category/men/page.tsx - MOBILE RESPONSIVE
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/components/providers/CartProvider'; // 👈 ADDED: CartProvider import

export default function MenCategory() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});
  
  // 👇 ADDED: CartProvider hook
  const { addToCart } = useCart();
  
  // ✅ Query param se category set karo
  useEffect(() => {
    console.log("Query Category from URL:", queryCategory);
    if (queryCategory) {
      setSelectedCategory(queryCategory);
    } else {
      setSelectedCategory(null);
    }
  }, [queryCategory]);
  
  // Function to generate products
  const generateProducts = () => {
    const categories = [
      { 
        displayName: "Jackets", 
        folder: "jackets", 
        imagePrefix: "jacket",
        count: 31, 
        basePrice: 89.99 
      },
      { 
        displayName: "Suits", 
        folder: "suits", 
        imagePrefix: "suit", 
        count: 6, 
        basePrice: 249.99 
      },
      { 
        displayName: "T-Shirts", 
        folder: "tshirts", 
        imagePrefix: "tshirt", 
        count: 28, 
        basePrice: 24.99 
      },
      { 
        displayName: "Hoodies", 
        folder: "hoodies", 
        imagePrefix: "hoodie", 
        count: 28, 
        basePrice: 59.99 
      },
      { 
        displayName: "Shirts", 
        folder: "shirts", 
        imagePrefix: "shirt",
        count: 20, 
        basePrice: 49.99 
      },
      { 
        displayName: "Trousers", 
        folder: "trousers", 
        imagePrefix: "trouser",
        count: 4, 
        basePrice: 69.99 
      }
    ];
    
    let products = [];
    let id = 1;
    
    categories.forEach(category => {
      for (let i = 1; i <= category.count; i++) {
        const imagePath = `/products/men/${category.folder}/${category.imagePrefix}${i}.jpg`;
        
        products.push({
          id: id++,
          name: `${category.displayName} ${i}`,
          price: (Number(category.basePrice) + (i * 0.5)).toFixed(2),
          image: imagePath,
          category: category.displayName,
          gender: "men", // 👈 ADDED: Gender field
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
  
  // 👇 UPDATED: CartProvider compatible add to cart function
  const handleAddToCart = (product: any) => {
    try {
      // Use CartProvider's addToCart function
      addToCart({
        id: product.id, // ✅ Number format mein
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        category: product.category,
        gender: product.gender // ✅ Men's category ka gender
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
  
  // Get unique categories
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  // ✅ DEBUG: Check what's happening
  console.log("Selected Category:", selectedCategory);
  console.log("All Categories:", categories);
  console.log("Total Products:", products.length);
  
  // ✅ Filter products based on selected category
  const filteredProducts = selectedCategory === "All" || !selectedCategory
    ? products
    : products.filter(product => {
        const match = product.category === selectedCategory;
        console.log(`Product: ${product.name}, Category: ${product.category}, Match: ${match}`);
        return match;
      });

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
        Men's Collection
      </h1>
      <p style={{ 
        color: '#6B7280', 
        marginBottom: '32px',
        fontSize: 'clamp(14px, 3vw, 16px)',
        textAlign: 'center'
      }}>
        Premium clothing for men - Jackets, T-Shirts, Shirts, Hoodies, Suits & Trousers
      </p>
      
      {/* Category Filter Buttons - MOBILE RESPONSIVE */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '8px', 
        marginBottom: '24px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e5e7eb',
        justifyContent: 'center'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
            style={{
              padding: '8px 14px',
              borderRadius: '25px',
              border: '1px solid #d1d5db',
              background: selectedCategory === cat || (cat === "All" && !selectedCategory) 
                ? '#111827' 
                : 'white',
              color: selectedCategory === cat || (cat === "All" && !selectedCategory)
                ? 'white'
                : '#374151',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontSize: '13px',
              whiteSpace: 'nowrap',
              minWidth: '80px',
              textAlign: 'center'
            }}
          >
            {cat} {cat !== "All" && `(${products.filter(p => p.category === cat).length})`}
          </button>
        ))}
      </div>
      
      {/* ✅ Show which category is active - MOBILE RESPONSIVE */}
      {selectedCategory && selectedCategory !== "All" && (
        <div style={{ 
          marginBottom: '24px', 
          padding: '16px',
          background: '#f8fafc',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '18px', 
            fontWeight: 'bold', 
            marginBottom: '4px' 
          }}>
            {selectedCategory} 
            <span style={{ 
              color: '#6B7280', 
              fontSize: '14px', 
              marginLeft: '8px',
              fontWeight: 'normal'
            }}>
              ({filteredProducts.length} products)
            </span>
          </h2>
          <p style={{ 
            color: '#3B82F6', 
            fontSize: '12px',
            marginTop: '4px'
          }}>
            Active Filter: {selectedCategory}
          </p>
        </div>
      )}
      
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
              display: 'flex',
              flexDirection: 'column',
              height: '100%'
            }}>
              <div style={{
                height: '180px',
                position: 'relative',
                overflow: 'hidden',
                background: '#f9fafb',
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
                      objectPosition: 'center'
                    }}
                    onError={() => handleImageError(product.id)}
                  />
                ) : (
                  <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    color: '#d1d5db'
                  }}>
                    {product.category === 'Jackets' && '🧥'}
                    {product.category === 'Suits' && '👔'}
                    {product.category === 'T-Shirts' && '👕'}
                    {product.category === 'Hoodies' && '🧣'}
                    {product.category === 'Shirts' && '👔'}
                    {product.category === 'Trousers' && '👖'}
                  </div>
                )}
                
                {/* Added to Cart Badge - SMALLER FOR MOBILE */}
                {addedItems[product.id] && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '8px',
                    background: '#10B981',
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
                  lineHeight: '1.3'
                }}>
                  {product.name}
                </h3>
                <p style={{ 
                  color: '#6B7280', 
                  fontSize: '12px', 
                  marginBottom: '8px',
                  flexGrow: 1
                }}>
                  {product.category}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: 'auto'
                }}>
                  <span style={{ 
                    fontSize: '15px', 
                    fontWeight: 'bold',
                    color: '#111827'
                  }}>
                    ${product.price}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    style={{
                      background: addedItems[product.id] ? '#10B981' : '#111827',
                      color: 'white',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '5px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '13px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {addedItems[product.id] ? '✓ Added' : 'Add'}
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
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>
            👨
          </div>
          <h3 style={{ 
            fontSize: '18px', 
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            No products found in "{selectedCategory}"
          </h3>
          <p style={{ fontSize: '14px' }}>
            Check the category name in URL and product data.
          </p>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              marginTop: '16px',
              padding: '10px 20px',
              background: '#111827',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
}