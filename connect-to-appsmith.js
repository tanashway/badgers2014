/**
 * Badgers 2014 - Appsmith Connection Helper
 * 
 * This script helps connect your Badgers 2014 soccer team management system to Appsmith.
 * 
 * Instructions:
 * 1. Open your browser and navigate to https://appsmith.lucidsro.com
 * 2. Log in with your credentials
 * 3. Create a new application or open an existing one
 * 4. Set up a Supabase data source with the following details:
 */

const appsmithConfig = {
  // Appsmith configuration
  appsmithUrl: 'https://appsmith.lucidsro.com',
  disableIntercom: true,
  disableTelemetry: false,
  mailEnabled: false,
  
  // Supabase connection details
  supabaseUrl: 'https://supabase.lucidsro.com',
  supabaseAnonKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTc0MTM2NjM4MCwiZXhwIjo0ODk3MDM5OTgwLCJyb2xlIjoiYW5vbiJ9.mkFHv0NozPn9_nfN8HutiBq_LMWEvwsQUYY1_Ecvp2M',
  
  // Database schema
  tables: [
    {
      name: 'profiles',
      primaryKey: 'id',
      fields: ['id', 'full_name', 'avatar_url', 'role', 'created_at', 'updated_at']
    },
    {
      name: 'players',
      primaryKey: 'id',
      fields: ['id', 'profile_id', 'jersey_number', 'position', 'birth_date', 'medical_info', 'emergency_contact', 'created_at', 'updated_at']
    },
    {
      name: 'events',
      primaryKey: 'id',
      fields: ['id', 'title', 'description', 'event_type', 'start_time', 'end_time', 'location', 'created_by', 'created_at', 'updated_at']
    },
    {
      name: 'attendance',
      primaryKey: 'id',
      fields: ['id', 'event_id', 'player_id', 'status', 'created_at', 'updated_at']
    }
  ],
  
  // Suggested pages to create in Appsmith
  suggestedPages: [
    'Dashboard',
    'Player Management',
    'Event Calendar',
    'Attendance Tracking',
    'Team Statistics'
  ]
};

console.log('Appsmith Connection Helper for Badgers 2014');
console.log('Open your browser and navigate to:', appsmithConfig.appsmithUrl);
console.log('Use the configuration details above to set up your Appsmith application.');

/**
 * Steps to create a Supabase data source in Appsmith:
 * 
 * 1. In your Appsmith application, go to "Data Sources" in the left sidebar
 * 2. Click "+ New Data Source"
 * 3. Select "Supabase"
 * 4. Enter the following details:
 *    - Name: Badgers2014
 *    - Connection URL: https://supabase.lucidsro.com
 *    - Service Key: (Use your service key or API key)
 * 5. Click "Test" to verify the connection
 * 6. Click "Save" to create the data source
 * 
 * After setting up the data source, you can create queries to interact with your data.
 */ 