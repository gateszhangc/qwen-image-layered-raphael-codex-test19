-- Schema initialization for qwen_image_layered
-- Run against your DATABASE_URL to provision the required tables.

-- Create schema
CREATE SCHEMA IF NOT EXISTS qwen_image_layered;

-- Grant privileges on the schema
GRANT ALL ON SCHEMA qwen_image_layered TO postgres, anon, authenticated, service_role;

-- Default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA qwen_image_layered GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA qwen_image_layered GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA qwen_image_layered GRANT ALL ON FUNCTIONS TO postgres, anon, authenticated, service_role;

-- Affiliates table
CREATE TABLE IF NOT EXISTS qwen_image_layered.affiliates (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_uuid character varying NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  status character varying NOT NULL DEFAULT ''::character varying,
  invited_by character varying NOT NULL,
  paid_order_no character varying NOT NULL DEFAULT ''::character varying,
  paid_amount integer NOT NULL DEFAULT 0,
  reward_percent integer NOT NULL DEFAULT 0,
  reward_amount integer NOT NULL DEFAULT 0
);

-- API keys
CREATE TABLE IF NOT EXISTS qwen_image_layered.apikeys (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  api_key character varying NOT NULL UNIQUE,
  title character varying,
  user_uuid character varying NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  status character varying DEFAULT 'active'
);

-- Credits
CREATE TABLE IF NOT EXISTS qwen_image_layered.credits (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  trans_no character varying NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  user_uuid character varying NOT NULL,
  trans_type character varying NOT NULL,
  credits integer NOT NULL,
  order_no character varying,
  expired_at timestamp with time zone
);

-- Feedbacks
CREATE TABLE IF NOT EXISTS qwen_image_layered.feedbacks (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now(),
  status character varying,
  user_uuid character varying,
  content text,
  rating integer
);

-- Orders
CREATE TABLE IF NOT EXISTS qwen_image_layered.orders (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  order_no character varying NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT now(),
  user_uuid character varying NOT NULL DEFAULT ''::character varying,
  user_email character varying NOT NULL DEFAULT ''::character varying,
  amount integer NOT NULL,
  interval character varying,
  expired_at timestamp with time zone,
  status character varying NOT NULL,
  stripe_session_id character varying,
  credits integer NOT NULL,
  currency character varying,
  sub_id character varying,
  sub_interval_count integer,
  sub_cycle_anchor integer,
  sub_period_end integer,
  sub_period_start integer,
  sub_times integer,
  product_id character varying,
  product_name character varying,
  valid_months integer,
  order_detail text,
  paid_at timestamp with time zone,
  paid_email character varying,
  paid_detail text
);

-- Outfits
CREATE TABLE IF NOT EXISTS qwen_image_layered.outfits (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  uuid character varying NOT NULL UNIQUE,
  user_uuid character varying,
  created_at timestamp with time zone DEFAULT now(),
  base_image_url character varying,
  img_description text,
  img_url character varying,
  status character varying
);

-- Wallpapers
CREATE TABLE IF NOT EXISTS qwen_image_layered.wallpapers (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  uuid character varying NOT NULL UNIQUE,
  user_uuid character varying,
  created_at timestamp with time zone DEFAULT now(),
  img_description text,
  img_url character varying,
  status character varying
);

-- Posts
CREATE TABLE IF NOT EXISTS qwen_image_layered.posts (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  uuid character varying NOT NULL UNIQUE,
  slug character varying,
  title character varying,
  description text,
  content text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  status character varying,
  cover_url character varying,
  author_name character varying,
  author_avatar_url character varying,
  locale character varying
);

-- Users
CREATE TABLE IF NOT EXISTS qwen_image_layered.users (
  id integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  uuid character varying NOT NULL UNIQUE,
  email character varying NOT NULL,
  created_at timestamp with time zone,
  nickname character varying,
  avatar_url character varying,
  locale character varying,
  signin_type character varying,
  signin_ip character varying,
  signin_provider character varying,
  signin_openid character varying,
  invite_code character varying NOT NULL DEFAULT ''::character varying,
  updated_at timestamp with time zone,
  invited_by character varying NOT NULL DEFAULT ''::character varying,
  is_affiliate boolean NOT NULL DEFAULT false
);

-- Unique index for (email, provider)
CREATE UNIQUE INDEX IF NOT EXISTS email_provider_unique_idx
  ON qwen_image_layered.users (email, signin_provider);
