// components/auth/AuthButtons.tsx
"use client";

import { useState } from 'react';
import { ShoppingBag, LogIn, UserPlus, User } from 'lucide-react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';

const AuthButtons = () => {
  const { user, login, logout, signup, isLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleMyOrders = () => {
    if (!user) {
      alert('Please login to view your orders');
      setShowLoginModal(true);
      return;
    }
    // ✅ Fixed: Redirect to orders page
    router.push('/orders');
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter email and password');
      return;
    }
    await login(email, password);
    setShowLoginModal(false);
    setEmail('');
    setPassword('');
  };

  const handleSignup = async () => {
    if (!name || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    await signup(name, email, password);
    setShowSignupModal(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '25px',
    fontWeight: '600',
    fontSize: '14px',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const ordersStyle = {
    ...buttonStyle,
    background: 'linear-gradient(90deg, #10B981, #3B82F6)',
    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
  };

  const signupStyle = {
    ...buttonStyle,
    background: 'linear-gradient(90deg, #EC4899, #7C3AED)',
    boxShadow: '0 4px 15px rgba(236, 72, 153, 0.3)'
  };

  const loginStyle = {
    ...buttonStyle,
    background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
    boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)'
  };

  const hoverEffect = (e: any, color: string) => {
    if (!isLoading) {
      e.currentTarget.style.transform = 'scale(1.05)';
      e.currentTarget.style.boxShadow = `0 6px 20px ${color}`;
    }
  };

  const leaveEffect = (e: any, originalShadow: string) => {
    e.currentTarget.style.transform = 'scale(1)';
    e.currentTarget.style.boxShadow = originalShadow;
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* My Orders Button */}
        <button
          onClick={handleMyOrders}
          style={ordersStyle}
          onMouseEnter={(e) => hoverEffect(e, 'rgba(16, 185, 129, 0.4)')}
          onMouseLeave={(e) => leaveEffect(e, '0 4px 15px rgba(16, 185, 129, 0.3)')}
          disabled={isLoading}
        >
          <ShoppingBag size={16} />
          My Orders
        </button>

        {/* Sign Up Button */}
        {!user && (
          <button
            onClick={() => setShowSignupModal(true)}
            style={signupStyle}
            onMouseEnter={(e) => hoverEffect(e, 'rgba(236, 72, 153, 0.4)')}
            onMouseLeave={(e) => leaveEffect(e, '0 4px 15px rgba(236, 72, 153, 0.3)')}
            disabled={isLoading}
          >
            <UserPlus size={16} />
            Sign Up
          </button>
        )}
        
        {/* Login/Logout Button */}
        <button
          onClick={user ? logout : () => setShowLoginModal(true)}
          style={loginStyle}
          onMouseEnter={(e) => hoverEffect(e, 'rgba(124, 58, 237, 0.4)')}
          onMouseLeave={(e) => leaveEffect(e, '0 4px 15px rgba(124, 58, 237, 0.3)')}
          disabled={isLoading}
        >
          {isLoading ? (
            'Loading...'
          ) : user ? (
            <>
              <User size={16} />
              Logout
            </>
          ) : (
            <>
              <LogIn size={16} />
              Login
            </>
          )}
        </button>

        {/* User Greeting */}
        {user && (
          <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
            Hi, {user.name.split(' ')[0]}!
          </span>
        )}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '16px',
            width: '400px',
            maxWidth: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
              Login to Your Account
            </h3>
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '15px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleLogin}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(90deg, #7C3AED, #EC4899)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              
              <button
                onClick={() => setShowLoginModal(false)}
                style={{
                  padding: '12px 20px',
                  background: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signup Modal */}
      {showSignupModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '16px',
            width: '400px',
            maxWidth: '90%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>
              Create New Account
            </h3>
            
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '15px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '15px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                marginBottom: '20px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSignup}
                disabled={isLoading}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'linear-gradient(90deg, #EC4899, #7C3AED)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
              
              <button
                onClick={() => setShowSignupModal(false)}
                style={{
                  padding: '12px 20px',
                  background: '#F3F4F6',
                  color: '#374151',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButtons;