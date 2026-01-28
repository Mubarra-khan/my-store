"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/components/providers/CartProvider';

export default function WomenCategory() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get('category');
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});
  
  // ✅ CartProvider hook - cart bhi include karein for debugging
  const { addToCart, cart } = useCart();
  
  useEffect(() => {
    if (queryCategory) {
      setSelectedCategory(queryCategory);
    } else {
      setSelectedCategory(null);
    }
  }, [queryCategory]);
  
  // ✅ Debug: Cart ki state check karein
  useEffect(() => {
    console.log("🛍️ Women - Current cart items:", cart);
    console.log("🛍️ Women - Total items in cart:", cart?.length || 0);
  }, [cart]);
  
  // ✅ Women ke products - 2 folders
  const generateProducts = () => {
    const categories = [
      { 
        displayName: "Dresses", 
        folder: "elegantdress",
        imagePrefix: "elegant",
        count: 53, 
        basePrice: 79.99 
      },
      { 
        displayName: "Trousers", 
        folder: "trousers", 
        imagePrefix: "trouser",
        count: 12, 
        basePrice: 49.99 
      }
    ];
    
    let products = [];
    let id = 3000;
    
    categories.forEach(category => {
      for (let i = 1; i <= category.count; i++) {
        const imagePath = `/products/women/${category.folder}/${category.imagePrefix}${i}.jpg`;
        
        products.push({
          id: id++,
          name: `${category.displayName} ${i}`,
          price: (Number(category.basePrice) + (i * 0.5)).toFixed(2),
          image: imagePath,
          category: category.displayName,
          gender: "women", // ✅ MUST HAVE THIS
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
  
  // ✅ UPDATED: Enhanced add to cart function with better debugging
  const handleAddToCart = (product: any) => {
    try {
      console.log("🛒 Women - Adding product to cart:", product);
      
      // Kids ke format mein exact same item banaein
      const cartItem = {
        id: product.id, // ✅ Number - exactly like kids
        name: product.name,
        price: parseFloat(product.price), // ✅ parseFloat use karein
        image: product.image,
        category: product.category,
        gender: product.gender || "women" // ✅ Ensure gender exists
      };
      
      console.log("📦 Women - Cart item being sent to CartProvider:", cartItem);
      
      // CartProvider ka addToCart function
      addToCart(cartItem);
      
      // Show feedback
      setAddedItems(prev => ({ ...prev, [product.id]: true }));
      
      // Reset after 2 seconds
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [product.id]: false }));
      }, 2000);
      
      // Show success message
      alert(`✓ ${product.name} added to cart!`);
      
      // Cart ki updated state check karein
      setTimeout(() => {
        console.log("🔄 Women - Cart after adding:", cart);
      }, 100);
      
    } catch (error) {
      console.error('❌ Women - Error adding to cart:', error);
      alert('Could not add item to cart. Please try again.');
    }
  };
  
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === "All" || !selectedCategory
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '10px' }}>
         Women's Collection
      </h1>
      <p style={{ color: '#6B7280', marginBottom: '40px' }}>
        Elegant Dresses & Trousers for women
      </p>
      
      {/* Category Filter Buttons */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '10px', 
        marginBottom: '30px'
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
            style={{
              padding: '10px 20px',
              borderRadius: '25px',
              border: '1px solid #d1d5db',
              background: selectedCategory === cat || (cat === "All" && !selectedCategory) 
                ? '#EC4899' 
                : 'white',
              color: selectedCategory === cat || (cat === "All" && !selectedCategory)
                ? 'white'
                : '#374151',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {cat} {cat !== "All" && `(${products.filter(p => p.category === cat).length})`}
          </button>
        ))}
      </div>
      
      {selectedCategory && selectedCategory !== "All" && (
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '5px' }}>
            {selectedCategory} ({filteredProducts.length} products)
          </h2>
        </div>
      )}
      
      {/* Products Grid */}
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
              boxShadow: '0 4px 15px rgba(0,0,0,0.08)'
            }}>
              <div style={{
                height: '300px',
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
                    {product.category === 'Dresses' && '👗'}
                    {product.category === 'Trousers' && '👖'}
                  </div>
                )}
                
                {/* Added to Cart Badge */}
                {addedItems[product.id] && (
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: '#EC4899',
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#EC4899' }}>
                    ${product.price}
                  </span>
                  <button 
                    onClick={() => {
                      console.log("🟣 Women - Button clicked for product ID:", product.id);
                      handleAddToCart(product);
                    }}
                    style={{
                      background: addedItems[product.id] ? '#10B981' : '#EC4899',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontWeight: '600',
                      cursor: 'pointer'
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
          <p>No products found.</p>
        </div>
      )}
      
      {/* Debug Info Panel */}
      <div style={{
        marginTop: '40px',
        padding: '15px',
        background: '#F3F4F6',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#374151'
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Debug Info:</div>
        <div>Total Products: {products.length}</div>
        <div>Cart Items Count: {cart?.length || 0}</div>
        <div>Selected Category: {selectedCategory || 'All'}</div>
      </div>
    </div>
  );
}