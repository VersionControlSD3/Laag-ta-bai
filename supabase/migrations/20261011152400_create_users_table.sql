create table public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  gender text,
  nationality text
);
