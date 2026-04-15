export interface Product {
  id: string
  name: string
  category: 'pipes' | 'fittings' | 'valves' | 'flanges'
  description: string
  specifications: Record<string, string>
  image_url: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface RFQRequest {
  id: string
  product_id: string | null
  customer_name: string
  customer_email: string
  customer_phone: string
  company_name: string | null
  message: string
  quantity: string | null
  status: 'pending' | 'reviewed' | 'quoted' | 'closed'
  admin_notes: string | null
  created_at: string
  updated_at: string
  product?: Product
}

export interface AdminUser {
  id: string
  email: string
  is_super_admin: boolean
  created_at: string
}

export const CATEGORIES = [
  { value: 'pipes', label: 'Pipes', icon: 'Cylinder' },
  { value: 'fittings', label: 'Fittings', icon: 'Wrench' },
  { value: 'valves', label: 'Valves', icon: 'Gauge' },
  { value: 'flanges', label: 'Flanges', icon: 'Circle' },
] as const

export type Category = typeof CATEGORIES[number]['value']
