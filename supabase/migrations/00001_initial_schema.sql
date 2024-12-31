-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Create users table
create table public.users (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  name text,
  role text default 'user'::text not null,
  permissions jsonb default '["view_dashboard"]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create teams table
create table public.teams (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create team_members table
create table public.team_members (
  id uuid default uuid_generate_v4() primary key,
  team_id uuid references public.teams(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade not null,
  role text default 'member'::text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(team_id, user_id)
);

-- Create properties table
create table public.properties (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  type text not null,
  status text not null,
  price numeric(12,2) not null,
  area numeric(10,2) not null,
  bedrooms integer,
  bathrooms integer,
  location jsonb not null,
  amenities jsonb default '[]'::jsonb,
  images jsonb default '[]'::jsonb,
  team_id uuid references public.teams(id) on delete set null,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create leads table
create table public.leads (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text,
  phone text,
  source text not null,
  status text not null,
  requirements jsonb default '{}'::jsonb,
  notes text,
  assigned_to uuid references public.users(id) on delete set null,
  team_id uuid references public.teams(id) on delete set null,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create lead_interactions table
create table public.lead_interactions (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references public.leads(id) on delete cascade not null,
  type text not null,
  notes text,
  created_by uuid references public.users(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create lead_property_interests table
create table public.lead_property_interests (
  id uuid default uuid_generate_v4() primary key,
  lead_id uuid references public.leads(id) on delete cascade not null,
  property_id uuid references public.properties(id) on delete cascade not null,
  status text not null,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(lead_id, property_id)
);

-- Enable Row Level Security
alter table public.users enable row level security;
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.properties enable row level security;
alter table public.leads enable row level security;
alter table public.lead_interactions enable row level security;
alter table public.lead_property_interests enable row level security;

-- Create RLS Policies

-- Users policies
create policy "Users can view own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.users for update
  using (auth.uid() = id);

-- Teams policies
create policy "Team members can view their teams"
  on public.teams for select
  using (
    exists (
      select 1 from public.team_members
      where team_members.team_id = teams.id
      and team_members.user_id = auth.uid()
    )
  );

create policy "Team admins can manage their teams"
  on public.teams for all
  using (
    exists (
      select 1 from public.team_members
      where team_members.team_id = teams.id
      and team_members.user_id = auth.uid()
      and team_members.role = 'admin'
    )
  );

-- Team members policies
create policy "Team members can view team roster"
  on public.team_members for select
  using (
    exists (
      select 1 from public.team_members as tm
      where tm.team_id = team_members.team_id
      and tm.user_id = auth.uid()
    )
  );

create policy "Team admins can manage team members"
  on public.team_members for all
  using (
    exists (
      select 1 from public.team_members as tm
      where tm.team_id = team_members.team_id
      and tm.user_id = auth.uid()
      and tm.role = 'admin'
    )
  );

-- Properties policies
create policy "Team members can view team properties"
  on public.properties for select
  using (
    exists (
      select 1 from public.team_members
      where team_members.team_id = properties.team_id
      and team_members.user_id = auth.uid()
    )
  );

create policy "Team members can manage team properties"
  on public.properties for all
  using (
    exists (
      select 1 from public.team_members
      where team_members.team_id = properties.team_id
      and team_members.user_id = auth.uid()
    )
  );

-- Leads policies
create policy "Team members can view team leads"
  on public.leads for select
  using (
    exists (
      select 1 from public.team_members
      where team_members.team_id = leads.team_id
      and team_members.user_id = auth.uid()
    )
  );

create policy "Team members can manage assigned leads"
  on public.leads for all
  using (
    exists (
      select 1 from public.team_members
      where team_members.team_id = leads.team_id
      and team_members.user_id = auth.uid()
    )
  );

-- Lead interactions policies
create policy "Team members can view lead interactions"
  on public.lead_interactions for select
  using (
    exists (
      select 1 from public.leads
      join public.team_members on team_members.team_id = leads.team_id
      where lead_interactions.lead_id = leads.id
      and team_members.user_id = auth.uid()
    )
  );

create policy "Team members can manage lead interactions"
  on public.lead_interactions for all
  using (
    exists (
      select 1 from public.leads
      join public.team_members on team_members.team_id = leads.team_id
      where lead_interactions.lead_id = leads.id
      and team_members.user_id = auth.uid()
    )
  );

-- Lead property interests policies
create policy "Team members can view lead property interests"
  on public.lead_property_interests for select
  using (
    exists (
      select 1 from public.leads
      join public.team_members on team_members.team_id = leads.team_id
      where lead_property_interests.lead_id = leads.id
      and team_members.user_id = auth.uid()
    )
  );

create policy "Team members can manage lead property interests"
  on public.lead_property_interests for all
  using (
    exists (
      select 1 from public.leads
      join public.team_members on team_members.team_id = leads.team_id
      where lead_property_interests.lead_id = leads.id
      and team_members.user_id = auth.uid()
    )
  );

-- Create functions and triggers for updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create updated_at triggers for all tables
create trigger handle_users_updated_at
  before update on public.users
  for each row execute function public.handle_updated_at();

create trigger handle_teams_updated_at
  before update on public.teams
  for each row execute function public.handle_updated_at();

create trigger handle_team_members_updated_at
  before update on public.team_members
  for each row execute function public.handle_updated_at();

create trigger handle_properties_updated_at
  before update on public.properties
  for each row execute function public.handle_updated_at();

create trigger handle_leads_updated_at
  before update on public.leads
  for each row execute function public.handle_updated_at();

create trigger handle_lead_property_interests_updated_at
  before update on public.lead_property_interests
  for each row execute function public.handle_updated_at(); 