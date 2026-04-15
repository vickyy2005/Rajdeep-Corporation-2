import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AdminSidebar } from '@/components/admin/admin-sidebar'

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  // Check if user is in admin_users table
  const { data: adminUser } = await supabase
    .from('admin_users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (!adminUser) {
    // User is authenticated but not an admin
    await supabase.auth.signOut()
    redirect('/admin/login')
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar user={user} isSuper={adminUser.is_super_admin} />
      <main className="flex-1 bg-muted/30">
        {children}
      </main>
    </div>
  )
}
