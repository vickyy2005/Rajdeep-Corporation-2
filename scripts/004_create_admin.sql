-- This script creates an admin user entry after you sign up via Supabase Auth
-- First, sign up at /admin/login, then run this script with your user ID

-- To find your user ID, you can check the auth.users table in Supabase Dashboard
-- or console.log the user object after signing up

-- Replace 'YOUR_USER_ID_HERE' with the actual UUID from auth.users
-- INSERT INTO admin_users (id, email, is_super_admin)
-- VALUES ('YOUR_USER_ID_HERE', 'your-email@example.com', true);

-- Example (uncomment and modify):
-- INSERT INTO admin_users (id, email, is_super_admin)
-- VALUES ('123e4567-e89b-12d3-a456-426614174000', 'admin@rajdeepcorp.com', true);

-- Note: You must first create an account through Supabase Auth (sign up) 
-- before running this script. The ID must match an existing user in auth.users.
