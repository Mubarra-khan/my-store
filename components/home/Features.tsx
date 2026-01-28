"use client";

import { useEffect, useState } from 'react';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: "🚚",
      title: "Free Shipping",
      description: "On all orders over $50",
      color: "#3B82F6"
    },
    {
      icon: "🔄",
      title: "Easy Returns",
      description: "30-day return policy",
      color: "#10B981"
    },
    {
      icon: "🔒",
      title: "Secure Payment",
      description: "100% secure transactions",
      color: "#8B5CF6"
    },
    {
      icon: "⭐",
      title: "Premium Quality",
      description: "Curated from top brands",
      color: "#F59E0B"
    }
  ];

  return (
    <>
      <section style={{ 
        padding: '80px 20px', 
        background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '60px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}>
            <h2 style={{ 
              fontSize: '36px', 
              fontWeight: 'bold', 
              marginBottom: '16px' 
            }}>
              Why Shop With Us
            </h2>
            <p style={{ 
              color: '#6B7280', 
              fontSize: '18px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              We're committed to providing the best shopping experience
            </p>
          </div>

          {/* Features Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '30px',
                  textAlign: 'center',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: isVisible ? `${index * 0.1}s` : '0s',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid #F3F4F6'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'translateY(-10px)';
                  card.style.boxShadow = `0 20px 40px ${feature.color}20, 0 10px 30px rgba(0,0,0,0.1)`;
                  card.style.borderColor = feature.color + '40';
                  
                  const icon = card.querySelector('.feature-icon') as HTMLElement;
                  if (icon) {
                    icon.style.transform = 'scale(1.15) rotate(5deg)';
                  }
                  
                  const underline = card.querySelector('.feature-underline') as HTMLElement;
                  if (underline) {
                    underline.style.transform = 'scaleX(1.5)';
                    underline.style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = isVisible ? 'translateY(0)' : 'translateY(30px)';
                  card.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
                  card.style.borderColor = '#F3F4F6';
                  
                  const icon = card.querySelector('.feature-icon') as HTMLElement;
                  if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                  }
                  
                  const underline = card.querySelector('.feature-underline') as HTMLElement;
                  if (underline) {
                    underline.style.transform = 'scaleX(0)';
                    underline.style.opacity = '0';
                  }
                }}
              >
                {/* Shine effect */}
                <div 
                  className="feature-shine"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                    transition: 'left 0.7s ease',
                    pointerEvents: 'none'
                  }}
                />
                
                {/* Icon */}
                <div 
                  className="feature-icon"
                  style={{
                    width: '70px',
                    height: '70px',
                    borderRadius: '50%',
                    background: feature.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    margin: '0 auto 20px',
                    transition: 'all 0.4s ease',
                    transform: 'scale(1) rotate(0deg)',
                    position: 'relative'
                  }}
                >
                  {/* Pulsing effect */}
                  <div 
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: feature.color + '15',
                      animation: 'pulse 2s infinite'
                    }}
                  />
                  <div 
                    style={{
                      position: 'relative',
                      zIndex: 2
                    }}
                  >
                    {feature.icon}
                  </div>
                </div>
                
                {/* Content */}
                <h3 style={{ 
                  fontSize: '20px', 
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  color: '#1F2937',
                  transition: 'color 0.3s ease'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: '#6B7280',
                  lineHeight: 1.6,
                  transition: 'color 0.3s ease'
                }}>
                  {feature.description}
                </p>
                
                {/* Animated underline */}
                <div 
                  className="feature-underline"
                  style={{
                    width: '40px',
                    height: '3px',
                    background: feature.color,
                    margin: '20px auto 0',
                    transform: 'scaleX(0)',
                    opacity: 0,
                    transition: 'all 0.4s ease',
                    borderRadius: '2px'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Add global styles */}
      <style jsx global>{`
        @keyframes pulse {
          0%, 100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.3;
          }
        }
        
        /* Apply shine effect on card hover */
        div[onMouseEnter]:hover .feature-shine {
          left: 100%;
        }
        
        /* Auto float animation for cards */
        @keyframes floatCards {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        /* Apply float animation to all feature cards */
        div[onMouseEnter] {
          animation: floatCards 4s ease-in-out infinite;
        }
        
        /* Staggered animation delays */
        div[onMouseEnter]:nth-child(1) {
          animation-delay: 0s;
        }
        
        div[onMouseEnter]:nth-child(2) {
          animation-delay: 0.5s;
        }
        
        div[onMouseEnter]:nth-child(3) {
          animation-delay: 1s;
        }
        
        div[onMouseEnter]:nth-child(4) {
          animation-delay: 1.5s;
        }
      `}</style>
    </>
  );
};

export default Features;