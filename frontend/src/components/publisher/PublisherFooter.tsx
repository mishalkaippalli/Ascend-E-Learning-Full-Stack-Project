
import { Link } from 'react-router-dom'
import { BookOpen, BookMarked, Wallet, CircleHelp } from 'lucide-react'

function PublisherFooter() {
  return (
    <footer className="border-t border-border bg-surface text-primary">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand and purpose */}
          <div>
            <Link
              to="/publisher/dashboard"
              className="inline-flex items-center gap-2"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-background">
                <BookOpen size={20} />
              </span>

              <span className="font-serif text-xl">Ascend</span>
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-6 text-secondary">
              Share knowledge, publish meaningful content, and help people
              keep learning through reading, listening, watching, and discussion.
            </p>
          </div>

          {/* Content management */}
          <div>
            <h2 className="text-sm font-semibold">Content management</h2>

            <ul className="mt-4 space-y-3 text-sm text-secondary">
              <li>
                <Link
                  to="/publisher/books"
                  className="transition hover:text-primary"
                >
                  My Books
                </Link>
              </li>
              <li>
                <Link
                  to="/publisher/books/new"
                  className="transition hover:text-primary"
                >
                  Publish a Book
                </Link>
              </li>
              <li>
                <Link
                  to="/publisher/users"
                  className="transition hover:text-primary"
                >
                  Readers
                </Link>
              </li>
            </ul>
          </div>

          {/* Earnings and account */}
          <div>
            <h2 className="text-sm font-semibold">Publisher account</h2>

            <ul className="mt-4 space-y-3 text-sm text-secondary">
              <li>
                <Link
                  to="/publisher/payouts"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <Wallet size={16} />
                  Payouts
                </Link>
              </li>
              <li>
                <Link
                  to="/publisher/profile"
                  className="transition hover:text-primary"
                >
                  Publisher Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/publisher/settings"
                  className="transition hover:text-primary"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Help and resources */}
          <div>
            <h2 className="text-sm font-semibold">Help & resources</h2>

            <ul className="mt-4 space-y-3 text-sm text-secondary">
              <li>
                <Link
                  to="/publisher/help"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <CircleHelp size={16} />
                  Publisher Help
                </Link>
              </li>
              <li>
                <Link
                  to="/publisher/guidelines"
                  className="inline-flex items-center gap-2 transition hover:text-primary"
                >
                  <BookMarked size={16} />
                  Publishing Guidelines
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and legal links */}
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Ascend. All rights reserved.
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              to="/privacy"
              className="transition hover:text-primary"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="transition hover:text-primary"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default PublisherFooter
