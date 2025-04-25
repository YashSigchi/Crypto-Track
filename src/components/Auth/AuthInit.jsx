// src/components/Auth/AuthInit.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../../redux/authSlice';

const AuthInit = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  
  return null; // This component doesn't render anything
};

export default AuthInit;