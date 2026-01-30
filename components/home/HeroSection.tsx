"use client";

const HeroSection = () => {
  return (
    <section style={{
      position: 'relative',
      height: '600px',
      overflow: 'hidden'
    }}>
      {/* Background Image with Hover Animation */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/categories/men-banner.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
          transition: 'transform 0.7s ease, filter 0.7s ease',
        }} 
        className="hover-scale-bg"
      />
      
      {/* Gradient Overlay with Hover Effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)',
        transition: 'background 0.5s ease',
      }}
      className="gradient-overlay"
      />
      
      {/* Animated floating elements */}
      <div className="floating-element" style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '50px',
        height: '50px',
        background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
        borderRadius: '50%',
        opacity: 0.3,
        animation: 'float 8s ease-in-out infinite'
      }} />
      
      <div className="floating-element" style={{
        position: 'absolute',
        top: '40%',
        right: '15%',
        width: '40px',
        height: '40px',
        background: 'linear-gradient(135deg, #ec4899, #f59e0b)',
        borderRadius: '50%',
        opacity: 0.2,
        animation: 'float 6s ease-in-out infinite 1s'
      }} />
      
      <div className="floating-element" style={{
        position: 'absolute',
        bottom: '30%',
        left: '15%',
        width: '30px',
        height: '30px',
        background: 'linear-gradient(135deg, #10b981, #3b82f6)',
        borderRadius: '50%',
        opacity: 0.25,
        animation: 'float 7s ease-in-out infinite 2s'
      }} />
      
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1280px',
        margin: '0 auto',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <div style={{ color: 'white', maxWidth: '600px' }}>
          {/* Badge with hover animation */}
          <span 
            style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              padding: '8px 20px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 'bold',
              marginBottom: '20px',
              border: '1px solid rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transform: 'translateY(0)',
              transition: 'all 0.3s ease'
            }}
            className="hover-badge"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 20px rgba(255,255,255,0.1)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
            }}
          >
            <span style={{
              display: 'inline-block',
              animation: 'pulse 2s infinite'
            }}>
              🎉
            </span>
            SUMMER SALE UP TO 50% OFF
          </span>
          
          {/* Animated Title */}
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            lineHeight: 1.2,
            opacity: 0,
            animation: 'fadeInUp 0.8s ease forwards 0.2s'
          }}>
            Premium Fashion
            <br />
            <span 
              style={{
                background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                transform: 'translateY(0)',
                transition: 'transform 0.3s ease'
              }}
              className="gradient-text"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              For Everyone
            </span>
          </h1>
          
          {/* Animated Description */}
          <p style={{
            fontSize: '18px',
            
            marginBottom: '40px',
            lineHeight: 1.6,
            opacity: 0,
            animation: 'fadeInUp 0.8s ease forwards 0.4s'
          }}>
            Discover the latest trends in men's, women's, and kids fashion. 
            Quality clothing that combines style with comfort.
          </p>
          
          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {/* Primary Button with Hover Effects */}
            <button 
              style={{
                background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
                color: 'white',
                border: 'none',
                padding: '16px 40px',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
                transform: 'translateY(0)',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1,
                opacity: 0,
                animation: 'fadeInUp 0.8s ease forwards 0.6s'
              }}
              className="primary-btn"
              onMouseEnter={(e) => {
                const btn = e.currentTarget;
                btn.style.transform = 'translateY(-4px)';
                btn.style.boxShadow = '0 15px 35px rgba(139, 92, 246, 0.4)';
                
                // Create ripple effect
                const ripple = document.createElement('span');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.zIndex = '-1';
                
                btn.appendChild(ripple);
                
                setTimeout(() => {
                  if (btn.contains(ripple)) {
                    btn.removeChild(ripple);
                  }
                }, 600);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
              }}
            >
              Shop Collection
            </button>
            
            {/* Theme Colors Preview Buttons */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginLeft: '10px',
              opacity: 0,
              animation: 'fadeInUp 0.8s ease forwards 0.7s'
            }}>
              {[
                { color: '#3b82f6', label: 'Men' },
                { color: '#ec4899', label: 'Women' },
                { color: '#10b981', label: 'Kids' },
                { color: '#f59e0b', label: 'Newborns' }
              ].map((theme) => (
                <div 
                  key={theme.label}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: theme.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transform: 'scale(1)',
                    transition: 'all 0.3s ease',
                    position: 'relative'
                  }}
                  className="theme-color-btn"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.2)';
                    e.currentTarget.style.boxShadow = `0 0 20px ${theme.color}80`;
                    
                    // Show tooltip
                    const tooltip = document.createElement('div');
                    tooltip.textContent = theme.label;
                    tooltip.style.position = 'absolute';
                    tooltip.style.bottom = '-35px';
                    tooltip.style.left = '50%';
                    tooltip.style.transform = 'translateX(-50%)';
                    tooltip.style.background = 'rgba(0,0,0,0.8)';
                    tooltip.style.color = 'white';
                    tooltip.style.padding = '4px 8px';
                    tooltip.style.borderRadius = '4px';
                    tooltip.style.fontSize = '12px';
                    tooltip.style.whiteSpace = 'nowrap';
                    tooltip.className = 'theme-tooltip';
                    
                    e.currentTarget.appendChild(tooltip);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                    
                    // Remove tooltip
                    const tooltip = e.currentTarget.querySelector('.theme-tooltip');
                    if (tooltip) {
                      e.currentTarget.removeChild(tooltip);
                    }
                  }}
                >
                  {/* Empty div for color display */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .hover-scale-bg:hover {
          transform: scale(1.05);
          filter: brightness(0.8);
        }
        
        .gradient-overlay:hover {
          background: linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 100%);
        }
        
        .floating-element {
          pointer-events: none;
        }
        
        .gradient-text:hover {
          background: linear-gradient(90deg, #ec4899, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .primary-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #ec4899, #8b5cf6);
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
        }
        
        .primary-btn:hover::before {
          opacity: 1;
        }
        
        .theme-color-btn:hover::after {
          content: '';
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          border: 2px solid white;
          border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
