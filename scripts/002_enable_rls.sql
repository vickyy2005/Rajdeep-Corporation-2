-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfq_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Products policies: Public can read, only admins can modify
CREATE POLICY "products_select_public" ON products
  FOR SELECT USING (true);

CREATE POLICY "products_insert_admin" ON products
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "products_update_admin" ON products
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

CREATE POLICY "products_delete_admin" ON products
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- RFQ Requests policies
-- Anyone can insert (submit a quote request)
CREATE POLICY "rfq_insert_public" ON rfq_requests
  FOR INSERT WITH CHECK (true);

-- Authenticated users can view their own requests
CREATE POLICY "rfq_select_own" ON rfq_requests
  FOR SELECT USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Admins can update (change status)
CREATE POLICY "rfq_update_admin" ON rfq_requests
  FOR UPDATE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Admins can delete
CREATE POLICY "rfq_delete_admin" ON rfq_requests
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
  );

-- Admin users table: Only admins can read admin list
CREATE POLICY "admin_users_select" ON admin_users
  FOR SELECT USING (id = auth.uid());
