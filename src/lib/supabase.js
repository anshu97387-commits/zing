import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase Configuration
// Aap apne Supabase Dashboard -> Settings -> API Keys se Project URL aur Key yahan dal sakte hain
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project-id.supabase.co';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_Xi86HB_Od8n_GsMercNwZQ_P1lPFZLE';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
