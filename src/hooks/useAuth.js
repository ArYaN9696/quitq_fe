import { useState, useEffect } from 'react';

const useAuth = () => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('jwt_token');
    const userRole = localStorage.getItem('user_role');
    return { token, userRole };
  });

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const userRole = localStorage.getItem('user_role');
    setAuth({ token, userRole });
  }, []);

  const login = (token, role) => {
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('user_role', role);
    setAuth({ token, userRole: role });
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_role');
    setAuth({ token: null, userRole: null });
  };

  return { auth, login, logout };
};

export default useAuth;
