'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function AdminLoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const authResult =
        mode === 'signin'
          ? await supabase.auth.signInWithPassword({
              email: data.email,
              password: data.password,
            })
          : await supabase.auth.signUp({
              email: data.email,
              password: data.password,
            })

      if (authResult.error) {
        toast.error(authResult.error.message)
        return
      }

      if (mode === 'signin') {
        toast.success('Login successful!')
        router.push('/admin')
        router.refresh()
        return
      }

      toast.success('Account created. Now add this user to admin_users in Supabase, then sign in.')
      setMode('signin')
    } catch {
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md bg-white border-slate-205 shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-650 text-white font-bold text-lg">
            RC
          </div>
          <CardTitle className="text-2xl text-slate-900">{mode === 'signin' ? 'Admin Login' : 'Create Admin Account'}</CardTitle>
          <CardDescription className="text-slate-500 font-medium">
            {mode === 'signin'
              ? 'Sign in to access the admin dashboard'
              : 'Create an auth account, then add it to admin_users in Supabase'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@rajdeepcorp.com"
                {...register('email')}
                className="bg-white border-slate-200 focus:border-blue-650 focus:ring-blue-100"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700 font-semibold">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                className="bg-white border-slate-200 focus:border-blue-650 focus:ring-blue-100"
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold shadow-md" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                </>
              ) : (
                mode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-center gap-3 text-sm">
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
              onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            >
              {mode === 'signin' ? 'Need a new admin account?' : 'Already have an account?'}
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-900 font-medium">
              Back to website
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
