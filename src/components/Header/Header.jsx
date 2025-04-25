// src/components/Header/Header.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme, setSearchTerm } from '../../redux/cryptoSlice';
import { openLoginModal, openSignupModal, logoutUser } from '../../redux/authSlice';
import { FiMoon, FiSun, FiSearch, FiLogOut } from 'react-icons/fi';
import LoginModal from '../Auth/LoginModal';
import SignupModal from '../Auth/SignupModal';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const isLightMode = useSelector(state => state.crypto.isLightMode);
  const searchTerm = useSelector(state => state.crypto.filter.search);
  const { isAuthenticated, user, isLoginModalOpen, isSignupModalOpen } = useSelector(state => state.auth);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
    // Also update the body class for global styling
    document.body.classList.toggle('dark-mode');
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleLogin = () => {
    dispatch(openLoginModal());
  };

  const handleSignup = () => {
    dispatch(openSignupModal());
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <h1 className="logo">CryptoTrack</h1>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <FiSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by name or symbol" 
              value={searchTerm} 
              onChange={handleSearchChange} 
              className="search-input" 
            />
          </div>
        </div>

        <div className="header-actions">
          <button className="theme-toggle" onClick={handleThemeToggle}>
            {isLightMode ? <FiMoon /> : <FiSun />}
          </button>
          
          {isAuthenticated ? (
            <div className="user-profile">
              <div className="user-info">
                <span className="user-greeting">Hi, {user?.name || 'User'}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  <FiLogOut /> Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <button className="btn login-btn" onClick={handleLogin}>Login</button>
              <button className="btn signup-btn" onClick={handleSignup}>Sign Up</button>
            </>
          )}
        </div>
      </header>

      {isLoginModalOpen && <LoginModal />}
      {isSignupModalOpen && <SignupModal />}
    </>
  );
};

export default Header;