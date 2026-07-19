import type { Product } from './types'

export const MOCK_PRODUCTS: Product[] = [
  // PIPES SUB-CATEGORIES
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
    id: 'di-df-pipe',
    name: 'DI Double Flanged Pipe',
    description: 'Ductile Iron double flanged pipes with integrated flanges for vertical installation, pumps, and valve connections.',
    category: 'di-df-pipes',
    specifications: {
      material: 'Ductile Iron',
      rating: 'PN10 / PN16 / PN25',
      sizes: '100mm - 600mm',
      standard: 'IS 8329'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'di-puddle-pipe',
    name: 'DI Puddle Pipe',
    description: 'Ductile iron puddle pipes designed to prevent water leakage through concrete walls of water tanks and basements.',
    category: 'di-puddle-pipes',
    specifications: {
      material: 'Ductile Iron',
      length: '0.5m / 1m standard',
      sizes: '80mm - 400mm',
      type: 'Double Flanged with puddle collar'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ci-pipe-flanged',
    name: 'CI Socket Spigot Pipe',
    description: 'Centrifugally cast grey cast iron socket and spigot pipes for sewage, drainage, and low-pressure water mains.',
    category: 'ci-pipes',
    specifications: {
      material: 'Grey Cast Iron',
      sizes: '80mm - 600mm',
      length: '5.5m standard',
      standard: 'IS 1536'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ci-df-pipe',
    name: 'CI Double Flanged Pipe',
    description: 'Cast iron double flanged pipes for municipal sewage networks, processing plants, and marine water transmission.',
    category: 'ci-df-pipes',
    specifications: {
      material: 'Cast Iron (Grey Iron)',
      sizes: '80mm - 600mm',
      flange_standard: 'IS 7181 / IS 1536',
      length: '2.75m / 5.5m'
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
    id: 'ms-pipe-seamless',
    name: 'MS Seamless Pipe (Mild Steel)',
    description: 'Heavy-grade seamless mild steel pipes for gas transmission, high pressure steam, and structural engineering applications.',
    category: 'ms-pipes',
    specifications: {
      material: 'Mild Steel',
      schedule: 'SCH 40 / 80 / 160',
      sizes: '15mm - 600mm',
      standard: 'ASTM A106 / IS 1239'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'hdpe-pipe-water',
    name: 'HDPE PE100 Water Pipe',
    description: 'High-density polyethylene pipes (PE100) for drinking water supply, micro-irrigation, and industrial fluid processing.',
    category: 'hdpe-pipes',
    specifications: {
      material: 'Polyethylene PE100',
      pressure: 'PN6 - PN16',
      sizes: '20mm - 315mm',
      standard: 'IS 4984'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ss-pipe-seamless',
    name: 'SS 304/316 Seamless Pipe',
    description: 'Premium corrosion-resistant stainless steel seamless pipes. Ideal for chemical, pharmaceutical, and food-processing plants.',
    category: 'ss-pipes',
    specifications: {
      material: 'SS 304 / SS 316',
      schedule: 'SCH 10S / 40S / 80S',
      sizes: '1/2" to 12" IPS',
      standard: 'ASTM A312'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // FITTINGS SUB-CATEGORIES
  {
    id: 'fi-fitting-tee',
    name: 'FI Flanged Tee Fitting',
    description: 'Flanged iron tee connector designed for robust branching in commercial fluid and pipeline circuits.',
    category: 'fi-fittings',
    specifications: {
      material: 'Flanged Cast Iron',
      connection: 'Flanged Joint',
      sizes: '80mm - 300mm'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'di-mj-fitting-bend',
    name: 'DI Mechanical Joint Bend (Mechanical Joint)',
    description: 'Ductile iron mechanical joint elbow bend for flexible pipeline connections and underground utility routes.',
    category: 'di-mj-fittings',
    specifications: {
      material: 'Ductile Iron',
      joint_type: 'Mechanical Joint (MJ)',
      angle: '45 / 90 Degree',
      coating: 'Coal Tar / Epoxy'
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
    id: 'ci-mj-hydrant-tee-1',
    name: 'CI MJ Hydrant Tee',
    description: 'Cast iron mechanical joint hydrant tee designed for municipal B2B piping networks and fire hydrant hookups.',
    category: 'ci-mj-fittings',
    specifications: {
      material: 'Cast Iron',
      type: 'Mechanical Joint (MJ)'
    },
    image_url: '/images/CI MJ Hyadrant Tee-1.jpeg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'cid-joint',
    name: 'CI CID Joint Coupling',
    description: 'High-quality Cast Iron coupling CID joint designed for industrial and B2B piping networks.',
    category: 'cid-joint',
    specifications: {
      material: 'Cast Iron',
      type: 'CID Joint'
    },
    image_url: '/images/CID Joint.jpg',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ms-fitting-tee',
    name: 'MS Equal Tee (Mild Steel)',
    description: 'Mild Steel equal tee fitting for butt-weld joints. Suitable for high-temperature and structural piping.',
    category: 'ms-fittings',
    specifications: {
      material: 'Mild Steel',
      connection: 'Butt-Weld',
      thickness: 'SCH 40 / 80'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // VALVES SUB-CATEGORIES
  {
    id: 'sluice-valve-resilient',
    name: 'Resilient Seated Sluice Valve',
    description: 'PN10/16 flanged sluice valves with non-rising stem. Provides 100% leak-proof isolation for drinking water.',
    category: 'sluice-valves',
    specifications: {
      valve_type: 'Sluice (Gate) Valve',
      pressure: 'PN10 / PN16',
      operation: 'Handwheel / Cap',
      standard: 'IS 14846'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'non-return-valve-swing',
    name: 'Swing Type Non Return Valve',
    description: 'Heavy duty flanged swing non-return valves (check valves) to prevent reverse fluid flow in pumps and systems.',
    category: 'non-return-valves',
    specifications: {
      valve_type: 'Non Return (NRV)',
      sizes: '50mm - 300mm',
      standard: 'IS 5312'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'butterfly-valve-wafer',
    name: 'Wafer Type Butterfly Valve',
    description: 'Slim wafer type butterfly valves with gear or lever operation. Tight shut-off control with EPDM seat liner.',
    category: 'butterfly-valves',
    specifications: {
      body_material: 'Cast Iron / SG Iron',
      sizes: '40mm - 600mm',
      pressure: 'PN16',
      seat: 'EPDM Rubber'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'single-air-valve',
    name: 'Single Chamber Air Release Valve',
    description: 'Single orifice air release valves for automatic venting of small pockets of air in pressurized water mains.',
    category: 'single-air-valves',
    specifications: {
      type: 'Single Small Orifice',
      pressure: 'PN16',
      sizes: '25mm / 50mm'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'double-air-valve-bulk',
    name: 'Double Orifice Air Release Valve',
    description: 'Double chamber air valves for exhaust of bulk air during pipeline charging and intake during draining.',
    category: 'double-air-valves',
    specifications: {
      type: 'Double Orifice Kinetic',
      sizes: '50mm - 200mm',
      standard: 'IS 14845'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'kinetic-air-valve-hp',
    name: 'Kinetic High Performance Air Valve',
    description: 'Kinetic air release valves designed for heavy municipal and industrial pipeline ventilation with float control.',
    category: 'kinetic-air-valves',
    specifications: {
      type: 'Kinetic Air Valve',
      rating: 'PN16 / PN25',
      sizes: '50mm - 200mm'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'tamperproof-air-valve',
    name: 'Tamperproof Security Air Valve',
    description: 'Anti-tamper air release valves enclosed in a protective shroud, preventing vandalism and unauthorized operation.',
    category: 'tamperproof-air-valves',
    specifications: {
      feature: 'Tamperproof outer shroud',
      sizes: '80mm / 100mm',
      rating: 'PN16'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'kinetic-tav',
    name: 'Kinetic Type TAV Air Valve',
    description: 'Kinetic type tamperproof air release valve providing secure operations under heavy municipal water flows.',
    category: 'kinetic-type-tav',
    specifications: {
      type: 'Kinetic TAV',
      pressure: 'PN16',
      sizes: '80mm - 150mm'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'check-valve-dual',
    name: 'Dual Plate Check Valve',
    description: 'Wafer type dual plate check valves. Light weight design preventing water hammer in pumping lines.',
    category: 'check-valves',
    specifications: {
      type: 'Dual Plate Check',
      sizes: '50mm - 400mm',
      pressure: 'PN16 / PN25'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'pressure-relief-valve',
    name: 'Direct Acting Pressure Relief Valve',
    description: 'Automatic pressure relief valves protecting industrial pipelines from surge and pressure build-up.',
    category: 'pressure-relief-valves',
    specifications: {
      type: 'Direct Acting Relief',
      range: '2 Bar - 16 Bar',
      sizes: '50mm - 200mm'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ball-valve',
    name: 'Three-Piece Ball Valve',
    description: 'Quick quarter-turn ball valves for reliable flow control. Ideal for shut-off applications.',
    category: 'ball-valves',
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
    id: 'foot-valve-suction',
    name: 'CI Suction Foot Valve',
    description: 'Suction line foot valves with integrated strainers. Retains pump prime and filters large debris.',
    category: 'foot-valves',
    specifications: {
      material: 'Cast Iron Body',
      strainer: 'MS / SS mesh',
      sizes: '50mm - 250mm'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'fire-hydrant-post',
    name: 'Standpost Fire Hydrant (Sluice Type)',
    description: 'Standard standpost type B2B fire hydrants for industrial complexes and municipal fire safety connections.',
    category: 'fire-hydrant',
    specifications: {
      standard: 'IS 908 / IS 13095',
      outlets: 'Single / Double outlet',
      pressure: '1.6 MPa'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'woltman-water-meter',
    name: 'Woltman Bulk Water Flow Meter',
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
    id: 'strainer-y-type',
    name: 'Y-Type Industrial Pipeline Strainer',
    description: 'Cast iron Y-strainers for chemical processing, water, and steam lines. Catches pipe scale and debris.',
    category: 'strainer',
    specifications: {
      material: 'Cast Iron (IS 210)',
      screen: 'SS 304 screen mesh',
      sizes: '40mm - 300mm'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },

  // OTHER CATEGORIES SUB-CATEGORIES
  {
    id: 'tyron-ring-seal',
    name: 'Tyron Joint Sealing Rubber Ring',
    description: 'High-grade Tyron profile rubber sealing gaskets for push-on pipeline connections and joint seals.',
    category: 'tyron-ring',
    specifications: {
      material: 'EPDM Rubber / SBR',
      sizes: '80mm - 800mm',
      standard: 'IS 5382'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'flange-ring-gasket',
    name: 'Full Face Flange Gasket Ring',
    description: 'EPDM rubber flange rings for leak-proof flat face flange connection sealing in high-pressure networks.',
    category: 'flange-ring',
    specifications: {
      material: 'Neoprene / EPDM',
      thickness: '3mm / 5mm',
      sizes: '15mm - 600mm'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'o-ring-seals',
    name: 'Viton Industrial O-Rings',
    description: 'Viton O-Rings designed for high temperatures and aggressive chemical/fuel processing applications.',
    category: 'o-ring',
    specifications: {
      material: 'Viton / FKM',
      hardness: '70 / 80 Shore A',
      temp_range: '-20°C to 200°C'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'nut-bolts-hex',
    name: 'Hex Bolt & Nut Assembly',
    description: 'High-tensile zinc plated grade 8.8 hex nuts and bolts for structural assembly and flange joints.',
    category: 'nut-bolts',
    specifications: {
      grade: 'Grade 8.8 High Tensile',
      sizes: 'M12 - M36',
      coating: 'Hot Dip Galvanized / Zinc'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ms-flange-slipon',
    name: 'MS Plate Flange (Table D / E)',
    description: 'Mild Steel slip-on plate flanges suitable for water, low pressure steam, and generic industrial piping.',
    category: 'ms-flange',
    specifications: {
      material: 'Mild Steel IS 2062',
      table: 'Table D / Table E / ANSI 150',
      sizes: '15mm - 400mm'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'di-flange-weldneck',
    name: 'DI Weld Neck Flange (PN16)',
    description: 'Ductile iron weld neck flanges designed for integration in high pressure wastewater and municipal systems.',
    category: 'di-flange',
    specifications: {
      material: 'Ductile Iron (GGG40)',
      rating: 'PN10 / PN16 / PN25',
      sizes: '80mm - 600mm'
    },
    image_url: null,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]