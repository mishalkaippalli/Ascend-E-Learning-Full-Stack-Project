
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BookOpen,
  ChevronDown,
  Heart,
  Search,
  ShoppingCart,
  Bell,
  UserRound,
  Settings,
  BookMarked,
  LogOut,
  Sun,
  Moon,
  Monitor,
  Menu,
  X,
} from 'lucide-react'

import useAuth from '../../hooks/useAuth'
import { useTheme } from '../../hooks/useTheme'
import type { ThemePreference } from '../../context/theme-context'

function UserHeader() {
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [logoutError, setLogoutError] = useState('')

  const categories = [
    'Personal Development',
    'Business',
    'Technology',
    'Psychology',
    'Health & Wellness',
    'Fiction',
  ]

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const query = searchQuery.trim()

    if (query) {
      navigate(`/explore?search=${encodeURIComponent(query)}`)
    }
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

  const themeOptions: {
    value: ThemePreference
    label: string
    icon: typeof Sun
  }[] = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
    { value: 'system', label: 'System', icon: Monitor },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface text-primary shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-18 items-center justify-between gap-4">
          {/* Brand */}
          <Link
            to="/explore"
            className="flex shrink-0 items-center gap-2"
            aria-label="Ascend home"
          >
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-background">
              <BookOpen size={23} />
            </span>
            <span className="font-serif text-2xl">Ascend</span>
          </Link>

          {/* Desktop categories */}
          <div className="relative hidden lg:block">
            <button
              type="button"
              onClick={() => {
                setIsCategoryOpen((open) => !open)
                setIsProfileOpen(false)
              }}
              aria-expanded={isCategoryOpen}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-secondary transition hover:bg-background hover:text-primary"
            >
              Categories
              <ChevronDown size={16} />
            </button>

            {isCategoryOpen && (
              <div className="absolute left-0 top-full mt-2 w-60 rounded-xl border border-border bg-surface p-2 text-primary shadow-lg">
                {categories.map((category) => (
                  <Link
                    key={category}
                    to={`/explore?category=${encodeURIComponent(category)}`}
                    onClick={() => setIsCategoryOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm text-secondary transition hover:bg-background hover:text-primary"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="hidden min-w-40 max-w-xl flex-1 md:flex"
            role="search"
          >
            <label htmlFor="content-search" className="sr-only">
              Search books, podcasts, and authors
            </label>
            <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 transition focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
              <Search size={19} className="shrink-0 text-muted" />
              <input
                id="content-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search books, podcasts, authors..."
                className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-primary outline-none placeholder:text-muted"
              />
            </div>
          </form>

          {/* Quick actions */}
          <nav
            aria-label="User navigation"
            className="hidden items-center gap-1 md:flex"
          >
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              title="Wishlist"
              className="rounded-lg p-2.5 text-secondary transition hover:bg-background hover:text-primary"
            >
              <Heart size={21} />
            </Link>

            <Link
              to="/cart"
              aria-label="Cart"
              title="Cart"
              className="rounded-lg p-2.5 text-secondary transition hover:bg-background hover:text-primary"
            >
              <ShoppingCart size={21} />
            </Link>

            <Link
              to="/notifications"
              aria-label="Notifications"
              title="Notifications"
              className="rounded-lg p-2.5 text-secondary transition hover:bg-background hover:text-primary"
            >
              <Bell size={21} />
            </Link>

            {/* Profile dropdown */}
            <div className="relative ml-1">
              <button
                type="button"
                onClick={() => {
                  setIsProfileOpen((open) => !open)
                  setIsCategoryOpen(false)
                }}
                aria-expanded={isProfileOpen}
                aria-label="Open profile menu"
                className="flex items-center gap-2 rounded-xl border border-border p-1.5 pr-2.5 transition hover:bg-background"
              >
                <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <UserRound size={19} />
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
                  </div>

                  <div className="py-2">
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary transition hover:bg-background hover:text-primary"
                    >
                      <UserRound size={18} />
                      My Profile
                    </Link>

                    <Link
                      to="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary transition hover:bg-background hover:text-primary"
                    >
                      <Settings size={18} />
                      Settings
                    </Link>

                    <Link
                      to="/purchases"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-secondary transition hover:bg-background hover:text-primary"
                    >
                      <BookMarked size={18} />
                      My Purchases
                    </Link>
                  </div>

                  {/* Theme selection */}
                  <div className="border-t border-border py-3">
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

                  <div className="border-t border-border pt-2">
                    {logoutError && (
                      <p role="alert" className="px-3 py-2 text-sm text-error">
                        {logoutError}
                      </p>
                    )}
                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-error transition hover:bg-error/10 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <LogOut size={18} />
                      {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            className="rounded-lg p-2 text-secondary transition hover:bg-background hover:text-primary md:hidden"
          >
            {isMobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <div className="space-y-3 border-t border-border py-4 md:hidden">
            <form onSubmit={handleSearch} role="search">
              <label htmlFor="mobile-content-search" className="sr-only">
                Search content
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
                <Search size={18} className="text-muted" />
                <input
                  id="mobile-content-search"
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search content..."
                  className="min-w-0 flex-1 bg-transparent py-3 text-sm text-primary outline-none placeholder:text-muted"
                />
              </div>
            </form>

            <p className="px-2 text-xs font-semibold uppercase tracking-wide text-muted">
              Categories
            </p>
            <div className="grid grid-cols-2 gap-1">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/explore?category=${encodeURIComponent(category)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm text-secondary transition hover:bg-background hover:text-primary"
                >
                  {category}
                </Link>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 border-t border-border pt-3">
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex flex-col items-center gap-1 rounded-lg p-2 text-xs text-secondary hover:bg-background hover:text-primary"
              >
                <Heart size={20} />
                Wishlist
              </Link>
              <Link
                to="/cart"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex flex-col items-center gap-1 rounded-lg p-2 text-xs text-secondary hover:bg-background hover:text-primary"
              >
                <ShoppingCart size={20} />
                Cart
              </Link>
              <Link
                to="/notifications"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex flex-col items-center gap-1 rounded-lg p-2 text-xs text-secondary hover:bg-background hover:text-primary"
              >
                <Bell size={20} />
                Notifications
              </Link>
            </div>

            <div className="border-t border-border pt-3">
              <p className="px-2 text-sm font-semibold">
                {user?.name ?? 'Your account'}
              </p>
              <p className="truncate px-2 text-xs text-muted">{user?.email}</p>

              <div className="mt-2 grid grid-cols-2 gap-1">
                <Link
                  to="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm text-secondary hover:bg-background hover:text-primary"
                >
                  My Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm text-secondary hover:bg-background hover:text-primary"
                >
                  Settings
                </Link>
                <Link
                  to="/purchases"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-2 py-2 text-sm text-secondary hover:bg-background hover:text-primary"
                >
                  My Purchases
                </Link>
              </div>

              <p className="px-2 pb-2 pt-4 text-xs font-semibold uppercase tracking-wide text-muted">
                Appearance
              </p>
              <div className="grid grid-cols-3 gap-1">
                {themeOptions.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setTheme(value)}
                    aria-pressed={theme === value}
                    className={`flex items-center justify-center gap-1 rounded-lg border px-2 py-2 text-xs ${
                      theme === value
                        ? 'border-accent bg-accent-soft text-primary'
                        : 'border-transparent text-secondary hover:bg-background'
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </button>
                ))}
              </div>

              {logoutError && (
                <p role="alert" className="px-2 py-2 text-sm text-error">
                  {logoutError}
                </p>
              )}
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="mt-3 flex w-full items-center gap-3 rounded-lg px-2 py-3 text-sm text-error transition hover:bg-error/10 disabled:opacity-60"
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

export default UserHeader
