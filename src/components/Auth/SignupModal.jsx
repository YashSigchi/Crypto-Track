// src/components/Auth/SignupModal.jsx (continued)
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signup, closeSignupModal, openLoginModal } from '../../redux/authSlice';
import { 
  FiX, FiMail, FiLock, FiLoader, FiUser, FiCheckCircle,
  FiBarChart2, FiTrendingUp, FiShield, FiBell 
} from 'react-icons/fi';
import { FaGoogle, FaApple, FaFacebookF } from 'react-icons/fa';
import './AuthModals.css';

const SignupModal = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      // Send verification code
      setStep(2);
    } else if (step === 2) {
      // Verify code and create account
      dispatch(signup(formData));
    }
  };

  const switchToLogin = () => {
    dispatch(closeSignupModal());
    dispatch(openLoginModal());
  };

  const handleCodeInput = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value !== '' && index < 3) {
        document.getElementById(`signup-code-input-${index + 1}`).focus();
      }
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <div className="modal-header">
          <h2>{step === 1 ? 'Create an Account' : 'Verify Email'}</h2>
          <button className="close-btn" onClick={() => dispatch(closeSignupModal())}>
            <FiX />
          </button>
        </div>
        
        {step === 1 && (
          <div className="app-overview">
            <br></br>
            <div className="app-tagline">
              Join CryptoTrack today and start managing your cryptocurrency investments with confidence.
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
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          {step === 1 ? (
            <>
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <div className="input-icon-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name" style={{ paddingLeft: '25px' }}
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="signup-email" className="form-label">Email</label>
                <div className="input-icon-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    id="signup-email"
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
                <label htmlFor="signup-password" className="form-label">Password</label>
                <div className="input-icon-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    id="signup-password"
                    type="password"
                    name="password"
                    placeholder="Create a password" style={{ paddingLeft: '25px' }}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                <div className="input-icon-wrapper">
                  <FiLock className="input-icon" />
                  <input
                    id="confirm-password"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password" style={{ paddingLeft: '25px' }}
                    value={formData.confirmPassword}
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
                {loading ? <FiLoader className="spinner" /> : 'Continue'}
              </button>
              
              <div className="social-login">
                <div className="divider">
                  <div className="divider-line"></div>
                  <span className="divider-text">or sign up with</span>
                  <div className="divider-line"></div>
                </div>
                
                <div className="social-buttons">
                  <button type="button" className="social-btn">
                    <FaGoogle />
                  </button>
                  <button type="button" className="social-btn">
                    <FaApple />
                  </button>
                  <button type="button" className="social-btn">
                    <FaFacebookF />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="verification-sent">
                <FiCheckCircle className="verification-icon" />
                <span>Verification code sent to {formData.email}</span>
              </div>
              
              <p className="app-tagline">Please enter the verification code we've sent to your email to activate your account.</p>
              
              <div className="form-group">
                <label className="form-label">Enter Verification Code</label>
                <div className="verification-code-inputs">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`signup-code-input-${index}`}
                      type="text"
                      maxLength="1"
                      className="code-input"
                      value={digit}
                      onChange={(e) => handleCodeInput(index, e.target.value)}
                    />
                  ))}
                </div>
              </div>
              
              <button 
                type="submit" 
                className="auth-submit-btn" 
                disabled={loading || verificationCode.join('').length !== 4}
              >
                {loading ? <FiLoader className="spinner" /> : 'Create Account'}
              </button>
              
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <button 
                  type="button" 
                  onClick={() => {
                    // Resend verification code
                    setVerificationCode(['', '', '', '']);
                    alert('A new verification code has been sent to your email');
                  }} 
                  className="switch-auth-btn"
                >
                  Resend verification code
                </button>
              </div>
            </>
          )}
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <button onClick={switchToLogin} className="switch-auth-btn">Login</button></p>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;