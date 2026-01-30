"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { Suspense } from "react";

// Content component
function WomenPageContent() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<{[key: number]: boolean}>({});
  const [isMobile, setIsMobile] = useState(false);
  
  // @ts-ignore
  const { addToCart, cart } = useCart();
  
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
  
  useEffect(() => {
    console.log(" Women - Current cart items:", cart);
    console.log(" Women - Total items in cart:", cart?.length || 0);
  }, [cart]);
  
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
    
    let products: any[] = [];
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
          gender: "women",
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
      console.log(" Women - Adding product to cart:", product);
      
      const cartItem = {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        category: product.category,
        gender: product.gender || "women"
      };
      
      console.log(" Women - Cart item being sent to CartProvider:", cartItem);
      
      addToCart(cartItem);
      
      setAddedItems(prev => ({ ...prev, [product.id]: true }));
      
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [product.id]: false }));
      }, 2000);
      
      alert(` ${product.name} added to cart!`);
      
      setTimeout(() => {
        console.log(" Women - Cart after adding:", cart);
      }, 100);
      
    } catch (error) {
      console.error(" Women - Error adding to cart:", error);
      alert("Could not add item to cart. Please try again.");
    }
  };
  
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === "All" || !selectedCategory
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div style={{ 
      maxWidth: "1280px", 
      margin: "0 auto", 
      padding: isMobile ? "15px 12px" : "20px 16px",
      width: "100%",
      boxSizing: "border-box"
    }}>
      <h1 style={{ 
        fontSize: isMobile ? "24px" : "clamp(24px, 5vw, 36px)", 
        fontWeight: "bold", 
        marginBottom: "8px",
        textAlign: "center"
      }}>
        Women'\''s Collection
      </h1>
      <p style={{ 
        color: "#6B7280", 
        marginBottom: isMobile ? "24px" : "32px",
        fontSize: isMobile ? "14px" : "clamp(14px, 3vw, 16px)",
        textAlign: "center"
      }}>
        Elegant Dresses & Trousers for women
      </p>
      
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: isMobile ? "6px" : "8px", 
        marginBottom: isMobile ? "20px" : "24px",
        justifyContent: "center"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
            style={{
              padding: isMobile ? "6px 12px" : "8px 16px",
              borderRadius: "25px",
              border: "1px solid #d1d5db",
              background: selectedCategory === cat || (cat === "All" && !selectedCategory) 
                ? "#EC4899" 
                : "white",
              color: selectedCategory === cat || (cat === "All" && !selectedCategory)
                ? "white"
                : "#374151",
              fontWeight: "600",
              cursor: "pointer",
              fontSize: isMobile ? "12px" : "13px",
              whiteSpace: "nowrap",
              minWidth: isMobile ? "80px" : "90px",
              textAlign: "center"
            }}
          >
            {cat} {cat !== "All" && `(${products.filter(p => p.category === cat).length})`}
          </button>
        ))}
      </div>
      
      {selectedCategory && selectedCategory !== "All" && (
        <div style={{ 
          marginBottom: isMobile ? "20px" : "24px", 
          padding: isMobile ? "12px" : "16px",
          background: "#fdf2f8",
          borderRadius: "10px",
          textAlign: "center"
        }}>
          <h2 style={{ 
            fontSize: isMobile ? "16px" : "18px", 
            fontWeight: "bold", 
            marginBottom: "4px",
            color: "#EC4899"
          }}>
            {selectedCategory} 
            <span style={{ 
              color: "#6B7280", 
              fontSize: isMobile ? "13px" : "14px", 
              marginLeft: "8px",
              fontWeight: "normal"
            }}>
              ({filteredProducts.length} products)
            </span>
          </h2>
        </div>
      )}
      
      {filteredProducts.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? 
            "repeat(2, 1fr)" : // Mobile: 2 columns
            "repeat(auto-fill, minmax(250px, 1fr))", // Desktop: responsive
          gap: isMobile ? "12px" : "25px" // Smaller gap on mobile
        }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              background: "white",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
              transition: "transform 0.2s"
            }}>
              <div style={{
                height: isMobile ? "180px" : "250px", // Smaller image on mobile
                position: "relative",
                background: "#f9fafb"
              }}>
                {!product.imageError ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center"
                    }}
                    onError={() => handleImageError(product.id)}
                  />
                ) : (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "32px" : "40px",
                    color: "#d1d5db"
                  }}>
                    {product.category === "Dresses" && ""}
                    {product.category === "Trousers" && ""}
                  </div>
                )}
                
                {addedItems[product.id] && (
                  <div style={{
                    position: "absolute",
                    top: isMobile ? "8px" : "10px",
                    left: isMobile ? "8px" : "10px",
                    background: "#EC4899",
                    color: "white",
                    fontSize: isMobile ? "9px" : "10px",
                    fontWeight: "bold",
                    padding: isMobile ? "3px 8px" : "5px 10px",
                    borderRadius: "4px",
                    zIndex: 2
                  }}>
                     Added
                  </div>
                )}
              </div>
              
              <div style={{ padding: isMobile ? "14px" : "20px" }}>
                <h3 style={{ 
                  fontSize: isMobile ? "14px" : "16px", 
                  fontWeight: "600", 
                  marginBottom: isMobile ? "6px" : "8px",
                  height: isMobile ? "36px" : "auto",
                  overflow: "hidden",
                  lineHeight: "1.3"
                }}>
                  {product.name}
                </h3>
                <p style={{ 
                  color: "#6B7280", 
                  fontSize: isMobile ? "12px" : "14px", 
                  marginBottom: isMobile ? "6px" : "8px" 
                }}>
                  {product.category}
                </p>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  alignItems: "center",
                  flexWrap: isMobile ? "wrap" : "nowrap"
                }}>
                  <span style={{ 
                    fontSize: isMobile ? "16px" : "18px", 
                    fontWeight: "bold", 
                    color: "#EC4899",
                    marginBottom: isMobile ? "4px" : "0"
                  }}>
                    ${product.price}
                  </span>
                  <button 
                    onClick={() => {
                      console.log(" Women - Button clicked for product ID:", product.id);
                      handleAddToCart(product);
                    }}
                    style={{
                      background: addedItems[product.id] ? "#10B981" : "#EC4899",
                      color: "white",
                      border: "none",
                      padding: isMobile ? "6px 12px" : "8px 16px",
                      borderRadius: "6px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: isMobile ? "13px" : "14px",
                      width: isMobile ? "100%" : "auto"
                    }}
                  >
                    {addedItems[product.id] ? " Added" : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ 
          textAlign: "center", 
          padding: isMobile ? "40px 15px" : "60px 20px", 
          color: "#6b7280" 
        }}>
          <div style={{ 
            fontSize: isMobile ? "36px" : "48px", 
            marginBottom: isMobile ? "16px" : "20px" 
          }}>
            
          </div>
          <h3 style={{ 
            fontSize: isMobile ? "18px" : "20px", 
            marginBottom: isMobile ? "8px" : "10px" 
          }}>
            No products found
          </h3>
          <p style={{ fontSize: isMobile ? "14px" : "16px" }}>Check the category name in URL and product data.</p>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              marginTop: isMobile ? "16px" : "20px",
              padding: isMobile ? "8px 16px" : "10px 20px",
              background: "#EC4899",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: isMobile ? "14px" : "16px"
            }}
          >
            Show All Products
          </button>
        </div>
      )}
      
      {!isMobile && (
        <div style={{
          marginTop: "40px",
          padding: "15px",
          background: "#F3F4F6",
          borderRadius: "8px",
          fontSize: "14px",
          color: "#374151"
        }}>
          <div style={{ fontWeight: "bold", marginBottom: "8px" }}>Debug Info:</div>
          <div>Total Products: {products.length}</div>
          <div>Cart Items Count: {cart?.length || 0}</div>
          <div>Selected Category: {selectedCategory || "All"}</div>
        </div>
      )}
    </div>
  );
}

// Main export with Suspense
export default function WomenPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <WomenPageContent />
    </Suspense>
  );
}