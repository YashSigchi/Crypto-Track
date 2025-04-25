// src/components/Auth/LoginModal.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, closeLoginModal, openSignupModal } from '../../redux/authSlice';
import { 
  FiX, FiMail, FiLock, FiLoader, FiCheckCircle, 
  FiBarChart2, FiTrendingUp, FiShield, FiBell 
} from 'react-icons/fi';
import { FaGoogle, FaApple, FaFacebookF } from 'react-icons/fa';
import './AuthModals.css';

const LoginModal = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  const switchToSignup = () => {
    dispatch(openSignupModal());
  };

  const handleForgotPassword = () => {
    setForgotPasswordMode(true);
  };

  const handleSendVerification = (e) => {
    e.preventDefault();
    if (formData.email) {
      // Simulate sending verification code
      setVerificationSent(true);
    }
  };

  const handleCodeInput = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value !== '' && index < 3) {
        document.getElementById(`code-input-${index + 1}`).focus();
      }
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Handle password reset logic
    alert('Password reset functionality would be implemented here');
    setForgotPasswordMode(false);
    setVerificationSent(false);
    setVerificationCode(['', '', '', '']);
  };

  if (forgotPasswordMode) {
    return (
      <div className="auth-modal-overlay">
        <div className="auth-modal">
          <div className="modal-header">
            <h2>Reset Password</h2>
            <button 
              className="close-btn" 
              onClick={() => {
                setForgotPasswordMode(false);
                setVerificationSent(false);
              }}
            >
              <FiX />
            </button>
          </div>
          
          <form onSubmit={verificationSent ? handleResetPassword : handleSendVerification} className="auth-form">
            {verificationSent ? (
              <>
                <div className="verification-sent">
                  <FiCheckCircle className="verification-icon" />
                  <span>Verification code sent to {formData.email}</span>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Enter Verification Code</label>
                  <div className="verification-code-inputs">
                    {verificationCode.map((digit, index) => (
                      <input
                        key={index}
                        id={`code-input-${index}`}
                        type="text"
                        maxLength="1"
                        className="code-input"
                        value={digit}
                        onChange={(e) => handleCodeInput(index, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="new-password" className="form-label">New Password</label>
                  <div className="input-icon-wrapper">
                    <FiLock className="input-icon" />
                    <input
                      id="new-password"
                      type="password"
                      name="newPassword"
                      placeholder="Enter new password" style={{ paddingLeft: '25px' }}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirm-new-password" className="form-label">Confirm New Password</label>
                  <div className="input-icon-wrapper">
                    <FiLock className="input-icon" />
                    <input
                      id="confirm-new-password"
                      type="password"
                      name="confirmNewPassword"
                      placeholder="Confirm new password" style={{ paddingLeft: '25px' }}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
                
                <button type="submit" className="auth-submit-btn">
                  Reset Password
                </button>
              </>
            ) : (
              <>
                <p className="app-tagline">Enter your email address and we'll send you a verification code to reset your password.</p>
                
                <div className="form-group">
                  <label htmlFor="reset-email" className="form-label">Email</label>
                  <div className="input-icon-wrapper">
                    <FiMail className="input-icon" />
                    <input
                      id="reset-email"
                      type="email"
                      name="email"
                      placeholder="Enter your email" style={{ paddingLeft: '25px' }}
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
                
                <button type="submit" className="auth-submit-btn">
                  Send Verification Code
                </button>
              </>
            )}
          </form>
          
          <div className="auth-footer">
            <p>Remember your password? <button onClick={() => setForgotPasswordMode(false)} className="switch-auth-btn">Back to Login</button></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="modal-header">
          <h2>Login to CryptoTrack</h2>
          <button className="close-btn" onClick={() => dispatch(closeLoginModal())}>
            <FiX />
          </button>
        </div>
        
        {/* App Overview */}
        <div className="app-overview">
          <br></br>
          <div className="app-tagline">
            Track, analyze, and manage your cryptocurrency investments with real-time data and powerful tools.
          </div>
          
          <div className="features-list">
            <div className="feature-item">
              <FiBarChart2 className="feature-icon" />
              <span className="feature-text">Real-time tracking</span>
            </div>
            <div className="feature-item">
              <FiTrendingUp className="feature-icon" />
              <span className="feature-text">Portfolio insights</span>
            </div>
            <div className="feature-item">
              <FiBell className="feature-icon" />
              <span className="feature-text">Price alerts</span>
            </div>
            <div className="feature-item">
              <FiShield className="feature-icon" />
              <span className="feature-text">Secure storage</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-icon-wrapper">
              <FiMail className="input-icon" />
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email" style={{ paddingLeft: '25px' }}
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>
          
          <div className="form-group">
            <div className="password-header">
              <label htmlFor="password" className="form-label">Password</label>
              <button 
                type="button" 
                className="forgot-password" 
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>
            <div className="input-icon-wrapper">
              <FiLock className="input-icon" />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password" style={{ paddingLeft: '25px' }}
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
          </div>
          
          <button 
            type="submit" 
            className="auth-submit-btn" 
            disabled={loading}
          >
            {loading ? <FiLoader className="spinner" /> : 'Login'}
          </button>
          
          <div className="social-login">
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">or continue with</span>
              <div className="divider-line"></div>
            </div>
            
            <div className="social-buttons">
              <button className="social-btn">
                <FaGoogle />
              </button>
              <button className="social-btn">
                <FaApple />
              </button>
              <button className="social-btn">
                <FaFacebookF />
              </button>
            </div>
          </div>
        </form>
        
        <div className="auth-footer">
          <p>Don't have an account? <button onClick={switchToSignup} className="switch-auth-btn">Sign Up</button></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;