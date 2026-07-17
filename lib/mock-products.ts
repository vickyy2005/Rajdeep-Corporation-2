import type { Product } from './types'

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'di-pipe-socket',
    name: 'DI Pipe Socket Spigot (Class K9)',
    description: 'High-tensile ductile iron pipes with socket and spigot joints. Lined with cement mortar for water transmission.',
    category: 'di-pipes',
    specifications: {
      material: 'Ductile Iron',
      class: 'Class K9 / K7',
      sizes: '80mm - 1000mm',
      standard: 'IS 8329 / ISO 2531'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ci-pipe-flanged',
    name: 'CI Double Flanged Pipe',
    description: 'Centrifugally cast double flanged cast iron pipes for sewage and vertical lines. High durability and corrosion resistance.',
    category: 'ci-pipes',
    specifications: {
      material: 'Cast Iron (Grey Iron)',
      sizes: '80mm - 600mm',
      length: '2.75m / 5.5m',
      standard: 'IS 7181 / IS 1536'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ci-earthing-pipe',
    name: 'CI Earthing Pipe with Funnel',
    description: 'Cast iron earthing pipes equipped with funnels and clamp arrangements. Designed for low soil resistivity earthing.',
    category: 'ci-earthing-pipes',
    specifications: {
      material: 'Cast Iron',
      sizes: '100mm / 150mm Diameter',
      length: '2m / 3m standard',
      components: 'Includes funnel & clamp'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'sgp-pipe-water',
    name: 'SGP Carbon Steel Pipe',
    description: 'SGP steel pipes suitable for low-pressure steam, water, gas, air, and oil systems. Available in black or galvanized finish.',
    category: 'sgp-pipes',
    specifications: {
      material: 'Carbon Steel (SGP)',
      sizes: '15A - 300A',
      finish: 'Black / Galvanized',
      standard: 'JIS G3452'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'di-elbow-fitting',
    name: 'DI Socket Bend 90°',
    description: 'Ductile iron socket elbow fitting designed for 90-degree directional changes in water utility pipelines.',
    category: 'di-fittings',
    specifications: {
      material: 'Ductile Iron',
      angle: '90 Degree',
      pressure: 'PN10 / PN16 / PN25',
      coating: 'Epoxy powder coated'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'di-flanged-tee',
    name: 'DI All Flanged Tee',
    description: 'Ductile iron flanged tee fitting for branching piping systems. High pressure capacity and leak-proof joints.',
    category: 'di-fittings',
    specifications: {
      material: 'Ductile Iron',
      sizes: '80mm - 600mm',
      connection: 'Flanged PN16',
      coating: 'Blue Epoxy'
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
  },
  {
    id: 'rubber-ring-gasket',
    name: 'Rubber Gasket Ring',
    description: 'Premium elastomeric EPDM rubber rings for push-on socket joints of ductile iron pipes.',
    category: 'ring',
    specifications: {
      material: 'EPDM Rubber',
      sizes: '80mm - 1000mm',
      application: 'Water joint seal',
      standard: 'EN 681-1 / IS 5382'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'woltman-water-meter',
    name: 'Woltman Water Flow Meter',
    description: 'Industrial Woltman type bulk water flow meters with magnetic drive. Suitable for high-flow rate pipelines.',
    category: 'water-meter',
    specifications: {
      type: 'Woltman Turbine',
      sizes: '50mm - 300mm',
      accuracy: 'Class B',
      pressure: 'PN16'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'all-flange-cross-tee',
    name: 'CI All Flange Cross Tee',
    description: 'High-quality Cast Iron cross tee fitting designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/All Flange Cross Tee.jpeg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'all-socket-cross-tee',
    name: 'CI All Socket Cross Tee',
    description: 'High-quality Cast Iron socket cross tee fitting designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/All Socket Cross Tee.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ci-duckfoot-bend',
    name: 'CI Duckfoot Bend Fitting',
    description: 'High-quality Cast Iron duckfoot bend fitting designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/CI Duckfoot Bend.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ci-mj-hydrant-tee-1',
    name: 'CI MJ Hydrant Tee 1',
    description: 'High-quality Cast Iron fitting designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/CI MJ Hyadrant Tee-1.jpeg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ci-mj-hydrant-tee-2',
    name: 'CI MJ Hydrant Tee 2',
    description: 'High-quality Cast Iron fitting designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/CI MJ Hyadrant Tee-2.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'cid-joint',
    name: 'CI CID Joint',
    description: 'High-quality Cast Iron coupling CID joint designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/CID Joint.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'collar-coupling',
    name: 'CI Collar Coupling',
    description: 'High-quality Cast Iron collar coupling designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/Collar Coupling.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'flange-adaptor',
    name: 'CI Flange Adaptor',
    description: 'High-quality Cast Iron flange adaptor designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/Flange Adaptor.jpeg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mj-bend',
    name: 'CI MJ Bend',
    description: 'High-quality Cast Iron MJ bend fitting designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/MJ Bend.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mj-end-cap',
    name: 'CI MJ End Cap',
    description: 'High-quality Cast Iron MJ end cap designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/MJ End Cap.jpeg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'mj-reducer',
    name: 'CI MJ Reducer',
    description: 'High-quality Cast Iron MJ reducer designed for industrial and B2B piping networks.',
    category: 'ci-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'CI Fitting'
    },
    image_url: '/images/MJ Reducer.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]