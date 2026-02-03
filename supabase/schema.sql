create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  price integer not null,
  description text,
  image_url text,
  category text,
  stock integer,
  is_active boolean default true,
  sort_order integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
before update on products
for each row
execute procedure set_updated_at();

alter table products enable row level security;

drop policy if exists "Public read active products" on products;
create policy "Public read active products"
  on products
  for select
  using (is_active = true);
