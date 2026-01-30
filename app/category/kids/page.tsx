"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/components/providers/CartProvider';
import { Suspense } from 'react';

// Create a separate component for the content
function KidsPageContent() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});
  const [isMobile, setIsMobile] = useState(false);
  
  const { addToCart } = useCart();
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (queryCategory) {
      setSelectedCategory(queryCategory);
    } else {
      setSelectedCategory(null);
    }
  }, [queryCategory]);
  
  const generateProducts = () => {
    const categories = [
      { 
        displayName: "Jackets", 
        folder: "jackets", 
        imagePrefix: "jacket",
        count: 17,
        basePrice: 34.99,
        gender: "boys",
        startFrom: 1
      },
      { 
        displayName: "Shirts", 
        folder: "shirts", 
        imagePrefix: "shirt",
        count: 34,
        basePrice: 24.99,
        gender: "boys",
        startFrom: 1
      },
      { 
        displayName: "Trousers", 
        folder: "trousers", 
        imagePrefix: "trouser",
        count: 24,
        basePrice: 29.99,
        gender: "boys",
        startFrom: 1
      },
      { 
        displayName: "T-Shirts", 
        folder: "tshirts", 
        imagePrefix: "tshirt",
        count: 52,
        basePrice: 19.99,
        gender: "boys",
        startFrom: 1
      },
      { 
        displayName: "Dresses", 
        folder: "dress", 
        imagePrefix: "dress",
        count: 15,
        basePrice: 39.99,
        gender: "girls",
        startFrom: 1
      },
      { 
        displayName: "Shirts", 
        folder: "shirts", 
        imagePrefix: "shirt",
        count: 16,
        basePrice: 27.99,
        gender: "girls",
        startFrom: 1
      },
      { 
        displayName: "Trousers", 
        folder: "trousers", 
        imagePrefix: "trouser",
        count: 16,
        basePrice: 32.99,
        gender: "girls",
        startFrom: 3
      },
      { 
        displayName: "Twinning", 
        folder: "twinning", 
        imagePrefix: "twinning",
        count: 4,
        basePrice: 49.99,
        gender: "girls",
        startFrom: 1
      }
    ];
    
    let products: any[] = [];
    let id = 1;
    
    categories.forEach(category => {
      for (let i = category.startFrom; i < category.startFrom + category.count; i++) {
        const imagePath = `/products/kids/${category.gender}/${category.folder}/${category.imagePrefix}${i}.jpg`;
        
        products.push({
          id: id++,
          name: `${category.gender === 'boys' ? "Boy'\''s" : "Girl'\''s"} ${category.displayName} ${i}`,
          price: (Number(category.basePrice) + ((i - category.startFrom + 1) * 0.3)).toFixed(2),
          image: imagePath,
          category: category.displayName,
          gender: category.gender,
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
  
  const handleAddToCart = (product: any) => {
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        category: product.category,
        gender: product.gender
      });
      
      setAddedItems(prev => ({ ...prev, [product.id]: true }));
      
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [product.id]: false }));
      }, 2000);
      
      alert(` ${product.name} added to cart!`);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Could not add item to cart. Please try again.');
    }
  };
  
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = products.filter(product => {
    const categoryMatch = !selectedCategory || selectedCategory === "All" || product.category === selectedCategory;
    const genderMatch = selectedGender === 'all' || product.gender === selectedGender;
    return categoryMatch && genderMatch;
  });

  const boysCount = products.filter(p => p.gender === 'boys').length;
  const girlsCount = products.filter(p => p.gender === 'girls').length;
  const totalCount = products.length;

  return (
    <div style={{ 
      maxWidth: '1280px', 
      margin: '0 auto', 
      padding: isMobile ? '15px 12px' : '20px 16px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ 
        fontSize: isMobile ? '24px' : 'clamp(24px, 5vw, 36px)', 
        fontWeight: 'bold', 
        marginBottom: '8px',
        textAlign: 'center'
      }}>
        Kids Collection
      </h1>
      <p style={{ 
        color: '#6B7280', 
        marginBottom: isMobile ? '24px' : '32px',
        fontSize: isMobile ? '14px' : 'clamp(14px, 3vw, 16px)',
        textAlign: 'center'
      }}>
        Boys & Girls - Jackets, Shirts, Trousers, T-Shirts, Dresses, Twinning Sets
      </p>
      
      {/* Gender Filter */}
      <div style={{ 
        display: 'flex', 
        gap: isMobile ? '6px' : '8px', 
        marginBottom: isMobile ? '16px' : '20px',
        paddingBottom: isMobile ? '16px' : '20px',
        borderBottom: '1px solid #e5e7eb',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        <button
          onClick={() => setSelectedGender('all')}
          style={{
            padding: isMobile ? '8px 14px' : '10px 16px',
            borderRadius: '25px',
            border: '1px solid #d1d5db',
            background: selectedGender === 'all' ? '#10B981' : 'white',
            color: selectedGender === 'all' ? 'white' : '#374151',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: isMobile ? '13px' : '14px',
            flex: '1 1 auto',
            minWidth: isMobile ? '90px' : '100px',
            maxWidth: isMobile ? '120px' : '150px'
          }}
        >
         All Kids
        </button>
        <button
          onClick={() => setSelectedGender('boys')}
          style={{
            padding: isMobile ? '8px 14px' : '10px 16px',
            borderRadius: '25px',
            border: '1px solid #d1d5db',
            background: selectedGender === 'boys' ? '#3B82F6' : 'white',
            color: selectedGender === 'boys' ? 'white' : '#374151',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: isMobile ? '13px' : '14px',
            flex: '1 1 auto',
            minWidth: isMobile ? '90px' : '100px',
            maxWidth: isMobile ? '120px' : '150px'
          }}
        >
          Boys ({boysCount})
        </button>
        <button
          onClick={() => setSelectedGender('girls')}
          style={{
            padding: isMobile ? '8px 14px' : '10px 16px',
            borderRadius: '25px',
            border: '1px solid #d1d5db',
            background: selectedGender === 'girls' ? '#EC4899' : 'white',
            color: selectedGender === 'girls' ? 'white' : '#374151',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: isMobile ? '13px' : '14px',
            flex: '1 1 auto',
            minWidth: isMobile ? '90px' : '100px',
            maxWidth: isMobile ? '120px' : '150px'
          }}
        >
           Girls ({girlsCount})
        </button>
      </div>
      
      {/* Category Filter Buttons */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: isMobile ? '6px' : '8px', 
        marginBottom: isMobile ? '20px' : '24px',
        justifyContent: 'center'
      }}>
        {categories.map(cat => {
          const count = cat === "All" 
            ? totalCount 
            : products.filter(p => p.category === cat && 
                (selectedGender === 'all' || p.gender === selectedGender)).length;
            
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
              style={{
                padding: isMobile ? '6px 12px' : '8px 14px',
                borderRadius: '25px',
                border: '1px solid #d1d5db',
                background: selectedCategory === cat || (cat === "All" && !selectedCategory) 
                  ? '#10B981' 
                  : 'white',
                color: selectedCategory === cat || (cat === "All" && !selectedCategory)
                  ? 'white'
                  : '#374151',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: count === 0 ? 0.5 : 1,
                fontSize: isMobile ? '12px' : '13px',
                whiteSpace: 'nowrap'
              }}
              disabled={count === 0}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>
      
      {/* Active Filters Display */}
      {(selectedGender !== 'all' || selectedCategory) && (
        <div style={{ 
          marginBottom: isMobile ? '16px' : '20px', 
          padding: isMobile ? '10px 14px' : '12px 16px', 
          background: '#F0F9FF', 
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '10px' : '12px',
          alignItems: 'center',
          textAlign: 'center'
        }}>
          <div>
            <span style={{ fontWeight: 'bold', color: '#10B981', fontSize: isMobile ? '14px' : '15px' }}>
              {selectedGender === 'all' ? 'All Kids' : selectedGender === 'boys' ? 'Boys' : 'Girls'} 
              {selectedCategory && selectedCategory !== "All" ? `  ${selectedCategory}` : ''}
            </span>
            <span style={{ display: 'block', marginTop: '4px', color: '#6B7280', fontSize: isMobile ? '13px' : '14px' }}>
              ({filteredProducts.length} products)
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedGender('all');
            }}
            style={{
              padding: isMobile ? '6px 16px' : '8px 20px',
              background: 'none',
              border: '1px solid #10B981',
              color: '#10B981',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: isMobile ? '13px' : '14px'
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
      
      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 
            'repeat(2, 1fr)' : // Mobile: 2 columns
            'repeat(auto-fill, minmax(250px, 1fr))', // Desktop: responsive
          gap: isMobile ? '12px' : '25px' // Smaller gap on mobile
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              background: '#f8fafc',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s'
            }}>
              <div style={{
                height: isMobile ? '180px' : '250px', // Smaller image on mobile
                position: 'relative',
                background: '#f9fafb'
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
                    fontSize: isMobile ? '32px' : '40px',
                    color: '#d1d5db'
                  }}>
                    {product.category === 'Jackets' && ''}
                    {product.category === 'Shirts' && ''}
                    {product.category === 'Trousers' && ''}
                    {product.category === 'T-Shirts' && ''}
                    {product.category === 'Dresses' && ''}
                    {product.category === 'Twinning' && ''}
                  </div>
                )}
                
                {/* Added to Cart Badge */}
                {addedItems[product.id] && (
                  <div style={{
                    position: 'absolute',
                    top: isMobile ? '6px' : '10px',
                    left: isMobile ? '6px' : '10px',
                    background: '#10B981',
                    color: 'white',
                    fontSize: isMobile ? '9px' : '10px',
                    fontWeight: 'bold',
                    padding: isMobile ? '3px 8px' : '5px 10px',
                    borderRadius: '4px',
                    zIndex: 2
                  }}>
                     Added
                  </div>
                )}
              </div>
              
              <div style={{ padding: isMobile ? '14px' : '20px' }}>
                <h3 style={{ 
                  fontSize: isMobile ? '14px' : '16px', 
                  fontWeight: '600', 
                  marginBottom: isMobile ? '6px' : '8px',
                  height: isMobile ? '36px' : 'auto',
                  overflow: 'hidden',
                  lineHeight: '1.3'
                }}>
                  {product.name}
                </h3>
                <p style={{ 
                  color: '#6B7280', 
                  fontSize: isMobile ? '12px' : '14px', 
                  marginBottom: isMobile ? '8px' : '8px' 
                }}>
                  {product.category}
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  flexWrap: isMobile ? 'wrap' : 'nowrap'
                }}>
                  <span style={{ 
                    fontSize: isMobile ? '16px' : '18px', 
                    fontWeight: 'bold', 
                    color: '#10B981',
                    marginBottom: isMobile ? '4px' : '0'
                  }}>
                    ${product.price}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    style={{
                      background: addedItems[product.id] ? '#10B981' : '#10B981',
                      color: 'white',
                      border: 'none',
                      padding: isMobile ? '6px 12px' : '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      opacity: addedItems[product.id] ? 0.8 : 1,
                      fontSize: isMobile ? '13px' : '14px',
                      width: isMobile ? '100%' : 'auto'
                    }}
                  >
                    {addedItems[product.id] ? ' Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: isMobile ? '40px 15px' : '60px 20px', 
          color: '#6b7280' 
        }}>
          <div style={{ 
            fontSize: isMobile ? '36px' : '48px', 
            marginBottom: isMobile ? '16px' : '20px' 
          }}>
            {selectedGender === 'boys' ? '' : selectedGender === 'girls' ? '' : ''}
          </div>
          <h3 style={{ 
            fontSize: isMobile ? '18px' : '20px', 
            marginBottom: isMobile ? '8px' : '10px' 
          }}>
            No products found
          </h3>
          <p style={{ fontSize: isMobile ? '14px' : '16px' }}>Try changing gender or category filters.</p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedGender('all');
            }}
            style={{
              marginTop: isMobile ? '16px' : '20px',
              padding: isMobile ? '8px 16px' : '10px 20px',
              background: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: isMobile ? '14px' : '16px'
            }}
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
}

// Main export with Suspense
export default function KidsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KidsPageContent />
    </Suspense>
  );
}