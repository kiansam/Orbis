export interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: 'user' | 'admin'
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: string
  user_id: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  plan: 'free' | 'starter' | 'pro' | 'enterprise'
  status: string
  current_period_end: string | null
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  cover_image: string | null
  author_id: string | null
  tags: string[]
  published_at: string | null
  is_published: boolean
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  company: string | null
  message: string
  created_at: string
}

export interface NotificationPreferences {
  id: string
  user_id: string
  marketing_emails: boolean
  product_updates: boolean
  security_alerts: boolean
  created_at: string
  updated_at: string
}
