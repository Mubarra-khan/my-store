// app/category/kids/page.tsx - WITH CARTPROVIDER
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/components/providers/CartProvider'; // 👈 ADD THIS

export default function KidsCategory() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});
  
  // 👇 USE CARTPROVIDER HOOK
  const { addToCart } = useCart();
  
  useEffect(() => {
    if (queryCategory) {
      setSelectedCategory(queryCategory);
    } else {
      setSelectedCategory(null);
    }
  }, [queryCategory]);
  
  const generateProducts = () => {
    const categories = [
      // BOYS SECTION
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
      
      // GIRLS SECTION
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
    
    let products = [];
    let id = 1;
    
    categories.forEach(category => {
      for (let i = category.startFrom; i < category.startFrom + category.count; i++) {
        const imagePath = `/products/kids/${category.gender}/${category.folder}/${category.imagePrefix}${i}.jpg`;
        
        products.push({
          id: id++,
          name: `${category.gender === 'boys' ? "Boy's" : "Girl's"} ${category.displayName} ${i}`,
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
  
  // 👇 UPDATED ADD TO CART FUNCTION
  const handleAddToCart = (product: any) => {
    try {
      // Use CartProvider's addToCart function
      addToCart({
        id: product.id, // ✅ FIXED: Number bhejein (string nahi)
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        category: product.category,
        gender: product.gender // ✅ ADDED: Gender include karein
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
  
  // Filter products
  const filteredProducts = products.filter(product => {
    const categoryMatch = !selectedCategory || selectedCategory === "All" || product.category === selectedCategory;
    const genderMatch = selectedGender === 'all' || product.gender === selectedGender;
    return categoryMatch && genderMatch;
  });

  // Calculate counts
  const boysCount = products.filter(p => p.gender === 'boys').length;
  const girlsCount = products.filter(p => p.gender === 'girls').length;
  const totalCount = products.length;

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>
        Kids Collection
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '40px' }}>
        Boys & Girls - Jackets, Shirts, Trousers, T-Shirts, Dresses, Twinning Sets
      </p>
      
      {/* Gender Filter */}
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <button
          onClick={() => setSelectedGender('all')}
          style={{
            padding: '10px 20px',
            borderRadius: '25px',
            border: '1px solid #d1d5db',
            background: selectedGender === 'all' ? '#10B981' : 'white',
            color: selectedGender === 'all' ? 'white' : '#374151',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
         All Kids
        </button>
        <button
          onClick={() => setSelectedGender('boys')}
          style={{
            padding: '10px 20px',
            borderRadius: '25px',
            border: '1px solid #d1d5db',
            background: selectedGender === 'boys' ? '#3B82F6' : 'white',
            color: selectedGender === 'boys' ? 'white' : '#374151',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Boys Only ({boysCount})
        </button>
        <button
          onClick={() => setSelectedGender('girls')}
          style={{
            padding: '10px 20px',
            borderRadius: '25px',
            border: '1px solid #d1d5db',
            background: selectedGender === 'girls' ? '#EC4899' : 'white',
            color: selectedGender === 'girls' ? 'white' : '#374151',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
           Girls Only ({girlsCount})
        </button>
      </div>
      
      {/* Category Filter Buttons */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px', 
        marginBottom: '30px'
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
                padding: '10px 20px',
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
                opacity: count === 0 ? 0.5 : 1
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
          marginBottom: '20px', 
          padding: '15px', 
          background: '#F0F9FF', 
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <span style={{ fontWeight: 'bold', color: '#10B981', fontSize: '16px' }}>
              {selectedGender === 'all' ? 'All Kids' : selectedGender === 'boys' ? 'Boys' : 'Girls'} 
              {selectedCategory && selectedCategory !== "All" ? ` • ${selectedCategory}` : ''}
            </span>
            <span style={{ marginLeft: '15px', color: '#6B7280' }}>
              ({filteredProducts.length} products)
            </span>
          </div>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedGender('all');
            }}
            style={{
              padding: '8px 15px',
              background: 'none',
              border: '1px solid #10B981',
              color: '#10B981',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
      
      {/* ✅ Products Grid */}
      {filteredProducts.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '25px'
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              background: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s'
            }}>
              <div style={{
                height: '250px',
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
                    fontSize: '40px',
                    color: '#d1d5db'
                  }}>
                    {product.category === 'Jackets' && '🧥'}
                    {product.category === 'Shirts' && '👔'}
                    {product.category === 'Trousers' && '👖'}
                    {product.category === 'T-Shirts' && '👕'}
                    {product.category === 'Dresses' && '👗'}
                    {product.category === 'Twinning' && '👭'}
                  </div>
                )}
                
                {/* Added to Cart Badge */}
                {addedItems[product.id] && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#10B981',
                    color: 'white',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    padding: '5px 10px',
                    borderRadius: '4px',
                    zIndex: 2
                  }}>
                    ✓ Added
                  </div>
                )}
              </div>
              
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                  {product.name}
                </h3>
                <p style={{ color: '#6B7280', fontSize: '14px', marginBottom: '8px' }}>
                  {product.category}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#10B981' }}>
                    ${product.price}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    style={{
                      background: addedItems[product.id] ? '#10B981' : '#10B981',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      opacity: addedItems[product.id] ? 0.8 : 1
                    }}
                  >
                    {addedItems[product.id] ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>
            {selectedGender === 'boys' ? '👦' : selectedGender === 'girls' ? '👧' : '👶'}
          </div>
          <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>
            No products found for selected filters
          </h3>
          <p>Try changing gender or category filters.</p>
          <button
            onClick={() => {
              setSelectedCategory(null);
              setSelectedGender('all');
            }}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: '#10B981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '600'
            }}
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
}