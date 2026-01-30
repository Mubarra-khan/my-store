"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { Suspense } from "react";

// Content component
function NewbornsPageContent() {
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
    if (queryCategory) {
      setSelectedCategory(queryCategory);
    } else {
      setSelectedCategory(null);
    }
  }, [queryCategory]);
  
  const generateProducts = () => {
    const categories = [
      { 
        displayName: "Baby Dresses", 
        folder: "dresses", 
        imagePrefix: "dress",
        count: 16,
        basePrice: 19.99
      }
    ];
    
    let products: any[] = [];
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
          gender: "newborn",
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
  
  const filteredProducts = products;

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
        Newborns Collection
      </h1>
      <p style={{ 
        color: "#6B7280", 
        marginBottom: "8px",
        fontSize: isMobile ? "14px" : "clamp(14px, 3vw, 16px)",
        textAlign: "center"
      }}>
        Adorable baby dresses for your little ones
      </p>
      <p style={{ 
        color: "#9CA3AF", 
        fontSize: isMobile ? "13px" : "14px", 
        marginBottom: isMobile ? "24px" : "32px",
        textAlign: "center"
      }}>
        {products.length} beautiful baby dresses available
      </p>
      
      <div style={{ 
        marginBottom: isMobile ? "24px" : "32px",
        padding: isMobile ? "16px" : "20px 16px",
        background: "linear-gradient(135deg, #FBBF24, #F59E0B)",
        borderRadius: "12px",
        color: "white",
        textAlign: "center"
      }}>
        <div style={{ 
          fontSize: isMobile ? "28px" : "clamp(36px, 8vw, 48px)", 
          marginBottom: isMobile ? "6px" : "8px" 
        }}>
          
        </div>
        <div style={{ 
          fontSize: isMobile ? "18px" : "clamp(20px, 5vw, 28px)", 
          fontWeight: "bold", 
          marginBottom: "4px" 
        }}>
          {products.length} Baby Dresses
        </div>
        <div style={{ 
          fontSize: isMobile ? "12px" : "13px", 
          opacity: 0.9,
          lineHeight: "1.4"
        }}>
          Size: 0-6 Months | Soft Cotton | Easy Care
        </div>
      </div>
      
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
              border: "2px solid #FBBF2420",
              transition: "transform 0.2s"
            }}>
              <div style={{
                height: isMobile ? "180px" : "250px", // Smaller image on mobile
                position: "relative",
                background: "#FFFBEB"
              }}>
                {!product.imageError ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      objectPosition: "center",
                      padding: isMobile ? "8px" : "10px"
                    }}
                    onError={() => handleImageError(product.id)}
                  />
                ) : (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: isMobile ? "32px" : "40px",
                    color: "#FBBF24",
                    background: "#FFFBEB"
                  }}>
                    <div></div>
                    <div style={{ 
                      fontSize: isMobile ? "12px" : "14px", 
                      marginTop: "8px", 
                      color: "#92400E" 
                    }}>
                      Baby Dress
                    </div>
                  </div>
                )}
                
                {addedItems[product.id] && (
                  <div style={{
                    position: "absolute",
                    top: isMobile ? "8px" : "10px",
                    left: isMobile ? "8px" : "10px",
                    background: "#F59E0B",
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
                  color: "#1f2937",
                  height: isMobile ? "36px" : "auto",
                  overflow: "hidden",
                  lineHeight: "1.3"
                }}>
                  {product.name}
                </h3>
                <p style={{ 
                  color: "#6B7280", 
                  fontSize: isMobile ? "13px" : "14px", 
                  marginBottom: isMobile ? "10px" : "12px"
                }}>
                  <span style={{ 
                    background: "#FEF3C7", 
                    color: "#92400E", 
                    padding: isMobile ? "3px 8px" : "4px 10px", 
                    borderRadius: "10px",
                    fontSize: isMobile ? "11px" : "12px"
                  }}>
                    Size: 0-6 Months
                  </span>
                </p>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #F3F4F6",
                  paddingTop: isMobile ? "12px" : "15px",
                  flexWrap: isMobile ? "wrap" : "nowrap"
                }}>
                  <div>
                    <span style={{ 
                      fontSize: isMobile ? "16px" : "18px", 
                      fontWeight: "bold", 
                      color: "#92400E",
                      display: "block",
                      marginBottom: isMobile ? "2px" : "0"
                    }}>
                      ${product.price}
                    </span>
                    <div style={{ 
                      fontSize: isMobile ? "11px" : "12px", 
                      color: "#9CA3AF" 
                    }}>
                      Free Shipping
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    style={{
                      background: addedItems[product.id] ? "#10B981" : "#FBBF24",
                      color: addedItems[product.id] ? "white" : "#92400E",
                      border: "none",
                      padding: isMobile ? "6px 12px" : "8px 16px",
                      borderRadius: "6px",
                      fontWeight: "600",
                      cursor: "pointer",
                      fontSize: isMobile ? "13px" : "14px",
                      width: isMobile ? "100%" : "auto",
                      marginTop: isMobile ? "8px" : "0"
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
            No baby products found
          </h3>
          <p style={{ fontSize: isMobile ? "14px" : "16px" }}>Check back soon for newborn essentials!</p>
        </div>
      )}
      
      <div style={{
        marginTop: isMobile ? "30px" : "50px",
        padding: isMobile ? "18px" : "25px",
        background: "#FFFBEB",
        borderRadius: "12px",
        borderLeft: "5px solid #FBBF24"
      }}>
        <h3 style={{ 
          fontSize: isMobile ? "16px" : "18px", 
          fontWeight: "bold", 
          marginBottom: isMobile ? "12px" : "15px",
          color: "#92400E",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
           Newborn Care Tips
        </h3>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: isMobile ? 
            "1fr" : // Mobile: single column
            "repeat(auto-fit, minmax(200px, 1fr))", // Desktop: responsive
          gap: isMobile ? "10px" : "15px",
          color: "#92400E"
        }}>
          <div style={{ fontSize: isMobile ? "13px" : "14px" }}>
            <strong>Soft Fabrics:</strong> 100% cotton for sensitive skin
          </div>
          <div style={{ fontSize: isMobile ? "13px" : "14px" }}>
            <strong>Easy Dressing:</strong> Snap buttons for quick changes
          </div>
          <div style={{ fontSize: isMobile ? "13px" : "14px" }}>
            <strong>Size Guide:</strong> 0-3M, 3-6M, 6-9M available
          </div>
          <div style={{ fontSize: isMobile ? "13px" : "14px" }}>
            <strong>Machine Washable:</strong> Easy care for busy parents
          </div>
        </div>
      </div>
    </div>
  );
}

// Main export with Suspense
export default function NewbornsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewbornsPageContent />
    </Suspense>
  );
}