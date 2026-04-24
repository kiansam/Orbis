'use client'

import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, CreditCard, Bell, Shield, ExternalLink, Upload } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { profileSchema, changeEmailSchema, changePasswordSchema, ProfileFormData, ChangeEmailFormData, ChangePasswordFormData } from '@/lib/validations'
import { createClient } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast'
import { formatDate } from '@/lib/utils'

export default function SettingsPage() {
  const { toast } = useToast()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [avatarUploading, setAvatarUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [profile, setProfile] = useState<{ full_name: string | null; avatar_url: string | null } | null>(null)
  const [subscription, setSubscription] = useState<{ plan: string; status: string; current_period_end: string | null } | null>(null)
  const [notifications, setNotifications] = useState({
    marketing_emails: true,
    product_updates: true,
    security_alerts: true,
  })
  const [notifLoading, setNotifLoading] = useState(false)
  const [billingLoading, setBillingLoading] = useState(false)

  const profileForm = useForm<ProfileFormData>({ resolver: zodResolver(profileSchema) })
  const emailForm = useForm<ChangeEmailFormData>({ resolver: zodResolver(changeEmailSchema) })
  const passwordForm = useForm<ChangePasswordFormData>({ resolver: zodResolver(changePasswordSchema) })

  useEffect(() => {
    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const [{ data: profileData }, { data: subData }, { data: notifData }] = await Promise.all([
        supabase.from('profiles').select('full_name, avatar_url').eq('id', user.id).single(),
        supabase.from('subscriptions').select('plan, status, current_period_end').eq('user_id', user.id).single(),
        supabase.from('notification_preferences').select('*').eq('user_id', user.id).single(),
      ])

      if (profileData) {
        setProfile(profileData)
        profileForm.setValue('full_name', profileData.full_name || '')
      }
      if (subData) setSubscription(subData)
      if (notifData) {
        setNotifications({
          marketing_emails: notifData.marketing_emails,
          product_updates: notifData.product_updates,
          security_alerts: notifData.security_alerts,
        })
      }

      emailForm.setValue('email', user.email || '')
    }
    loadData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 2 * 1024 * 1024) {
      toast({ title: 'File too large', description: 'Avatar must be under 2MB.', variant: 'destructive' })
      return
    }

    setAvatarUploading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const ext = file.name.split('.').pop()
    const path = `${user.id}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true })

    if (uploadError) {
      toast({ title: 'Upload failed', description: uploadError.message, variant: 'destructive' })
      setAvatarUploading(false)
      return
    }

    const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(path)

    const { error: updateError } = await supabase
      .from('profiles')
      .update({ avatar_url: publicUrl })
      .eq('id', user.id)

    if (updateError) {
      toast({ title: 'Error', description: updateError.message, variant: 'destructive' })
    } else {
      setProfile((p) => p ? { ...p, avatar_url: publicUrl } : null)
      toast({ title: 'Avatar updated', description: 'Your profile photo has been updated.' })
    }
    setAvatarUploading(false)
  }

  const onProfileSubmit = async (data: ProfileFormData) => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: data.full_name })
      .eq('id', user.id)

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Profile updated', description: 'Your profile has been updated successfully.' })
      setProfile((p) => p ? { ...p, full_name: data.full_name } : null)
    }
    setLoading(false)
  }

  const onEmailSubmit = async (data: ChangeEmailFormData) => {
    const { error } = await supabase.auth.updateUser({ email: data.email })
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Verification sent', description: 'Check your new email for a confirmation link.' })
    }
  }

  const onPasswordSubmit = async (data: ChangePasswordFormData) => {
    const { error } = await supabase.auth.updateUser({ password: data.new_password })
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' })
    } else {
      toast({ title: 'Password updated', description: 'Your password has been updated successfully.' })
      passwordForm.reset()
    }
  }

  const handleNotifToggle = async (key: keyof typeof notifications) => {
    const newValue = !notifications[key]
    setNotifications((prev) => ({ ...prev, [key]: newValue }))
    setNotifLoading(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase
      .from('notification_preferences')
      .update({ [key]: newValue })
      .eq('user_id', user.id)

    if (error) {
      toast({ title: 'Error', description: 'Failed to update notification preference', variant: 'destructive' })
      setNotifications((prev) => ({ ...prev, [key]: !newValue }))
    }
    setNotifLoading(false)
  }

  const handleBillingPortal = async () => {
    setBillingLoading(true)
    try {
      const res = await fetch('/api/billing/portal', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        toast({ title: 'Error', description: data.error || 'Failed to open billing portal', variant: 'destructive' })
      }
    } catch {
      toast({ title: 'Error', description: 'Failed to open billing portal', variant: 'destructive' })
    } finally {
      setBillingLoading(false)
    }
  }

  const displayName = profile?.full_name || 'User'
  const initials = displayName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-foreground-muted mt-1">Manage your account, billing, and preferences.</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-background-card border border-border">
          <TabsTrigger value="profile" className="data-[state=active]:bg-accent data-[state=active]:text-white">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="data-[state=active]:bg-accent data-[state=active]:text-white">
            <Shield className="w-4 h-4 mr-2" />
            Account
          </TabsTrigger>
          <TabsTrigger value="billing" className="data-[state=active]:bg-accent data-[state=active]:text-white">
            <CreditCard className="w-4 h-4 mr-2" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-accent data-[state=active]:text-white">
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="bg-background-card border border-border rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Profile Information</h2>
              <p className="text-foreground-muted text-sm">Update your display name and avatar.</p>
            </div>

            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={profile?.avatar_url || undefined} />
                <AvatarFallback className="bg-accent text-white text-lg">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleAvatarUpload}
                />
                <Button
                  variant="outline"
                  className="border-border-strong text-sm"
                  disabled={avatarUploading}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {avatarUploading ? 'Uploading...' : 'Upload Photo'}
                </Button>
                <p className="text-foreground-muted text-xs mt-1">PNG, JPEG or WebP. Max 2MB.</p>
              </div>
            </div>

            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input
                  placeholder="Your full name"
                  className="bg-background-secondary border-border focus:border-accent"
                  {...profileForm.register('full_name')}
                />
                {profileForm.formState.errors.full_name && (
                  <p className="text-red-400 text-xs">{profileForm.formState.errors.full_name.message}</p>
                )}
              </div>
              <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent-hover text-white">
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </form>
          </div>
        </TabsContent>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-4">
          <div className="bg-background-card border border-border rounded-xl p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Email Address</h2>
              <p className="text-foreground-muted text-sm">Update your email address.</p>
            </div>
            <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  className="bg-background-secondary border-border focus:border-accent"
                  {...emailForm.register('email')}
                />
              </div>
              <Button type="submit" disabled={emailForm.formState.isSubmitting} className="bg-accent hover:bg-accent-hover text-white">
                {emailForm.formState.isSubmitting ? 'Updating...' : 'Update Email'}
              </Button>
            </form>
          </div>

          <div className="bg-background-card border border-border rounded-xl p-6 space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Change Password</h2>
              <p className="text-foreground-muted text-sm">Update your account password.</p>
            </div>
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-background-secondary border-border focus:border-accent"
                  {...passwordForm.register('current_password')}
                />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-background-secondary border-border focus:border-accent"
                  {...passwordForm.register('new_password')}
                />
                {passwordForm.formState.errors.new_password && (
                  <p className="text-red-400 text-xs">{passwordForm.formState.errors.new_password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="bg-background-secondary border-border focus:border-accent"
                  {...passwordForm.register('confirm_password')}
                />
                {passwordForm.formState.errors.confirm_password && (
                  <p className="text-red-400 text-xs">{passwordForm.formState.errors.confirm_password.message}</p>
                )}
              </div>
              <Button type="submit" disabled={passwordForm.formState.isSubmitting} className="bg-accent hover:bg-accent-hover text-white">
                {passwordForm.formState.isSubmitting ? 'Updating...' : 'Change Password'}
              </Button>
            </form>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="bg-background-card border border-border rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Billing & Subscription</h2>
              <p className="text-foreground-muted text-sm">Manage your subscription and billing details.</p>
            </div>

            <div className="flex items-center justify-between p-4 bg-background-secondary rounded-xl border border-border">
              <div>
                <div className="text-foreground font-medium capitalize">
                  {subscription?.plan || 'Free'} Plan
                </div>
                <div className="text-foreground-muted text-sm capitalize">
                  Status: {subscription?.status || 'inactive'}
                </div>
                {subscription?.current_period_end && (
                  <div className="text-foreground-muted text-sm">
                    Next billing: {formatDate(subscription.current_period_end)}
                  </div>
                )}
              </div>
              <Badge
                className={
                  subscription?.plan === 'pro'
                    ? 'bg-accent text-white border-0'
                    : subscription?.plan === 'enterprise'
                    ? 'bg-purple-600 text-white border-0'
                    : 'bg-background border-border text-foreground-muted'
                }
              >
                {subscription?.plan?.toUpperCase() || 'FREE'}
              </Badge>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleBillingPortal}
                disabled={billingLoading}
                className="bg-accent hover:bg-accent-hover text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                {billingLoading ? 'Opening...' : 'Manage Billing'}
              </Button>
              <Button variant="outline" className="border-border-strong" asChild>
                <a href="/#pricing">Upgrade Plan</a>
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="bg-background-card border border-border rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground mb-1">Notification Preferences</h2>
              <p className="text-foreground-muted text-sm">Choose what emails you&apos;d like to receive.</p>
            </div>

            <div className="space-y-4">
              {[
                {
                  key: 'marketing_emails' as const,
                  title: 'Marketing Emails',
                  description: 'Product updates, special offers, and news about Orbis Solutions.',
                },
                {
                  key: 'product_updates' as const,
                  title: 'Product Updates',
                  description: 'Notifications about new features and improvements.',
                },
                {
                  key: 'security_alerts' as const,
                  title: 'Security Alerts',
                  description: 'Important security notifications about your account.',
                },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-4 border-b border-border last:border-0">
                  <div>
                    <div className="text-foreground font-medium text-sm">{item.title}</div>
                    <div className="text-foreground-muted text-xs mt-0.5">{item.description}</div>
                  </div>
                  <button
                    onClick={() => handleNotifToggle(item.key)}
                    disabled={notifLoading}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      notifications[item.key] ? 'bg-accent' : 'bg-background-secondary'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        notifications[item.key] ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
