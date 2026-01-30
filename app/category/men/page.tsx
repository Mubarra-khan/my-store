"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { Suspense } from "react";

// Content component
function MenPageContent() {
  const searchParams = useSearchParams();
  const queryCategory = searchParams.get("category");
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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
    console.log("Query Category from URL:", queryCategory);
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
    
    let products: any[] = [];
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
          gender: "men",
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
      console.error("Error adding to cart:", error);
      alert("Could not add item to cart. Please try again.");
    }
  };
  
  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  console.log("Selected Category:", selectedCategory);
  console.log("All Categories:", categories);
  console.log("Total Products:", products.length);
  
  const filteredProducts = selectedCategory === "All" || !selectedCategory
    ? products
    : products.filter(product => {
        const match = product.category === selectedCategory;
        console.log(`Product: ${product.name}, Category: ${product.category}, Match: ${match}`);
        return match;
      });

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
        Men'\''s Collection
      </h1>
      <p style={{ 
        color: "#6B7280", 
        marginBottom: isMobile ? "24px" : "32px",
        fontSize: isMobile ? "14px" : "clamp(14px, 3vw, 16px)",
        textAlign: "center"
      }}>
        Premium clothing for men - Jackets, T-Shirts, Shirts, Hoodies, Suits & Trousers
      </p>
      
      <div style={{ 
        display: "flex", 
        flexWrap: "wrap", 
        gap: isMobile ? "6px" : "8px", 
        marginBottom: isMobile ? "20px" : "24px",
        paddingBottom: isMobile ? "16px" : "20px",
        borderBottom: "1px solid #e5e7eb",
        justifyContent: "center"
      }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === "All" ? null : cat)}
            style={{
              padding: isMobile ? "6px 12px" : "8px 14px",
              borderRadius: "25px",
              border: "1px solid #d1d5db",
              background: selectedCategory === cat || (cat === "All" && !selectedCategory) 
                ? "#111827" 
                : "white",
              color: selectedCategory === cat || (cat === "All" && !selectedCategory)
                ? "white"
                : "#374151",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
              fontSize: isMobile ? "12px" : "13px",
              whiteSpace: "nowrap",
              minWidth: isMobile ? "70px" : "80px",
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
          background: "#f8fafc",
          borderRadius: "10px",
          textAlign: "center"
        }}>
          <h2 style={{ 
            fontSize: isMobile ? "16px" : "18px", 
            fontWeight: "bold", 
            marginBottom: "4px" 
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
          <p style={{ 
            color: "#3B82F6", 
            fontSize: isMobile ? "11px" : "12px",
            marginTop: "4px"
          }}>
            Active Filter: {selectedCategory}
          </p>
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
              boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
            }}>
              <div style={{
                height: isMobile ? "180px" : "250px", // Smaller image on mobile
                position: "relative",
                overflow: "hidden",
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
                    {product.category === "Jackets" && ""}
                    {product.category === "Suits" && ""}
                    {product.category === "T-Shirts" && ""}
                    {product.category === "Hoodies" && ""}
                    {product.category === "Shirts" && ""}
                    {product.category === "Trousers" && ""}
                  </div>
                )}
                
                {addedItems[product.id] && (
                  <div style={{
                    position: "absolute",
                    top: isMobile ? "6px" : "10px",
                    left: isMobile ? "6px" : "10px",
                    background: "#10B981",
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
                  Category: {product.category}
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
                    marginBottom: isMobile ? "4px" : "0"
                  }}>
                    ${product.price}
                  </span>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    style={{
                      background: addedItems[product.id] ? "#10B981" : "#111827",
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
          <h3 style={{ 
            fontSize: isMobile ? "18px" : "20px", 
            marginBottom: isMobile ? "8px" : "10px" 
          }}>
            No products found in "{selectedCategory}"
          </h3>
          <p style={{ fontSize: isMobile ? "14px" : "16px" }}>Check the category name in URL and product data.</p>
        </div>
      )}
    </div>
  );
}

// Main export with Suspense
export default function MenPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenPageContent />
    </Suspense>
  );
}