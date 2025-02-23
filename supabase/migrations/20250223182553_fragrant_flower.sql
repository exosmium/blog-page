/*
  # Create entries and interactions tables

  1. New Tables
    - `entries`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `content` (text)
      - `mood` (text)
      - `user_id` (uuid, references auth.users)
      - `date` (date)

    - `comments`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `content` (text)
      - `entry_id` (uuid, references entries)
      - `user_id` (uuid, references auth.users)

    - `likes`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `entry_id` (uuid, references entries)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create entries table
CREATE TABLE IF NOT EXISTS entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  content text NOT NULL,
  mood text,
  user_id uuid REFERENCES auth.users NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE
);

ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read entries"
  ON entries
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create their own entries"
  ON entries
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  content text NOT NULL,
  entry_id uuid REFERENCES entries ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read comments"
  ON comments
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create their own comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  entry_id uuid REFERENCES entries ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  UNIQUE(entry_id, user_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read likes"
  ON likes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can toggle their own likes"
  ON likes
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS entries_date_idx ON entries(date);
CREATE INDEX IF NOT EXISTS comments_entry_id_idx ON comments(entry_id);
CREATE INDEX IF NOT EXISTS likes_entry_id_idx ON likes(entry_id);