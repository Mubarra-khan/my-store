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
        Newborns Collection
      </h1>
      <p style={{ 
        color: "#6B7280", 
        marginBottom: "8px",
        fontSize: "clamp(14px, 3vw, 16px)",
        textAlign: "center"
      }}>
        Adorable baby dresses for your little ones
      </p>
      <p style={{ 
        color: "#9CA3AF", 
        fontSize: "14px", 
        marginBottom: "32px",
        textAlign: "center"
      }}>
        {products.length} beautiful baby dresses available
      </p>
      
      <div style={{ 
        marginBottom: "32px",
        padding: "20px 16px",
        background: "linear-gradient(135deg, #FBBF24, #F59E0B)",
        borderRadius: "12px",
        color: "white",
        textAlign: "center"
      }}>
        <div style={{ 
          fontSize: "clamp(36px, 8vw, 48px)", 
          marginBottom: "8px" 
        }}>
          
        </div>
        <div style={{ 
          fontSize: "clamp(20px, 5vw, 28px)", 
          fontWeight: "bold", 
          marginBottom: "4px" 
        }}>
          {products.length} Baby Dresses
        </div>
        <div style={{ 
          fontSize: "13px", 
          opacity: 0.9,
          lineHeight: "1.4"
        }}>
          Size: 0-6 Months | Soft Cotton | Easy Care
        </div>
      </div>
      
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
              border: "2px solid #FBBF2420",
              transition: "transform 0.2s"
            }}>
              <div style={{
                height: "250px",
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
                      padding: "10px"
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
                    fontSize: "40px",
                    color: "#FBBF24",
                    background: "#FFFBEB"
                  }}>
                    <div></div>
                    <div style={{ fontSize: "14px", marginTop: "10px", color: "#92400E" }}>
                      Baby Dress
                    </div>
                  </div>
                )}
                
                {addedItems[product.id] && (
                  <div style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "#F59E0B",
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
                <h3 style={{ 
                  fontSize: "16px", 
                  fontWeight: "600", 
                  marginBottom: "8px",
                  color: "#1f2937"
                }}>
                  {product.name}
                </h3>
                <p style={{ 
                  color: "#6B7280", 
                  fontSize: "14px", 
                  marginBottom: "12px"
                }}>
                  <span style={{ 
                    background: "#FEF3C7", 
                    color: "#92400E", 
                    padding: "4px 10px", 
                    borderRadius: "10px",
                    fontSize: "12px"
                  }}>
                    Size: 0-6 Months
                  </span>
                </p>
                <div style={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px solid #F3F4F6",
                  paddingTop: "15px"
                }}>
                  <div>
                    <span style={{ 
                      fontSize: "18px", 
                      fontWeight: "bold", 
                      color: "#92400E" 
                    }}>
                      ${product.price}
                    </span>
                    <div style={{ fontSize: "12px", color: "#9CA3AF" }}>
                      Free Shipping
                    </div>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(product)}
                    style={{
                      background: addedItems[product.id] ? "#10B981" : "#FBBF24",
                      color: addedItems[product.id] ? "white" : "#92400E",
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
            No baby products found
          </h3>
          <p>Check back soon for newborn essentials!</p>
        </div>
      )}
      
      <div style={{
        marginTop: "50px",
        padding: "25px",
        background: "#FFFBEB",
        borderRadius: "12px",
        borderLeft: "5px solid #FBBF24"
      }}>
        <h3 style={{ 
          fontSize: "18px", 
          fontWeight: "bold", 
          marginBottom: "15px",
          color: "#92400E",
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
           Newborn Care Tips
        </h3>
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
          gap: "15px",
          color: "#92400E"
        }}>
          <div style={{ fontSize: "14px" }}>
            <strong>Soft Fabrics:</strong> 100% cotton for sensitive skin
          </div>
          <div style={{ fontSize: "14px" }}>
            <strong>Easy Dressing:</strong> Snap buttons for quick changes
          </div>
          <div style={{ fontSize: "14px" }}>
            <strong>Size Guide:</strong> 0-3M, 3-6M, 6-9M available
          </div>
          <div style={{ fontSize: "14px" }}>
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
