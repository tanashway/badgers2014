-- Disable email confirmation requirement for new users
-- Since the auth.enable_email_autoconfirm() function doesn't exist, we'll try alternative approaches

-- Method 1: Update existing users to mark their emails as verified
UPDATE auth.users
SET email_confirmed_at = CURRENT_TIMESTAMP
WHERE email_confirmed_at IS NULL;

-- Method 2: Set up a trigger to automatically confirm emails for new users
CREATE OR REPLACE FUNCTION public.auto_confirm_email()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE auth.users
  SET email_confirmed_at = CURRENT_TIMESTAMP
  WHERE id = NEW.id AND email_confirmed_at IS NULL;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop the trigger if it already exists to avoid errors
DROP TRIGGER IF EXISTS confirm_email_trigger ON auth.users;

-- Create the trigger
CREATE TRIGGER confirm_email_trigger
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.auto_confirm_email();

-- Method 3: If you have access to the Supabase dashboard (RECOMMENDED)
-- Go to Authentication > Settings > Email Auth and uncheck "Enable email confirmations"
-- This is the most reliable method and should be used if possible

-- Note: You may need to restart the auth service for changes to take effect
-- This can typically be done through the Supabase dashboard 