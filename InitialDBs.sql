-- Table for the master list of possible events (your JSON content)
CREATE TABLE f1_events_pool (
  id SERIAL PRIMARY KEY,
  text TEXT UNIQUE NOT NULL
);
-- add column for rarity or points values 1-5
ALTER TABLE f1_events_pool ADD COLUMN Points INTEGER DEFAULT 1;

-- Table for "Live" status (What the host toggles)
CREATE TABLE live_race_state (
  event_text TEXT PRIMARY KEY REFERENCES f1_events_pool(text),
  is_happened BOOLEAN DEFAULT FALSE
);
ALTER TABLE live_race_state ADD COLUMN Points INTEGER DEFAULT 1;

-- Table for Player Boards
CREATE TABLE player_boards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name TEXT,
  layout JSONB, -- The 5x5 grid of event strings
  marks JSONB,  -- Which squares the player has clicked (for verification)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table for App Secrets (Host Password)
CREATE TABLE app_config (
  key TEXT PRIMARY KEY,
  value TEXT
);
-- Enforce unique player_names
ALTER TABLE player_boards ADD CONSTRAINT unique_player_name UNIQUE (player_name);

-- Insert a default secret (Change 'ferrari2026' to your own secret!)
INSERT INTO app_config (key, value) VALUES ('host_password', 'tutududuMaxVerstappen');


--POLICIES
-- This tells Supabase: "Allow anyone with the anon key to READ the pool"
CREATE POLICY "Allow public read-only access" 
ON f1_events_pool 
FOR SELECT 
USING (true);

-- Do the same for the race state so the gold squares show up
CREATE POLICY "Allow public read-only race state" 
ON live_race_state 
FOR SELECT 
USING (true);

CREATE POLICY "Allow public read app_config" 
ON app_config 
FOR SELECT 
USING (true);

-- Allow the Host to insert/update the race state
CREATE POLICY "Allow public insert/update race state" 
ON live_race_state 
FOR ALL 
USING (true) 
WITH CHECK (true);

-- Allow players to create their boards
CREATE POLICY "Allow public insert player_boards" 
ON player_boards FOR INSERT WITH CHECK (true);

-- Allow players to see their boards (and others)
CREATE POLICY "Allow public read player_boards" 
ON player_boards FOR SELECT USING (true);

-- Allow players to update their own marks
CREATE POLICY "Allow public update player_boards" 
ON player_boards FOR UPDATE USING (true);

-- Allow the host to add new event options to the pool
CREATE POLICY "Allow public insert to pool" 
ON f1_events_pool 
FOR INSERT 
WITH CHECK (true);