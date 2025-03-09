-- Disable email confirmation requirement for new users
UPDATE auth.config
SET confirm_email_on_signup = false;

-- Also set auto-confirm to true for additional safety
UPDATE auth.config
SET enable_email_autoconfirm = true;

-- Verify the changes
SELECT confirm_email_on_signup, enable_email_autoconfirm FROM auth.config; 