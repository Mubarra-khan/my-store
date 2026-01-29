// components/layout/Footer.tsx
const Footer = () => {
  return (
    <footer style={{ 
      background: '#111827', 
      color: 'white', 
      paddingTop: '60px' 
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Newsletter */}
        <div style={{ 
          background: 'linear-gradient(135deg, #351b96 0%, #d85295 100%)',
          borderRadius: '16px',
          padding: '40px',
          marginBottom: '60px',
          textAlign: 'center'
        }}>
          <h3 style={{ 
            fontSize: '28px', 
            fontWeight: 'bold', 
            marginBottom: '16px' 
          }}>
            Stay Updated
          </h3>
          <p style={{ 
            fontSize: '16px', 
            marginBottom: '24px',
            opacity: 0.9
          }}>
            Subscribe to get special offers and style tips
          </p>
          <div style={{ 
            display: 'flex', 
            maxWidth: '500px', 
            margin: '0 auto' 
          }}>
            <input 
              type="email" 
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: '12px 20px',
                border: 'none',
                borderRadius: '8px 0 0 8px',
                fontSize: '16px'
              }}
            />
            <button style={{
              background: 'black',
              color: 'white',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '0 8px 8px 0',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '16px'
            }}>
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          paddingBottom: '40px',
          borderBottom: '1px solid #374151'
        }}>
          {/* Column 1 */}
          <div>
            <h4 style={{ 
              fontSize: '20px', 
              fontWeight: 'bold', 
              marginBottom: '20px' 
            }}>
              StyleStore
            </h4>
            <p style={{ color: '#9CA3AF', lineHeight: 1.6 }}>
              Premium clothing store offering the latest fashion trends for everyone.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '20px' 
            }}>
              Shop
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Men', 'Women', 'Kids', 'New Arrivals', 'Sale'].map((item) => (
                <li key={item} style={{ marginBottom: '10px' }}>
                  <a href="#" style={{ 
                    color: '#D1D5DB', 
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '20px' 
            }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {['Contact Us', 'FAQ', 'Shipping', 'Returns', 'Size Guide'].map((item) => (
                <li key={item} style={{ marginBottom: '10px' }}>
                  <a href="#" style={{ 
                    color: '#D1D5DB', 
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 style={{ 
              fontSize: '18px', 
              fontWeight: 'bold', 
              marginBottom: '20px' 
            }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#D1D5DB' }}>
              <li style={{ marginBottom: '10px' }}>📞 +1 (555) 123-4567</li>
              <li style={{ marginBottom: '10px' }}>✉️ support@stylestore.com</li>
              <li style={{ marginBottom: '10px' }}>📍 123 Fashion St, NYC</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          padding: '30px 0', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ color: '#9CA3AF' }}>
            © {new Date().getFullYear()} StyleStore. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '30px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
              <a 
                key={item} 
                href="#" 
                style={{ 
                  color: '#D1D5DB', 
                  textDecoration: 'none',
                  fontSize: '14px'
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;