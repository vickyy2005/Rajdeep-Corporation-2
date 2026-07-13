import type { Product } from './types'

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'ms-pipe',
    name: 'MS Pipe (Mild Steel)',
    description: 'High-quality mild steel pipes suitable for construction, plumbing, and industrial applications. Available in various sizes and thicknesses.',
    category: 'pipes',
    specifications: {
      material: 'Mild Steel',
      sizes: '15mm - 300mm',
      thickness: '1.5mm - 10mm',
      length: '6m standard'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gi-pipe',
    name: 'GI Pipe (Galvanized Iron)',
    description: 'Corrosion-resistant galvanized iron pipes ideal for water supply and gas lines. Hot-dip galvanized for maximum durability.',
    category: 'pipes',
    specifications: {
      material: 'Galvanized Iron',
      sizes: '15mm - 150mm',
      coating: 'Hot-dip galvanized',
      standard: 'IS 1239'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ss-pipe',
    name: 'SS Pipe (Stainless Steel)',
    description: 'Premium stainless steel pipes for food processing, pharmaceutical, and high-corrosion environments.',
    category: 'pipes',
    specifications: {
      material: 'SS 304/316',
      sizes: '6mm - 200mm',
      finish: 'Mirror/Matte',
      schedule: 'SCH 10/40/80'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gi-elbow',
    name: 'GI Elbow',
    description: 'Galvanized iron elbows for corrosion-resistant pipe fittings in water and gas applications.',
    category: 'fittings',
    specifications: {
      material: 'Galvanized Iron',
      angles: '45°, 90°',
      sizes: '15mm - 150mm',
      threading: 'BSP/NPT'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'gate-valve',
    name: 'Gate Valve',
    description: 'Heavy-duty gate valves for on/off flow control in industrial piping systems.',
    category: 'valves',
    specifications: {
      material: 'Cast Iron/SS',
      sizes: '15mm - 300mm',
      pressure_rating: 'PN10/PN16',
      operation: 'Handwheel'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ball-valve',
    name: 'Ball Valve',
    description: 'Quick quarter-turn ball valves for reliable flow control. Ideal for shut-off applications.',
    category: 'valves',
    specifications: {
      material: 'Brass/SS',
      sizes: '6mm - 100mm',
      port: 'Full/Reduced',
      pressure: '1000 PSI'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'blind-flange',
    name: 'Blind Flange',
    description: 'Blind flanges for sealing pipe ends and providing access for inspection.',
    category: 'flanges',
    specifications: {
      material: 'MS/SS',
      sizes: '15mm - 600mm',
      rating: 'ANSI 150/300',
      finish: 'RF/FF'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'weld-neck-flange',
    name: 'Weld Neck Flange',
    description: 'High-integrity weld neck flanges for critical high-pressure applications.',
    category: 'flanges',
    specifications: {
      material: 'CS/SS/Alloy',
      sizes: '15mm - 600mm',
      rating: '150-2500#',
      schedule: 'SCH 40/80/160'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]
