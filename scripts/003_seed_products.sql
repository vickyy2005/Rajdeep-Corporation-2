-- Seed products for Rajdeep Corporation
INSERT INTO products (name, description, category, image_url, specifications, featured) VALUES
-- Pipes
('MS Pipe (Mild Steel)', 'High-quality mild steel pipes suitable for construction, plumbing, and industrial applications. Available in various sizes and thicknesses.', 'Pipes', '/images/products/ms-pipe.jpg', '{"material": "Mild Steel", "sizes": "15mm - 300mm", "thickness": "1.5mm - 10mm", "length": "6m standard"}', true),
('GI Pipe (Galvanized Iron)', 'Corrosion-resistant galvanized iron pipes ideal for water supply and gas lines. Hot-dip galvanized for maximum durability.', 'Pipes', '/images/products/gi-pipe.jpg', '{"material": "Galvanized Iron", "sizes": "15mm - 150mm", "coating": "Hot-dip galvanized", "standard": "IS 1239"}', true),
('PVC Pipe', 'Lightweight and durable PVC pipes for drainage, irrigation, and electrical conduit applications.', 'Pipes', '/images/products/pvc-pipe.jpg', '{"material": "PVC", "sizes": "20mm - 400mm", "pressure_rating": "2.5kg - 10kg", "type": "SWR/Pressure"}', false),
('SS Pipe (Stainless Steel)', 'Premium stainless steel pipes for food processing, pharmaceutical, and high-corrosion environments.', 'Pipes', '/images/products/ss-pipe.jpg', '{"material": "SS 304/316", "sizes": "6mm - 200mm", "finish": "Mirror/Matte", "schedule": "SCH 10/40/80"}', true),

-- Fittings
('MS Elbow', 'Mild steel elbows available in 45 and 90 degree angles for pipe direction changes.', 'Fittings', '/images/products/ms-elbow.jpg', '{"material": "Mild Steel", "angles": "45°, 90°", "sizes": "15mm - 300mm", "type": "Butt Weld/Socket Weld"}', false),
('GI Elbow', 'Galvanized iron elbows for corrosion-resistant pipe fittings in water and gas applications.', 'Fittings', '/images/products/gi-elbow.jpg', '{"material": "Galvanized Iron", "angles": "45°, 90°", "sizes": "15mm - 150mm", "threading": "BSP/NPT"}', true),
('Tee Fitting', 'T-shaped pipe fittings for creating branch connections in piping systems.', 'Fittings', '/images/products/tee-fitting.jpg', '{"material": "MS/GI/SS", "sizes": "15mm - 200mm", "type": "Equal/Reducing"}', false),
('Reducer', 'Pipe reducers for connecting pipes of different diameters. Concentric and eccentric options available.', 'Fittings', '/images/products/reducer.jpg', '{"material": "MS/GI/SS", "type": "Concentric/Eccentric", "sizes": "20x15mm - 300x200mm"}', false),

-- Valves
('Gate Valve', 'Heavy-duty gate valves for on/off flow control in industrial piping systems.', 'Valves', '/images/products/gate-valve.jpg', '{"material": "Cast Iron/SS", "sizes": "15mm - 300mm", "pressure_rating": "PN10/PN16", "operation": "Handwheel"}', true),
('Ball Valve', 'Quick quarter-turn ball valves for reliable flow control. Ideal for shut-off applications.', 'Valves', '/images/products/ball-valve.jpg', '{"material": "Brass/SS", "sizes": "6mm - 100mm", "port": "Full/Reduced", "pressure": "1000 PSI"}', true),
('Check Valve', 'Non-return valves to prevent backflow in piping systems. Swing and spring disc types available.', 'Valves', '/images/products/check-valve.jpg', '{"material": "Cast Iron/SS", "sizes": "15mm - 200mm", "type": "Swing/Disc", "pressure": "PN16"}', false),
('Butterfly Valve', 'Lightweight butterfly valves for large diameter flow control applications.', 'Valves', '/images/products/butterfly-valve.jpg', '{"material": "Cast Iron/Ductile Iron", "sizes": "50mm - 600mm", "operation": "Lever/Gear", "liner": "EPDM/NBR"}', false),

