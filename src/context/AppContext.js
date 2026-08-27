import React, { createContext, useState, useContext } from 'react';
import { supabaseService } from '../lib/supabaseService';

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
    // Background sync with Supabase database
    supabaseService.saveUserProfile({
      ...user,
      coins,
      isPaused,
    });
  };

  const updateUser = (data) => {
    setUser((prev) => ({ ...prev, ...data }));
  };

  const togglePause = () => {
    setIsPaused((prev) => {
      const nextState = !prev;
      supabaseService.togglePauseStatus(user.id, nextState);
      return nextState;
    });
  };

  const purchaseAddon = (addon) => {
    if (coins >= addon.cost && !addons.find((a) => a.id === addon.id)) {
      const newCoins = coins - addon.cost;
      setCoins(newCoins);
      setAddons((prev) => [...prev, addon]);
      supabaseService.updateCoins(user.id, newCoins);
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
