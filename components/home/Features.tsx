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
        padding: 'clamp(40px, 8vw, 80px) clamp(16px, 4vw, 20px)', 
        background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Header */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: 'clamp(30px, 6vw, 60px)',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(24px, 5vw, 36px)', 
              fontWeight: 'bold', 
              marginBottom: 'clamp(12px, 2vw, 16px)',
              lineHeight: 1.2
            }}>
              Why Shop With Us
            </h2>
            <p style={{ 
              color: '#6B7280', 
              fontSize: 'clamp(16px, 3vw, 18px)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.5
            }}>
              We're committed to providing the best shopping experience
            </p>
          </div>

          {/* Features Grid - Mobile: 2 in a row, Desktop: 4 */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 'clamp(12px, 2vw, 30px)',
            width: '100%',
            boxSizing: 'border-box'
          }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{
                  background: 'white',
                  borderRadius: 'clamp(10px, 2vw, 16px)',
                  padding: 'clamp(16px, 3vw, 30px)',
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: isVisible ? `${index * 0.1}s` : '0s',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: '1px solid #F3F4F6',
                  minHeight: '180px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
                onMouseEnter={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'translateY(-8px)';
                  card.style.boxShadow = `0 15px 30px ${feature.color}20, 0 8px 20px rgba(0,0,0,0.1)`;
                  card.style.borderColor = feature.color + '40';
                  
                  const icon = card.querySelector('.feature-icon') as HTMLElement;
                  if (icon) {
                    icon.style.transform = 'scale(1.12) rotate(4deg)';
                  }
                  
                  const underline = card.querySelector('.feature-underline') as HTMLElement;
                  if (underline) {
                    underline.style.transform = 'scaleX(1.3)';
                    underline.style.opacity = '1';
                  }
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = isVisible ? 'translateY(0)' : 'translateY(20px)';
                  card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
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
                onTouchStart={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'translateY(-4px)';
                  card.style.boxShadow = `0 8px 16px ${feature.color}20, 0 4px 10px rgba(0,0,0,0.1)`;
                  card.style.borderColor = feature.color + '40';
                  card.style.transition = 'all 0.2s ease';
                  
                  const icon = card.querySelector('.feature-icon') as HTMLElement;
                  if (icon) {
                    icon.style.transform = 'scale(1.08) rotate(2deg)';
                  }
                  
                  const underline = card.querySelector('.feature-underline') as HTMLElement;
                  if (underline) {
                    underline.style.transform = 'scaleX(1.1)';
                    underline.style.opacity = '1';
                  }
                }}
                onTouchEnd={(e) => {
                  const card = e.currentTarget;
                  setTimeout(() => {
                    card.style.transform = isVisible ? 'translateY(0)' : 'translateY(20px)';
                    card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                    card.style.borderColor = '#F3F4F6';
                    card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    
                    const icon = card.querySelector('.feature-icon') as HTMLElement;
                    if (icon) {
                      icon.style.transform = 'scale(1) rotate(0deg)';
                    }
                    
                    const underline = card.querySelector('.feature-underline') as HTMLElement;
                    if (underline) {
                      underline.style.transform = 'scaleX(0)';
                      underline.style.opacity = '0';
                    }
                  }, 150);
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
                    width: 'clamp(50px, 10vw, 65px)',
                    height: 'clamp(50px, 10vw, 65px)',
                    borderRadius: '50%',
                    background: feature.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'clamp(24px, 4vw, 30px)',
                    margin: '0 auto clamp(12px, 2vw, 18px)',
                    transition: 'all 0.4s ease',
                    transform: 'scale(1) rotate(0deg)',
                    position: 'relative',
                    flexShrink: 0
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
                      background: feature.color + '15'
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
                  fontSize: 'clamp(16px, 3vw, 18px)', 
                  fontWeight: 'bold',
                  marginBottom: 'clamp(6px, 1vw, 10px)',
                  color: '#1F2937',
                  transition: 'color 0.3s ease',
                  lineHeight: 1.3
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: '#6B7280',
                  lineHeight: 1.5,
                  transition: 'color 0.3s ease',
                  fontSize: 'clamp(13px, 2.2vw, 15px)',
                  margin: 0
                }}>
                  {feature.description}
                </p>
                
                {/* Animated underline */}
                <div 
                  className="feature-underline"
                  style={{
                    width: 'clamp(25px, 5vw, 35px)',
                    height: '2px',
                    background: feature.color,
                    margin: 'clamp(12px, 2vw, 18px) auto 0',
                    transform: 'scaleX(0)',
                    opacity: 0,
                    transition: 'all 0.4s ease',
                    borderRadius: '1px'
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
            transform: translateY(-6px);
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
        
        /* Pulsing effect for icons */
        .feature-icon > div:first-child {
          animation: pulse 2s infinite;
        }
        
        /* Mobile-specific styles */
        @media (max-width: 768px) {
          div[onMouseEnter] {
            min-height: 160px;
          }
          
          .feature-icon {
            margin-bottom: 10px !important;
          }
          
          h3 {
            margin-bottom: 6px !important;
          }
          
          p {
            font-size: 13px !important;
            line-height: 1.4 !important;
          }
        }
        
        @media (max-width: 480px) {
          div[onMouseEnter] {
            min-height: 150px;
            padding: 14px !important;
          }
          
          .feature-icon {
            width: 45px !important;
            height: 45px !important;
            font-size: 20px !important;
            margin-bottom: 8px !important;
          }
          
          h3 {
            font-size: 15px !important;
            margin-bottom: 4px !important;
          }
          
          p {
            font-size: 12px !important;
          }
          
          .feature-underline {
            margin-top: 10px !important;
          }
        }
        
        /* Extra small devices */
        @media (max-width: 360px) {
          div[onMouseEnter] {
            min-height: 140px;
            padding: 12px !important;
          }
          
          .feature-icon {
            width: 40px !important;
            height: 40px !important;
            font-size: 18px !important;
            margin-bottom: 6px !important;
          }
          
          h3 {
            font-size: 14px !important;
          }
          
          p {
            font-size: 11px !important;
          }
        }
      `}</style>
    </>
  );
};

export default Features;