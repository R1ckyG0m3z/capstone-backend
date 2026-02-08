DROP TABLE IF EXISTS user_trips;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS user_profiles;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id serial PRIMARY KEY,
  email text NOT NULL UNIQUE,
  password text NOT NULL
);

CREATE TABLE user_profiles (
  id serial PRIMARY KEY,
  user_id int NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  name text,
  about_me text,
  vehicle_type text,
  photo_url text,
  bio text,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW()
);

CREATE TABLE trips (
  id serial PRIMARY KEY,
  trip_name text NOT NULL,
  trip_location text NOT NULL,    
  trip_difficulty text NOT NULL,
  trip_description text NOT NULL,
  terrain_type text NOT NULL,
  trail_length text,
  estimated_time text,
  photo_urls text[],
  created_by int REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW()
);

CREATE TABLE user_trips (
  user_profile_id int NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  trip_id int NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  travel_start_date date,
  travel_end_date date,
  status text DEFAULT 'planned' CHECK (status IN ('planned', 'in_progress', 'completed', 'cancelled')),
  notes text,
  created_at timestamp DEFAULT NOW(),
  updated_at timestamp DEFAULT NOW(),
  PRIMARY KEY (user_profile_id, trip_id)
);