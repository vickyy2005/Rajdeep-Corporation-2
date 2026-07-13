import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { createMockClient } from './mock-client'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export async function createClient(
  cookieStore?: Awaited<ReturnType<typeof cookies>>,
) {
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('ujewukrgqlmiefiwnjfy.supabase.co')) {
    return createMockClient() as any
  }

  const resolvedCookieStore = cookieStore ?? (await cookies())

  return createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return resolvedCookieStore.getAll()
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            resolvedCookieStore.set(name, value, options),
          )
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}