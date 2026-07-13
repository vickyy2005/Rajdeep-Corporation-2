import { createBrowserClient } from '@supabase/ssr'
import { createMockClient } from './mock-client'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const createClient = () => {
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('ujewukrgqlmiefiwnjfy.supabase.co')) {
    return createMockClient() as any
  }
  return createBrowserClient(supabaseUrl!, supabaseKey!)
}