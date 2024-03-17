import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Intentar cargar el usuario desde la cookie al cargar la aplicación
    const storedUser = Cookies.get('userData');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedCart = Cookies.get('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const loginUser = (userData) => {
    setUser(userData);
    // Almacenar el usuario en la cookie
    Cookies.set('userData', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    // Eliminar la cookie al cerrar sesión
    Cookies.remove('userData');
  };
  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    // Almacenar el carrito en la cookie
    Cookies.set('cart', JSON.stringify(updatedCart));
  };
  

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter(item => item.id !== itemId);
    setCart(updatedCart);
    // Actualizar el carrito en la cookie
    Cookies.set('cart', JSON.stringify(updatedCart));
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser, cart, addToCart, removeFromCart }}>
        {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};