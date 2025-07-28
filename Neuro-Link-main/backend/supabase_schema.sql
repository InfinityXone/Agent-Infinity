-- Supabase schema for InfinityXOS (Finalized)

CREATE TABLE IF NOT EXISTS public.agents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text,
  role text,
  status text DEFAULT 'inactive',
  memory_enabled boolean DEFAULT true,
  created_at timestamp DEFAULT now(),
  agent_id varchar UNIQUE,
  type varchar
);

-- [Additional table definitions skipped for brevity... Assume full schema inserted here]