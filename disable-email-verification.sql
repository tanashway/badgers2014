-- Disable email confirmation requirement for new users
-- For newer Supabase versions, we need to use the auth.config() function

-- Method 1: Using the auth schema functions
SELECT auth.enable_email_autoconfirm();

-- Method 2: Alternative approach if Method 1 doesn't work
-- This inserts or updates the configuration in the auth schema
INSERT INTO auth.identities (id, user_id, provider_id, identity_data, provider, email, created_at, updated_at)
SELECT 
    uuid_generate_v4(),
    id,
    'email',
    jsonb_build_object('email', email, 'email_verified', true),
    'email',
    email,
    NOW(),
    NOW()
FROM auth.users
ON CONFLICT (provider_id, provider) 
DO UPDATE SET
    identity_data = jsonb_build_object('email', auth.identities.identity_data->>'email', 'email_verified', true);

-- Method 3: If you have access to the Supabase dashboard
-- Go to Authentication > Settings > Email Auth and uncheck "Enable email confirmations"

-- Note: You may need to restart the auth service for changes to take effect
-- This can typically be done through the Supabase dashboard 