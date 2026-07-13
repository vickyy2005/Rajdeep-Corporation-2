-- Seed products for Rajdeep Corporation with lowercase categories and explicit slug IDs
INSERT INTO products (id, name, description, category, image_url, specifications, featured) VALUES
-- Pipes
('ms-pipe', 'MS Pipe (Mild Steel)', 'High-quality mild steel pipes suitable for construction, plumbing, and industrial applications. Available in various sizes and thicknesses.', 'pipes', null, '{"material": "Mild Steel", "sizes": "15mm - 300mm", "thickness": "1.5mm - 10mm", "length": "6m standard"}', true),
('gi-pipe', 'GI Pipe (Galvanized Iron)', 'Corrosion-resistant galvanized iron pipes ideal for water supply and gas lines. Hot-dip galvanized for maximum durability.', 'pipes', null, '{"material": "Galvanized Iron", "sizes": "15mm - 150mm", "coating": "Hot-dip galvanized", "standard": "IS 1239"}', true),
('pvc-pipe', 'PVC Pipe', 'Lightweight and durable PVC pipes for drainage, irrigation, and electrical conduit applications.', 'pipes', null, '{"material": "PVC", "sizes": "20mm - 400mm", "pressure_rating": "2.5kg - 10kg", "type": "SWR/Pressure"}', false),
('ss-pipe', 'SS Pipe (Stainless Steel)', 'Premium stainless steel pipes for food processing, pharmaceutical, and high-corrosion environments.', 'pipes', null, '{"material": "SS 304/316", "sizes": "6mm - 200mm", "finish": "Mirror/Matte", "schedule": "SCH 10/40/80"}', true),

-- Fittings
('ms-elbow', 'MS Elbow', 'Mild steel elbows available in 45 and 90 degree angles for pipe direction changes.', 'fittings', null, '{"material": "Mild Steel", "angles": "45°, 90°", "sizes": "15mm - 300mm", "type": "Butt Weld/Socket Weld"}', false),
('gi-elbow', 'GI Elbow', 'Galvanized iron elbows for corrosion-resistant pipe fittings in water and gas applications.', 'fittings', null, '{"material": "Galvanized Iron", "angles": "45°, 90°", "sizes": "15mm - 150mm", "threading": "BSP/NPT"}', true),
('tee-fitting', 'Tee Fitting', 'T-shaped pipe fittings for creating branch connections in piping systems.', 'fittings', null, '{"material": "MS/GI/SS", "sizes": "15mm - 200mm", "type": "Equal/Reducing"}', false),
('reducer', 'Reducer', 'Pipe reducers for connecting pipes of different diameters. Concentric and eccentric options available.', 'fittings', null, '{"material": "MS/GI/SS", "type": "Concentric/Eccentric", "sizes": "20x15mm - 300x200mm"}', false),

-- Valves
('gate-valve', 'Gate Valve', 'Heavy-duty gate valves for on/off flow control in industrial piping systems.', 'valves', null, '{"material": "Cast Iron/SS", "sizes": "15mm - 300mm", "pressure_rating": "PN10/PN16", "operation": "Handwheel"}', true),
('ball-valve', 'Ball Valve', 'Quick quarter-turn ball valves for reliable flow control. Ideal for shut-off applications.', 'valves', null, '{"material": "Brass/SS", "sizes": "6mm - 100mm", "port": "Full/Reduced", "pressure": "1000 PSI"}', true),
('check-valve', 'Check Valve', 'Non-return valves to prevent backflow in piping systems. Swing and spring disc types available.', 'valves', null, '{"material": "Cast Iron/SS", "sizes": "15mm - 200mm", "type": "Swing/Disc", "pressure": "PN16"}', false),
('butterfly-valve', 'Butterfly Valve', 'Lightweight butterfly valves for large diameter flow control applications.', 'valves', null, '{"material": "Cast Iron/Ductile Iron", "sizes": "50mm - 600mm", "operation": "Lever/Gear", "liner": "EPDM/NBR"}', false),

-- Flanges
('blind-flange', 'Blind Flange', 'Blind flanges for sealing pipe ends and providing access for inspection.', 'flanges', null, '{"material": "MS/SS", "sizes": "15mm - 600mm", "rating": "ANSI 150/300", "finish": "RF/FF"}', true),
('slip-on-flange', 'Slip-On Flange', 'Easy-to-install slip-on flanges for low-pressure applications.', 'flanges', null, '{"material": "MS/SS", "sizes": "15mm - 600mm", "rating": "ANSI 150/300/600", "standard": "ASME B16.5"}', false),
('weld-neck-flange', 'Weld Neck Flange', 'High-integrity weld neck flanges for critical high-pressure applications.', 'flanges', null, '{"material": "CS/SS/Alloy", "sizes": "15mm - 600mm", "rating": "150-2500#", "schedule": "SCH 40/80/160"}', true);
