import { createBrowserClient } from '@supabase/ssr'
import { createMissingSupabaseClient, getSupabaseConfig, isSupabaseConfigured } from './fallback'

export function createClient() {
  if (!isSupabaseConfigured()) {
    return createMissingSupabaseClient() as any
  }

  const { url, key } = getSupabaseConfig()

  return createBrowserClient(url!, key!)
}
