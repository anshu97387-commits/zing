import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [user, setUser] = useState({
    name: '',
    goal: '',
    address: '',
    instructions: ''
  });
  const [coins, setCoins] = useState(150); // Default welcome coins
  const [isPaused, setIsPaused] = useState(false);
  const [addons, setAddons] = useState([]);

  const completeOnboarding = () => {
    setIsOnboarded(true);
  };

  const updateUser = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const togglePause = () => {
    setIsPaused(prev => !prev);
  };

  const purchaseAddon = (addon) => {
    if (coins >= addon.cost && !addons.find(a => a.id === addon.id)) {
      setCoins(prev => prev - addon.cost);
      setAddons(prev => [...prev, addon]);
    }
  };

  return (
    <AppContext.Provider value={{ 
      isOnboarded, user, coins, isPaused, addons, 
      completeOnboarding, updateUser, togglePause, purchaseAddon 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
