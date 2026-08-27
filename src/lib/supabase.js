import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Supabase Production Configuration
export const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://jjzihnqpmbedcrxajmit.supabase.co';
export const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqemlobnFwbWJlZGNyeGFxaml0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4MTAyMTIsImV4cCI6MjEwMzM4NjIxMn0.qK85ElnGrorJd4V8CqwPpl62fV0LKWzoMijz0RwmEZ8';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
