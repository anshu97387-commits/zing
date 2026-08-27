import { supabase } from './supabase';

/**
 * Real Production Supabase Service Layer
 */
export const supabaseService = {
  // 1. Real Phone OTP via Supabase Auth
  async sendPhoneOtp(phone) {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone: phone,
      });
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.log('Supabase sendOtp Notice (Dev fallback available):', err.message);
      return { success: false, error: err.message };
    }
  },

  // 2. Real OTP Verification via Supabase Auth
  async verifyPhoneOtp(phone, token) {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: phone,
        token: token,
        type: 'sms',
      });
      if (error) throw error;
      return { success: true, session: data.session, user: data.user };
    } catch (err) {
      console.log('Supabase verifyOtp Notice:', err.message);
      return { success: false, error: err.message };
    }
  },

  // 3. Save User Profile & Formula into Database
  async saveUserProfile(userData) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            name: userData.name,
            goal: userData.goal,
            address: userData.address,
            instructions: userData.instructions || 'Hang on door handle',
            coins: userData.coins || 150,
            is_paused: userData.isPaused || false,
          }
        ])
        .select();

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

  // 4. Live Rider 6:00 AM Dispatch Manifest (Real DB Query)
  async fetchLiveRiderManifest() {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { success: true, data: data || [] };
    } catch (err) {
      console.warn('fetchLiveRiderManifest error:', err.message);
      return { success: false, data: [] };
    }
  },

  // 5. Toggle Pause Status in Live DB
  async togglePauseStatus(userId, isPaused) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ is_paused: isPaused })
        .eq('id', userId);

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err };
    }
  },

  // 6. Update Zing Coins in Live DB
  async updateCoins(userId, newCoinBalance) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ coins: newCoinBalance })
        .eq('id', userId);

      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      return { success: false, error: err };
    }
  }
};
