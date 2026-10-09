
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Users,
  Wallet,
  Plus,
  ArrowUpRight,
  BookMarked,
  Bell,
} from 'lucide-react'

function PublisherDashboardPage() {
  const stats = [
    {
      label: 'Published Books',
      value: '—',
      description: 'Your published content',
      icon: BookOpen,
    },
    {
      label: 'Readers',
      value: '—',
      description: 'People accessing your books',
      icon: Users,
    },
    {
      label: 'Available Balance',
      value: '—',
      description: 'Your current payout balance',
      icon: Wallet,
    },
  ]

  const quickActions = [
    {
      title: 'Manage My Books',
      description: 'View and manage your published books.',
      path: '/publisher/books',
      icon: BookMarked,
    },
    {
      title: 'View Payouts',
      description: 'Review your payout information.',
      path: '/publisher/payouts',
      icon: Wallet,
    },
    {
      title: 'Notifications',
      description: 'Check your latest account updates.',
      path: '/publisher/notifications',
      icon: Bell,
    },
  ]

  return (
    <div className="bg-background text-primary">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Dashboard introduction */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-accent">
              Publisher Workspace
            </p>
            <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
              Dashboard
            </h1>
            <p className="mt-2 max-w-2xl text-secondary">
              Manage your books, understand your readership, and keep track
              of your publishing activity.
            </p>
          </div>

          <Link
            to="/publisher/books/new"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-background transition hover:opacity-90"
          >
            <Plus size={18} />
            Publish a Book
          </Link>
        </div>

        {/* Summary cards: values will come from the backend later. */}
        <section
          aria-label="Publisher statistics"
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {stats.map(({ label, value, description, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm text-secondary">{label}</p>
                  <p className="mt-3 text-3xl font-semibold">{value}</p>
                </div>

                <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon size={22} />
                </span>
              </div>

              <p className="mt-3 text-sm text-muted">{description}</p>
            </div>
          ))}
        </section>

        {/* Publisher shortcuts */}
        <section className="mt-12">
          <div>
            <h2 className="text-xl font-semibold">Quick actions</h2>
            <p className="mt-1 text-sm text-secondary">
              Shortcuts to your main publishing tasks.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            {quickActions.map(
              ({ title, description, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="group rounded-2xl border border-border bg-surface p-5 transition hover:border-accent"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-background text-primary">
                      <Icon size={22} />
                    </span>

                    <ArrowUpRight
                      size={19}
                      className="text-muted transition group-hover:text-accent"
                    />
                  </div>

                  <h3 className="mt-4 font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-secondary">
                    {description}
                  </p>
                </Link>
              ),
            )}
          </div>
        </section>

        {/* Empty state until real dashboard data is connected. */}
        <section className="mt-12 rounded-2xl border border-dashed border-border bg-surface p-8 text-center sm:p-12">
          <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent-soft text-accent">
            <BookOpen size={27} />
          </span>

          <h2 className="mt-4 text-lg font-semibold">
            Your publishing journey starts here
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-secondary">
            Once you publish books, your content and readership information
            will appear in your workspace.
          </p>

          <Link
            to="/publisher/books/new"
            className="mt-5 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-accent transition hover:bg-accent-soft"
          >
            Get started
            <ArrowUpRight size={17} />
          </Link>
        </section>
      </div>
    </div>
  )
}

export default PublisherDashboardPage
