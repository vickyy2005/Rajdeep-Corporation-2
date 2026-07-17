'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, FileText, LogOut, ExternalLink } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { User } from '@supabase/supabase-js'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Quote Requests', href: '/admin/rfq', icon: FileText },
]

interface AdminSidebarProps {
  user: User
  isSuper: boolean
}

export function AdminSidebar({ user, isSuper }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <aside className="flex w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-slate-150 px-4">
        <Image
          src="/logo.png"
          alt="Rajdeep Corporation Logo"
          width={44}
          height={44}
          className="h-11 w-11 shrink-0 object-contain"
        />
        <div>
          <div className="text-sm font-bold text-slate-900">Rajdeep Corp</div>
          <div className="text-xs text-slate-500 font-semibold">Admin Panel</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors',
                isActive
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md font-bold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* View website link */}
      <div className="border-t border-slate-150 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors font-semibold"
        >
          <ExternalLink className="h-4 w-4 text-slate-400" />
          View Website
        </Link>
      </div>

      {/* User info & logout */}
      <div className="border-t border-slate-150 p-4">
        <div className="mb-3">
          <p className="text-sm font-bold text-slate-900 truncate">{user.email}</p>
          <p className="text-xs text-slate-500 font-semibold">
            {isSuper ? 'Super Admin' : 'Admin'}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold animate-duration-200"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  )
}
