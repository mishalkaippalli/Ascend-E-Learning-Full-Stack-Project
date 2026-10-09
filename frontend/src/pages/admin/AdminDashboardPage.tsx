
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Users,
  Building2,
  CreditCard,
  Wallet,
  BarChart3,
  ArrowUpRight,
  Bell,
  Tags,
  ShieldCheck,
} from 'lucide-react'

function AdminDashboardPage() {
  const stats = [
    {
      label: 'Total Books',
      value: '—',
      description: 'Books on the platform',
      icon: BookOpen,
    },
    {
      label: 'Registered Users',
      value: '—',
      description: 'Total user accounts',
      icon: Users,
    },
    {
      label: 'Publishers',
      value: '—',
      description: 'Registered publisher accounts',
      icon: Building2,
    },
    {
      label: 'Payment Volume',
      value: '—',
      description: 'Total processed payments',
      icon: CreditCard,
    },
  ]

  const quickActions = [
    {
      title: 'Review Publishers',
      description: 'Review publisher applications and account status.',
      path: '/admin/publishers',
      icon: Building2,
    },
    {
      title: 'Manage Books',
      description: 'Review and manage platform book listings.',
      path: '/admin/books',
      icon: BookOpen,
    },
    {
      title: 'Manage Categories',
      description: 'Organize content into relevant categories.',
      path: '/admin/categories',
      icon: Tags,
    },
    {
      title: 'Review Reports',
      description: 'Review submitted reports and moderation items.',
      path: '/admin/reports',
      icon: ShieldCheck,
    },
    {
      title: 'Payments & Payouts',
      description: 'Review payment and payout records.',
      path: '/admin/payments',
      icon: Wallet,
    },
    {
      title: 'View Notifications',
      description: 'Check platform administration updates.',
      path: '/admin/notifications',
      icon: Bell,
    },
  ]

  return (
    <div className="bg-background text-primary">
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
        {/* Dashboard introduction */}
        <div>
          <p className="text-sm font-medium text-accent">
            Platform overview
          </p>

          <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-secondary">
            Manage Ascend's content, users, publishers, and platform operations
            from one place.
          </p>
        </div>

        {/* Platform summary cards */}
        <section
          aria-label="Platform statistics"
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
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

        {/* Administrative shortcuts */}
        <section className="mt-12">
          <div>
            <h2 className="text-xl font-semibold">Quick actions</h2>
            <p className="mt-1 text-sm text-secondary">
              Access common administration tasks.
            </p>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {quickActions.map(
              ({ title, description, path, icon: Icon }) => (
                <Link
                  key={title}
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

        {/* Placeholder for future backend-powered activity data */}
        <section className="mt-12 rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <BarChart3 size={22} />
            </span>

            <div>
              <h2 className="text-lg font-semibold">Platform activity</h2>
              <p className="mt-1 text-sm text-secondary">
                A summary of recent platform events will appear here.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-dashed border-border px-4 py-10 text-center">
            <p className="font-medium">No activity data available yet</p>
            <p className="mt-2 text-sm text-muted">
              This section will display real activity after we connect the
              relevant backend APIs.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboardPage
