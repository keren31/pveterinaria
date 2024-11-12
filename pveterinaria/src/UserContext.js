import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CryptoJS from 'crypto-js';

const UserContext = createContext();
const ENCRYPTION_KEY = 'Soymainekko1#';

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('userData');
    if (storedUser) {
      const decryptedUser = CryptoJS.AES.decrypt(storedUser, ENCRYPTION_KEY).toString(CryptoJS.enc.Utf8);
      setUser(JSON.parse(decryptedUser));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userData), ENCRYPTION_KEY).toString();
    localStorage.setItem('userData', encryptedUser);
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('userData');
  };


  return (
    <UserContext.Provider value={{ user,setUser, loginUser, logoutUser, }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  return useContext(UserContext);
};