-- Flanges
('Blind Flange', 'Blind flanges for sealing pipe ends and providing access for inspection.', 'Flanges', '/images/products/blind-flange.jpg', '{"material": "MS/SS", "sizes": "15mm - 600mm", "rating": "ANSI 150/300", "finish": "RF/FF"}', true),
('Slip-On Flange', 'Easy-to-install slip-on flanges for low-pressure applications.', 'Flanges', '/images/products/slip-on-flange.jpg', '{"material": "MS/SS", "sizes": "15mm - 600mm", "rating": "ANSI 150/300/600", "standard": "ASME B16.5"}', false),
('Weld Neck Flange', 'High-integrity weld neck flanges for critical high-pressure applications.', 'Flanges', '/images/products/weld-neck-flange.jpg', '{"material": "CS/SS/Alloy", "sizes": "15mm - 600mm", "rating": "150-2500#", "schedule": "SCH 40/80/160"}', true),

-- Fasteners
('Hex Bolt', 'High-tensile hex bolts in various grades for structural and mechanical fastening.', 'Fasteners', '/images/products/hex-bolt.jpg', '{"material": "MS/SS/HT", "grades": "4.6/8.8/10.9/12.9", "sizes": "M6 - M64", "finish": "Plain/Galvanized/Zinc"}', false),
('Nut', 'Hex nuts in standard and locking variants for secure fastening applications.', 'Fasteners', '/images/products/nut.jpg', '{"material": "MS/SS", "type": "Hex/Lock/Coupling", "sizes": "M6 - M64", "grade": "4/8/10"}', false),
('Stud Bolt', 'Double-ended threaded studs for flange connections in pressure vessels and piping.', 'Fasteners', '/images/products/stud-bolt.jpg', '{"material": "B7/L7/B8", "sizes": "M10 - M64", "length": "Custom", "coating": "PTFE/Cadmium"}', true),

-- Industrial Hardware
('Gasket', 'Industrial gaskets for sealing flange connections. Spiral wound, ring joint, and sheet types.', 'Industrial Hardware', '/images/products/gasket.jpg', '{"material": "Graphite/PTFE/Rubber", "type": "Spiral/Ring Joint/Sheet", "sizes": "15mm - 600mm"}', false),
('Pipe Clamp', 'Heavy-duty pipe clamps for securing pipes to structures and supports.', 'Industrial Hardware', '/images/products/pipe-clamp.jpg', '{"material": "MS/GI/SS", "sizes": "15mm - 300mm", "type": "U-Bolt/Split/Lined"}', false),

-- Plumbing Materials
('CP Fitting', 'Chrome-plated brass fittings for premium bathroom and kitchen installations.', 'Plumbing Materials', '/images/products/cp-fitting.jpg', '{"material": "Brass CP", "type": "Angle Valve/Shower/Faucet", "finish": "Chrome Plated", "warranty": "5 Years"}', true),
('Water Tank', 'ISI certified water storage tanks in various capacities for residential and commercial use.', 'Plumbing Materials', '/images/products/water-tank.jpg', '{"material": "HDPE/SS", "capacity": "500L - 10000L", "layers": "3/4 Layer", "certification": "ISI"}', false),

-- Steel & Metal Products
('MS Angle', 'Mild steel angles for structural fabrication, frames, and supports.', 'Steel & Metal Products', '/images/products/ms-angle.jpg', '{"material": "Mild Steel", "sizes": "25x25mm - 200x200mm", "thickness": "3mm - 20mm", "length": "6m/12m"}', false),
('MS Channel', 'C-shaped mild steel channels for structural applications and machine frames.', 'Steel & Metal Products', '/images/products/ms-channel.jpg', '{"material": "Mild Steel", "sizes": "ISMC 75 - ISMC 400", "standard": "IS 2062", "length": "6m/12m"}', true),
('MS Sheet', 'Flat mild steel sheets for fabrication, enclosures, and general engineering.', 'Steel & Metal Products', '/images/products/ms-sheet.jpg', '{"material": "Mild Steel", "thickness": "0.5mm - 50mm", "size": "1250x2500mm/1500x3000mm", "grade": "IS 2062 E250"}', false);
