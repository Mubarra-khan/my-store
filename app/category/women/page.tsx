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
  
  // @ts-ignore
  const { addToCart, cart } = useCart();
  
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
      padding: "20px 16px",
      width: "100%",
      boxSizing: "border-box"
    }}>
      <h1 style={{ 
        fontSize: "clamp(24px, 5vw, 36px)", 
        fontWeight: "bold", 
        marginBottom: "8px",
        textAlign: "center"
      }}>
        Women'\''s Collection
      </h1>
      <p style={{ 
        color: "#6B7280", 
        marginBottom: "32px",
        fontSize: "clamp(14px, 3vw, 16px)",
        textAlign: "center"
      }}>
        Elegant Dresses & Trousers for women
      </p>
      
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: "8px", 
        marginBottom: "24px",
        justifyContent: "center"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
            style={{
              padding: "8px 16px",
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
              fontSize: "13px",
              whiteSpace: "nowrap",
              minWidth: "90px",
              textAlign: "center"
            }}
          >
            {cat} {cat !== "All" && `(${products.filter(p => p.category === cat).length})`}
          </button>
        ))}
      </div>
      
      {selectedCategory && selectedCategory !== "All" && (
        <div style={{ 
          marginBottom: "24px", 
          padding: "16px",
          background: "#fdf2f8",
          borderRadius: "10px",
          textAlign: "center"
        }}>
          <h2 style={{ 
            fontSize: "18px", 
            fontWeight: "bold", 
            marginBottom: "4px",
            color: "#EC4899"
          }}>
            {selectedCategory} 
            <span style={{ 
              color: "#6B7280", 
              fontSize: "14px", 
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
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px"
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
                height: "250px",
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
                    fontSize: "40px",
                    color: "#d1d5db"
                  }}>
                    {product.category === "Dresses" && ""}
                    {product.category === "Trousers" && ""}
                  </div>
                )}
                
                {addedItems[product.id] && (
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "#EC4899",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "bold",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    zIndex: 2
                  }}>
                     Added
                  </div>
                )}
              </div>
              
              <div style={{ padding: "20px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "8px" }}>
                  {product.name}
                </h3>
                <p style={{ color: "#6B7280", fontSize: "14px", marginBottom: "8px" }}>
                  {product.category}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "18px", fontWeight: "bold", color: "#EC4899" }}>
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
                      padding: "8px 16px",
                      borderRadius: "6px",
                      fontWeight: "600",
                      cursor: "pointer"
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
        <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7280" }}>
          <div style={{ fontSize: "48px", marginBottom: "20px" }}>
            
          </div>
          <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
            No products found
          </h3>
          <p>Check the category name in URL and product data.</p>
          <button
            onClick={() => setSelectedCategory(null)}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              background: "#EC4899",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            Show All Products
          </button>
        </div>
      )}
      
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
