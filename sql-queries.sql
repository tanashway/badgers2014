-- Dashboard Queries

-- Get upcoming events
SELECT 
  id, 
  title, 
  event_type, 
  start_time, 
  location 
FROM events
WHERE start_time > NOW()
ORDER BY start_time
LIMIT 5;

-- Get player count
SELECT COUNT(*) as player_count FROM players;

-- Player Management Queries

-- Get all players
SELECT 
  p.id, 
  p.jersey_number, 
  p.position, 
  p.birth_date, 
  pr.full_name, 
  pr.avatar_url 
FROM players p
JOIN profiles pr ON p.profile_id = pr.id
ORDER BY p.jersey_number;

-- Add new player
INSERT INTO players (profile_id, jersey_number, position, birth_date)
VALUES ('{{profile_id.value}}', {{jersey_number.value}}, '{{position.value}}', '{{birth_date.value}}');

-- Event Calendar Queries

-- Get all events
SELECT 
  id, 
  title, 
  description, 
  event_type, 
  start_time, 
  end_time, 
  location 
FROM events
ORDER BY start_time;

-- Add new event
INSERT INTO events (title, description, event_type, start_time, end_time, location, created_by)
VALUES (
  '{{title.value}}', 
  '{{description.value}}', 
  '{{event_type.value}}', 
  '{{start_time.value}}', 
  '{{end_time.value}}', 
  '{{location.value}}', 
  '{{user_id}}'
);

-- Attendance Tracking Queries

-- Get attendance for an event
SELECT 
  a.id, 
  a.status, 
  p.jersey_number, 
  pr.full_name 
FROM attendance a
JOIN players p ON a.player_id = p.id
JOIN profiles pr ON p.profile_id = pr.id
WHERE a.event_id = '{{event_dropdown.selectedOptionValue}}'
ORDER BY p.jersey_number;

-- Update attendance status
UPDATE attendance
SET status = '{{status_dropdown.selectedOptionValue}}'
WHERE id = '{{attendance_table.selectedRow.id}}';

-- Get all players for an event (to mark attendance)
SELECT 
  p.id, 
  p.jersey_number, 
  pr.full_name,
  COALESCE(a.status, 'Not Marked') as status
FROM players p
JOIN profiles pr ON p.profile_id = pr.id
LEFT JOIN attendance a ON a.player_id = p.id AND a.event_id = '{{event_dropdown.selectedOptionValue}}'
ORDER BY p.jersey_number;

-- Insert new attendance record
INSERT INTO attendance (event_id, player_id, status)
VALUES ('{{event_id.value}}', '{{player_id.value}}', '{{status.value}}')
ON CONFLICT (event_id, player_id) 
DO UPDATE SET status = '{{status.value}}';

-- Team Statistics Queries

-- Get attendance statistics by player
SELECT 
  pr.full_name,
  p.jersey_number,
  COUNT(a.id) as total_events,
  SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) as present_count,
  SUM(CASE WHEN a.status = 'Absent' THEN 1 ELSE 0 END) as absent_count,
  SUM(CASE WHEN a.status = 'Excused' THEN 1 ELSE 0 END) as excused_count,
  ROUND(SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END)::numeric / COUNT(a.id) * 100, 2) as attendance_percentage
FROM players p
JOIN profiles pr ON p.profile_id = pr.id
LEFT JOIN attendance a ON a.player_id = p.id
GROUP BY pr.full_name, p.jersey_number
ORDER BY attendance_percentage DESC; 