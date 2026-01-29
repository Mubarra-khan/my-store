"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/components/providers/CartProvider';

// ✅ All products data (same as your categories)
const allProducts = [
  // Men's Products
  ...Array.from({ length: 31 }, (_, i) => ({
    id: 2000 + i + 1,
    name: `Jackets ${i + 1}`,
    price: 89.99 + (i * 0.5),
    category: 'Jackets',
    gender: 'men',
    image: `/products/men/jackets/jacket${i + 1}.jpg`
  })),
  ...Array.from({ length: 6 }, (_, i) => ({
    id: 2100 + i + 1,
    name: `Suits ${i + 1}`,
    price: 249.99 + (i * 0.5),
    category: 'Suits',
    gender: 'men',
    image: `/products/men/suits/suit${i + 1}.jpg`
  })),
  ...Array.from({ length: 28 }, (_, i) => ({
    id: 2200 + i + 1,
    name: `T-Shirts ${i + 1}`,
    price: 24.99 + (i * 0.5),
    category: 'T-Shirts',
    gender: 'men',
    image: `/products/men/tshirts/tshirt${i + 1}.jpg`
  })),
  ...Array.from({ length: 28 }, (_, i) => ({
    id: 2300 + i + 1,
    name: `Hoodies ${i + 1}`,
    price: 59.99 + (i * 0.5),
    category: 'Hoodies',
    gender: 'men',
    image: `/products/men/hoodies/hoodie${i + 1}.jpg`
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 2400 + i + 1,
    name: `Shirts ${i + 1}`,
    price: 49.99 + (i * 0.5),
    category: 'Shirts',
    gender: 'men',
    image: `/products/men/shirts/shirt${i + 1}.jpg`
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: 2500 + i + 1,
    name: `Trousers ${i + 1}`,
    price: 69.99 + (i * 0.5),
    category: 'Trousers',
    gender: 'men',
    image: `/products/men/trousers/trouser${i + 1}.jpg`
  })),

  // Women's Products
  ...Array.from({ length: 53 }, (_, i) => ({
    id: 3000 + i + 1,
    name: `Dresses ${i + 1}`,
    price: 79.99 + (i * 0.5),
    category: 'Dresses',
    gender: 'women',
    image: `/products/women/elegantdress/elegant${i + 1}.jpg`
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: 3100 + i + 1,
    name: `Trousers ${i + 1}`,
    price: 49.99 + (i * 0.5),
    category: 'Trousers',
    gender: 'women',
    image: `/products/women/trousers/trouser${i + 1}.jpg`
  })),

  // Kids' Products
  ...Array.from({ length: 17 }, (_, i) => ({
    id: 1000 + i + 1,
    name: `Boy's Jackets ${i + 1}`,
    price: 34.99 + (i * 0.3),
    category: 'Jackets',
    gender: 'kids',
    image: `/products/kids/boys/jackets/jacket${i + 1}.jpg`
  })),
  ...Array.from({ length: 34 }, (_, i) => ({
    id: 1100 + i + 1,
    name: `Boy's Shirts ${i + 1}`,
    price: 24.99 + (i * 0.3),
    category: 'Shirts',
    gender: 'kids',
    image: `/products/kids/boys/shirts/shirt${i + 1}.jpg`
  })),
  ...Array.from({ length: 24 }, (_, i) => ({
    id: 1200 + i + 1,
    name: `Boy's Trousers ${i + 1}`,
    price: 29.99 + (i * 0.3),
    category: 'Trousers',
    gender: 'kids',
    image: `/products/kids/boys/trousers/trouser${i + 1}.jpg`
  })),
  ...Array.from({ length: 52 }, (_, i) => ({
    id: 1300 + i + 1,
    name: `Boy's T-Shirts ${i + 1}`,
    price: 19.99 + (i * 0.3),
    category: 'T-Shirts',
    gender: 'kids',
    image: `/products/kids/boys/tshirts/tshirt${i + 1}.jpg`
  })),
  ...Array.from({ length: 15 }, (_, i) => ({
    id: 1400 + i + 1,
    name: `Girl's Dresses ${i + 1}`,
    price: 39.99 + (i * 0.3),
    category: 'Dresses',
    gender: 'kids',
    image: `/products/kids/girls/dress/dress${i + 1}.jpg`
  })),
  ...Array.from({ length: 16 }, (_, i) => ({
    id: 1500 + i + 1,
    name: `Girl's Shirts ${i + 1}`,
    price: 27.99 + (i * 0.3),
    category: 'Shirts',
    gender: 'kids',
    image: `/products/kids/girls/shirts/shirt${i + 1}.jpg`
  })),
  ...Array.from({ length: 16 }, (_, i) => ({
    id: 1600 + i + 1,
    name: `Girl's Trousers ${i + 1}`,
    price: 32.99 + (i * 0.3),
    category: 'Trousers',
    gender: 'kids',
    image: `/products/kids/girls/trousers/trouser${i + 1}.jpg`
  })),
  ...Array.from({ length: 4 }, (_, i) => ({
    id: 1700 + i + 1,
    name: `Girl's Twinning ${i + 1}`,
    price: 49.99 + (i * 0.3),
    category: 'Twinning',
    gender: 'kids',
    image: `/products/kids/girls/twinning/twinning${i + 1}.jpg`
  })),

  // Newborns Products
  ...Array.from({ length: 16 }, (_, i) => ({
    id: 4000 + i + 1,
    name: `Baby Dress ${i + 1}`,
    price: 19.99 + (i * 0.5),
    category: 'Baby Dresses',
    gender: 'newborn',
    image: `/products/newborns/dresses/dress${i + 1}.jpg`
  })),
];

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const query = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(query);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});

  // ✅ Search products when query changes
  useEffect(() => {
    if (query) {
      setSearchTerm(query);
      performSearch(query);
    }
  }, [query]);

  const performSearch = (term: string) => {
    if (!term.trim()) {
      setFilteredProducts([]);
      return;
    }

    const searchTermLower = term.toLowerCase();
    
    const results = allProducts.filter(product => {
      return (
        product.name.toLowerCase().includes(searchTermLower) ||
        product.category.toLowerCase().includes(searchTermLower) ||
        product.gender.toLowerCase().includes(searchTermLower)
      );
    });

    setFilteredProducts(results);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleAddToCart = (product: any) => {
    try {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
        gender: product.gender
      });
      
      setAddedItems(prev => ({ ...prev, [product.id]: true }));
      
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [product.id]: false }));
      }, 2000);
      
      alert(`✓ ${product.name} added to cart!`);
      
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Could not add item to cart. Please try again.');
    }
  };

  const getGenderColor = (gender: string) => {
    switch(gender) {
      case 'men': return '#3B82F6';
      case 'women': return '#EC4899';
      case 'kids': return '#10B981';
      case 'newborn': return '#F59E0B';
      default: return '#8B5CF6';
    }
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1280px', margin: '0 auto', minHeight: '70vh' }}>
      {/* Search Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '10px' }}>
          🔍 Search Results
        </h1>
        
        {/* Search Form */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products, categories..."
            style={{
              flex: 1,
              padding: '15px 20px',
              border: '2px solid #E5E7EB',
              borderRadius: '10px',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Search
          </button>
        </form>

        {query && (
          <p style={{ color: '#6B7280', fontSize: '16px' }}>
            Showing results for: <strong>"{query}"</strong> 
            <span style={{ marginLeft: '15px' }}>
              ({filteredProducts.length} products found)
            </span>
          </p>
        )}
      </div>

      {/* Results */}
      {query ? (
        filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '25px'
          }}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={{
                background: '#FFFFFF',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                border: '1px solid #F1F5F9',
                borderLeft: `3px solid ${getGenderColor(product.gender)}`,
                transition: 'all 0.3s ease'
              }}>
                {/* Product Image */}
                <div style={{
                  height: '200px',
                  background: '#F9FAFB',
                  backgroundImage: `url(${product.image})`,
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  position: 'relative',
                  borderBottom: '1px solid #F3F4F6'
                }}>
                  {/* Gender Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: getGenderColor(product.gender),
                    color: 'white',
                    fontSize: '9px',
                    fontWeight: 'bold',
                    padding: '3px 8px',
                    borderRadius: '3px',
                    zIndex: 3,
                    opacity: 0.9
                  }}>
                    {product.gender?.toUpperCase()}
                  </div>

                  {/* Added to Cart Badge */}
                  {addedItems[product.id] && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#10B981',
                      color: 'white',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      padding: '3px 8px',
                      borderRadius: '3px',
                      zIndex: 3
                    }}>
                      ✓ Added
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div style={{ padding: '16px' }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    marginBottom: '6px',
                    color: '#1F2937'
                  }}>
                    {product.name}
                  </h3>
                  <p style={{ 
                    color: '#6B7280', 
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    marginBottom: '4px'
                  }}>
                    {product.category}
                  </p>
                  
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '12px'
                  }}>
                    <div>
                      <span style={{ 
                        fontSize: '18px', 
                        fontWeight: 'bold',
                        color: '#1F2937'
                      }}>
                        ${product.price.toFixed(2)}
                      </span>
                      <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                        {product.gender === 'men' ? "Men's" : 
                         product.gender === 'women' ? "Women's" : 
                         product.gender === 'kids' ? "Kids" : 
                         product.gender === 'newborn' ? "Baby" : "Product"}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(product)}
                      style={{
                        background: addedItems[product.id] 
                          ? '#10B981' 
                          : 'linear-gradient(135deg, #8B5CF6, #EC4899)',
                        color: 'white',
                        border: 'none',
                        padding: '7px 14px',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        fontSize: '12px'
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
              🔍
            </div>
            <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>
              No products found for "{query}"
            </h3>
            <p>Try different keywords or browse categories.</p>
            <div style={{ marginTop: '30px', display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Link href="/category/men" style={{
                padding: '10px 20px',
                background: '#3B82F6',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none'
              }}>
                Men's Collection
              </Link>
              <Link href="/category/women" style={{
                padding: '10px 20px',
                background: '#EC4899',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none'
              }}>
                Women's Collection
              </Link>
              <Link href="/category/kids" style={{
                padding: '10px 20px',
                background: '#10B981',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none'
              }}>
                Kids Collection
              </Link>
            </div>
          </div>
        )
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>
            🔍
          </div>
          <h3 style={{ fontSize: '24px', marginBottom: '10px' }}>
            Search for Products
          </h3>
          <p>Enter keywords in the search box above to find products.</p>
          
          {/* Search Suggestions */}
          <div style={{ marginTop: '30px' }}>
            <h4 style={{ marginBottom: '15px', color: '#374151' }}>Try searching for:</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
              {['Jackets', 'Dresses', 'T-Shirts', 'Suits', 'Hoodies', 'Baby Dress', 'Women Trousers', 'Kids Jacket'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchTerm(term);
                    router.push(`/search?q=${encodeURIComponent(term)}`);
                  }}
                  style={{
                    padding: '8px 15px',
                    background: '#F3F4F6',
                    border: '1px solid #E5E7EB',
                    borderRadius: '20px',
                    color: '#374151',
                    cursor: 'pointer'
                  }}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}