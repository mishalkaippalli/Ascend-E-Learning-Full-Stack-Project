
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  LayoutDashboard,
  BookMarked,
  Users,
  Building2,
  CreditCard,
  Wallet,
  BarChart3,
  Tags,
  TicketPercent,
  Bell,
  UserRound,
  Settings,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  LogOut,
  Menu,
  X,
} from 'lucide-react'

import useAuth from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import type { ThemePreference } from '../../context/theme-context'

function AdminHeader() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')

  // Keep all admin navigation links together for desktop and mobile.
  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      label: 'Books',
      path: '/admin/books',
      icon: BookMarked,
    },
    {
      label: 'Users',
      path: '/admin/users',
      icon: Users,
    },
    {
      label: 'Publishers',
      path: '/admin/publishers',
      icon: Building2,
    },
    {
      label: 'Payments',
      path: '/admin/payments',
      icon: CreditCard,
    },
    {
      label: 'Payouts',
      path: '/admin/payouts',
      icon: Wallet,
    },
    {
      label: 'Reports',
      path: '/admin/reports',
      icon: BarChart3,
    },
    {
      label: 'Categories',
      path: '/admin/categories',
      icon: Tags,
    },
    {
      label: 'Coupons',
      path: '/admin/coupons',
      icon: TicketPercent,
    },
    {
      label: 'Notifications',
      path: '/admin/notifications',
      icon: Bell,
    },
  ]

  const themeOptions: {
    value: ThemePreference
    label: string
    icon: typeof Sun
  }[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ]

  const closeMenus = () => {
    setIsProfileOpen(false)
    setIsMobileMenuOpen(false)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setLogoutError('')

    try {
      await logout()
      navigate('/login', { replace: true })
    } catch {
      setLogoutError('Unable to contact the server. Please try again.')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface text-primary shadow-sm">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-18 items-center justify-between gap-4">
          {/* Ascend admin branding */}
          <Link
            to="/admin/dashboard"
            onClick={closeMenus}
            aria-label="Ascend admin dashboard"
            className="flex shrink-0 items-center gap-2"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-background">
              <BookOpen size={23} />
            </span>

            <span className="font-serif text-2xl">Ascend</span>

            <span className="hidden rounded-md bg-accent-soft px-2 py-1 text-xs font-medium text-primary sm:inline">
              Admin
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Admin navigation"
            className="hidden items-center gap-0.5 2xl:flex"
          >
            {navigationItems.map(({ label, path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                title={label}
                className="flex items-center gap-1.5 rounded-lg px-2 py-2.5 text-xs font-medium text-secondary transition hover:bg-background hover:text-primary"
              >
                <Icon size={16} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Profile dropdown */}
          <div className="relative hidden shrink-0 2xl:block">
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              aria-expanded={isProfileOpen}
              aria-label="Open admin profile menu"
              className="flex items-center gap-2 rounded-xl border border-border p-1.5 pr-2.5 transition hover:bg-background"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                <UserRound size={19} />
              </span>

              <span className="max-w-24 truncate text-sm font-medium">
                {user?.name ?? 'Admin'}
              </span>

              <ChevronDown size={15} className="text-secondary" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-border bg-surface p-2 text-primary shadow-xl">
                <div className="border-b border-border px-3 py-3">
                  <p className="truncate text-sm font-semibold">
                    {user?.name ?? 'Your account'}
                  </p>
                  <p className="truncate text-xs text-muted">
                    {user?.email}
                  </p>
                  <p className="mt-1 text-xs text-muted">Administrator</p>
                </div>

                <div className="py-2">
                  <Link
                    to="/admin/profile"
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary transition hover:bg-background hover:text-primary"
                  >
                    <UserRound size={18} />
                    Profile
                  </Link>

                  <Link
                    to="/admin/settings"
                    onClick={closeMenus}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary transition hover:bg-background hover:text-primary"
                  >
                    <Settings size={18} />
                    Settings
                  </Link>
                </div>

                {/* Reuse Ascend's shared appearance preferences. */}
                <div className="border-y border-border py-3">
                  <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted">
                    Appearance
                  </p>

                  <div className="grid grid-cols-3 gap-1">
                    {themeOptions.map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setTheme(value)}
                        aria-pressed={theme === value}
                        className={`flex flex-col items-center gap-1 rounded-lg border px-2 py-2 text-xs transition ${
                          theme === value
                            ? 'border-accent bg-accent-soft text-primary'
                            : 'border-transparent text-secondary hover:bg-background hover:text-primary'
                        }`}
                      >
                        <Icon size={18} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {logoutError && (
                  <p role="alert" className="px-3 py-2 text-sm text-error">
                    {logoutError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="mt-2 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-error transition hover:bg-error/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <LogOut size={18} />
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </div>
            )}
          </div>

          {/* Mobile and tablet menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="rounded-lg p-2 text-secondary transition hover:bg-background hover:text-primary 2xl:hidden"
          >
            {isMobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* Mobile and tablet navigation */}
        {isMobileMenuOpen && (
          <div className="space-y-3 border-t border-border py-4 2xl:hidden">
            <nav
              aria-label="Mobile admin navigation"
              className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {navigationItems.map(({ label, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={closeMenus}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-secondary transition hover:bg-background hover:text-primary"
                >
                  <Icon size={19} />
                  {label}
                </Link>
              ))}
            </nav>

            <div className="border-t border-border pt-3">
              <p className="px-3 text-sm font-semibold">
                {user?.name ?? 'Admin'}
              </p>
              <p className="truncate px-3 text-xs text-muted">
                {user?.email}
              </p>

              <div className="mt-2 grid grid-cols-2 gap-1">
                <Link
                  to="/admin/profile"
                  onClick={closeMenus}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-secondary hover:bg-background hover:text-primary"
                >
                  <UserRound size={17} />
                  Profile
                </Link>

                <Link
                  to="/admin/settings"
                  onClick={closeMenus}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-secondary hover:bg-background hover:text-primary"
                >
                  <Settings size={17} />
                  Settings
                </Link>
              </div>

              <p className="px-3 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-muted">
                Appearance
              </p>

              <div className="grid grid-cols-3 gap-1">
                {themeOptions.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTheme(value)}
                    aria-pressed={theme === value}
                    className={`flex items-center justify-center gap-1 rounded-lg border px-2 py-2 text-xs transition ${
                      theme === value
                        ? 'border-accent bg-accent-soft text-primary'
                        : 'border-transparent text-secondary hover:bg-background hover:text-primary'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>

              {logoutError && (
                <p role="alert" className="px-3 py-2 text-sm text-error">
                  {logoutError}
                </p>
              )}

              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-error transition hover:bg-error/10 disabled:opacity-60"
              >
                <LogOut size={18} />
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default AdminHeader
