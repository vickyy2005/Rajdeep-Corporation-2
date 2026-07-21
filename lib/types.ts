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
      { value: 'di-df-pipes', label: 'DI DF Pipes' },
      { value: 'di-puddle-pipes', label: 'DI Puddle Pipes' },
      { value: 'ci-pipes', label: 'CI Pipes' },
      { value: 'ci-df-pipes', label: 'CI DF Pipes' },
      { value: 'ci-earthing-pipes', label: 'CI Earthing Pipes' },
      { value: 'ms-pipes', label: 'MS Pipes' },
      { value: 'hdpe-pipes', label: 'HDPE Pipes' },
      { value: 'ss-pipes', label: 'SS Pipes' }
    ]
  },
  { 
    value: 'fittings', 
    label: 'Fittings', 
    icon: 'Wrench',
    subcategories: [
      { value: 'fittings', label: 'All Fittings' },
      { value: 'di-fittings', label: 'DI Fittings' },
      { value: 'di-mj-fittings', label: 'DI MJ Fittings' },
      { value: 'ci-fittings', label: 'CI Fittings' },
      { value: 'ci-mj-fittings', label: 'CI MJ Fittings' },
      { value: 'cid-joint', label: 'CID Joint' },
      { value: 'ms-fittings', label: 'MS Fittings' }
    ]
  },
  { 
    value: 'valves', 
    label: 'Valves', 
    icon: 'Gauge',
    subcategories: [
      { value: 'valves', label: 'All Valves' },
      { value: 'sluice-valves', label: 'Sluice Valves' },
      { value: 'non-return-valves', label: 'Non Return Valves' },
      { value: 'butterfly-valves', label: 'Butterfly Valves' },
      { value: 'single-air-valves', label: 'Single Air Valves' },
      { value: 'double-air-valves', label: 'Double Air Valves' },
      { value: 'kinetic-air-valves', label: 'Kinetic Air Valves' },
      { value: 'tamperproof-air-valves', label: 'Tamperproof Air Valves' },
      { value: 'kinetic-type-tav', label: 'Kinetic Type TAV' },
      { value: 'check-valves', label: 'Check Valves' },
      { value: 'pressure-relief-valves', label: 'Pressure Relief Valves' },
      { value: 'ball-valves', label: 'Ball Valves' },
      { value: 'foot-valves', label: 'Foot Valves' },
      { value: 'fire-hydrant', label: 'Fire Hydrant' },
      { value: 'water-meter', label: 'Water Meter' },
      { value: 'strainer', label: 'Strainer' }
    ]
  },
  { 
    value: 'other', 
    label: 'Other Categories', 
    icon: 'Layers',
    subcategories: [
      { value: 'other', label: 'All Other Categories' },
      { value: 'tyron-ring', label: 'Tyron Ring' },
      { value: 'flange-ring', label: 'Flange Ring' },
      { value: 'o-ring', label: 'O Ring' },
      { value: 'nut-bolts', label: 'Nut Bolts' },
      { value: 'ms-flange', label: 'MS Flange' },
      { value: 'di-flange', label: 'DI Flange' }
    ]
  }
]

export type Category = string
