import { createClient } from '@supabase/supabase-js';

const getSupabaseCredentials = () => {
  if (typeof window !== 'undefined') {
    const localUrl = localStorage.getItem('demo_turnos_supabase_url');
    const localKey = localStorage.getItem('demo_turnos_supabase_key');
    if (localUrl && localKey) {
      return { url: localUrl, key: localKey };
    }
  }
  return {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  };
};

const credentials = getSupabaseCredentials();

export const isSupabaseConfigured = (): boolean => {
  const creds = getSupabaseCredentials();
  return Boolean(creds.url && creds.key && creds.url.startsWith('http'));
};

export const getSupabaseClient = () => {
  const creds = getSupabaseCredentials();
  if (creds.url && creds.key && creds.url.startsWith('http')) {
    return createClient(creds.url, creds.key);
  }
  return null;
};
