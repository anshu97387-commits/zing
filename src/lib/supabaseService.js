import { supabase } from './supabase';

/**
 * User Profile Operations in Supabase
 */
export const supabaseService = {
  // Save user profile & onboarding details
  async saveUserProfile(userData) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .upsert([
          {
            name: userData.name,
            goal: userData.goal,
            address: userData.address,
            instructions: userData.instructions,
            coins: userData.coins || 150,
            is_paused: userData.isPaused || false,
            updated_at: new Date().toISOString(),
          }
        ]);

      if (error) {
        console.warn('Supabase saveUserProfile notice:', error.message);
        return { success: false, error };
      }
      return { success: true, data };
    } catch (err) {
      console.warn('Supabase saveUserProfile error:', err);
      return { success: false, error: err };
    }
  },

  // Toggle Pause (Vacation Mode) in Database
  async togglePauseStatus(userId, isPaused) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ is_paused: isPaused, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Supabase togglePauseStatus error:', err);
      return { success: false, error: err };
    }
  },

  // Update Zing Coins
  async updateCoins(userId, newCoinBalance) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ coins: newCoinBalance, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Supabase updateCoins error:', err);
      return { success: false, error: err };
    }
  }
};
