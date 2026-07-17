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

export interface SubCategory {
  value: string
  label: string
}

export interface CategoryInfo {
  value: string
  label: string
  icon: string
  subcategories?: SubCategory[]
}

export const CATEGORIES: CategoryInfo[] = [
  { 
    value: 'pipes', 
    label: 'Pipes', 
    icon: 'Cylinder',
    subcategories: [
      { value: 'pipes', label: 'All Pipes' },
      { value: 'di-pipes', label: 'DI Pipes' },
      { value: 'ci-pipes', label: 'CI Pipes' },
      { value: 'ci-earthing-pipes', label: 'CI Earthing Pipes' },
      { value: 'sgp-pipes', label: 'SGP Pipes' }
    ]
  },
  { 
    value: 'fittings', 
    label: 'Fittings', 
    icon: 'Wrench',
    subcategories: [
      { value: 'fittings', label: 'All Fittings' },
      { value: 'di-fittings', label: 'DI Fittings' },
      { value: 'ci-fittings', label: 'CI Fittings' }
    ]
  },
  { 
    value: 'valves', 
    label: 'Valves', 
    icon: 'Gauge' 
  },
  { 
    value: 'other', 
    label: 'Other Categories', 
    icon: 'Layers',
    subcategories: [
      { value: 'other', label: 'All Other Categories' },
      { value: 'ring', label: 'Ring' },
      { value: 'flanges', label: 'Flanges' },
      { value: 'water-meter', label: 'Water Meter' }
    ]
  }
]

export type Category = string
