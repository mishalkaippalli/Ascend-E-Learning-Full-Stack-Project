
import { Link } from 'react-router-dom'
import {
  BookOpen,
  BookMarked,
  Users,
  Building2,
  ShieldCheck,
  CircleHelp,
} from 'lucide-react'

function AdminFooter() {
  return (
    <footer className="border-t border-border bg-surface text-primary">
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Ascend brand */}
          <div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center gap-2"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-background">
                <BookOpen size={20} />
              </span>

              <span className="font-serif text-xl">Ascend</span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">
              The administration workspace for managing Ascend's content,
              community, publishers, and platform operations.
            </p>
          </div>

          {/* Content management */}
          <div>
            <h2 className="text-sm font-semibold">Content management</h2>

            <ul className="mt-4 space-y-3 text-sm text-secondary">
              <li>
                <Link
                  to="/admin/books"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <BookMarked size={16} />
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/categories"
                  className="transition hover:text-primary"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/coupons"
                  className="transition hover:text-primary"
                >
                  Coupons
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform management */}
          <div>
            <h2 className="text-sm font-semibold">Platform management</h2>

            <ul className="mt-4 space-y-3 text-sm text-secondary">
              <li>
                <Link
                  to="/admin/users"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <Users size={16} />
                  Users
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/publishers"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <Building2 size={16} />
                  Publishers
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/reports"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <ShieldCheck size={16} />
                  Reports & moderation
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h2 className="text-sm font-semibold">Help & support</h2>

            <ul className="mt-4 space-y-3 text-sm text-secondary">
              <li>
                <Link
                  to="/admin/settings"
                  className="transition hover:text-primary"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/help"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <CircleHelp size={16} />
                  Admin Help
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="transition hover:text-primary"
                >
                  Privacy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Ascend. All rights reserved.
          </p>

          <p>Platform administration workspace</p>
        </div>
      </div>
    </footer>
  )
}

export default AdminFooter
