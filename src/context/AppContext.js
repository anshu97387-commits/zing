import React, { createContext, useState, useContext } from 'react';
import { supabaseService } from '../lib/supabaseService';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [user, setUser] = useState({
    name: 'Anshu',
    phone: '+91 98765 43210',
    goal: 'muscle',
    address: 'Flat 402, Tower B, Green Valley',
    instructions: 'Hang pouch on the door handle',
    activePlan: '7-Day Habit Stack',
    planExpiry: '8 Days Left',
  });
  const [coins, setCoins] = useState(150);
  const [isPaused, setIsPaused] = useState(false);
  const [addons, setAddons] = useState([]);

  const completeOnboarding = () => {
    setIsOnboarded(true);
    setAuthenticated(true);
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

  const resetApp = () => {
    setIsOnboarded(false);
    setAuthenticated(false);
  };

  return (
    <AppContext.Provider value={{ 
      isAuthenticated, setAuthenticated,
      isOnboarded, user, coins, isPaused, addons, 
      completeOnboarding, updateUser, togglePause, purchaseAddon, resetApp 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
