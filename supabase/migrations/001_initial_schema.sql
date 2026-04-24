-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  avatar_url text,
  role text not null default 'user' check (role in ('user', 'admin')),
  is_suspended boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Subscriptions table
create table public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  stripe_customer_id text,
  stripe_subscription_id text,
  plan text not null default 'free' check (plan in ('free', 'starter', 'pro', 'enterprise')),
  status text not null default 'inactive',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Posts table (blog)
create table public.posts (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text not null unique,
  content text not null,
  excerpt text,
  cover_image text,
  author_id uuid references auth.users on delete set null,
  tags text[] default '{}',
  published_at timestamptz,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Contact submissions table
create table public.contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

-- Notification preferences table
create table public.notification_preferences (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null unique,
  marketing_emails boolean not null default true,
  product_updates boolean not null default true,
  security_alerts boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS Policies
alter table public.profiles enable row level security;
alter table public.subscriptions enable row level security;
alter table public.posts enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.notification_preferences enable row level security;

-- Profiles policies
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update all profiles" on public.profiles for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Subscriptions policies
create policy "Users can view own subscription" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Service role can manage subscriptions" on public.subscriptions for all using (true);
create policy "Admins can view all subscriptions" on public.subscriptions for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Posts policies
create policy "Anyone can view published posts" on public.posts for select using (is_published = true);
create policy "Admins can manage all posts" on public.posts for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Contact submissions policies
create policy "Anyone can insert contact submissions" on public.contact_submissions for insert with check (true);
create policy "Admins can view all contact submissions" on public.contact_submissions for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Notification preferences policies
create policy "Users can view own preferences" on public.notification_preferences for select using (auth.uid() = user_id);
create policy "Users can update own preferences" on public.notification_preferences for update using (auth.uid() = user_id);
create policy "Users can insert own preferences" on public.notification_preferences for insert with check (auth.uid() = user_id);

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );

  insert into public.subscriptions (user_id)
  values (new.id);

  insert into public.notification_preferences (user_id)
  values (new.id);

  return new;
end;
$$;

-- Trigger for new user creation
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger handle_updated_at before update on public.profiles for each row execute procedure public.handle_updated_at();
create trigger handle_updated_at before update on public.subscriptions for each row execute procedure public.handle_updated_at();
create trigger handle_updated_at before update on public.posts for each row execute procedure public.handle_updated_at();
create trigger handle_updated_at before update on public.notification_preferences for each row execute procedure public.handle_updated_at();
