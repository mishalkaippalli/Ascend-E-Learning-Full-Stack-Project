
import { Link } from 'react-router-dom'
import {
  BookOpen,
  ArrowUpRight,
  Heart,
  Mail,
} from 'lucide-react'

function UserFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-surface text-primary">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand and platform description */}
          <div className="space-y-4">
            <Link
              to="/explore"
              className="inline-flex items-center gap-2"
              aria-label="Ascend home"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-background">
                <BookOpen size={23} />
              </span>
              <span className="font-serif text-2xl">Ascend</span>
            </Link>

            <p className="max-w-xs text-sm leading-6 text-secondary">
              Discover ideas in more ways. Read, listen, watch, ask questions,
              and discuss what inspires you.
            </p>

            <p className="flex items-center gap-2 text-sm text-muted">
              Made for curious minds
              <Heart size={15} className="text-accent" />
            </p>
          </div>

          {/* Explore links */}
          <div>
            <h2 className="mb-4 text-sm font-semibold">Explore</h2>
            <ul className="space-y-3 text-sm text-secondary">
              <li>
                <Link
                  to="/explore"
                  className="transition hover:text-accent"
                >
                  Discover content
                </Link>
              </li>
              <li>
                <Link
                  to="/explore?type=book"
                  className="transition hover:text-accent"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  to="/explore?type=podcast"
                  className="transition hover:text-accent"
                >
                  Podcasts
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="transition hover:text-accent"
                >
                  My wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Community and publishing */}
          <div>
            <h2 className="mb-4 text-sm font-semibold">Community</h2>
            <ul className="space-y-3 text-sm text-secondary">
              <li>
                <Link
                  to="/discussions"
                  className="transition hover:text-accent"
                >
                  Discussions
                </Link>
              </li>
              <li>
                <Link
                  to="/publisher/signup"
                  className="inline-flex items-center gap-1 transition hover:text-accent"
                >
                  Become a publisher
                  <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Help and policies */}
          <div>
            <h2 className="mb-4 text-sm font-semibold">Help & information</h2>
            <ul className="space-y-3 text-sm text-secondary">
              <li>
                <Link
                  to="/help"
                  className="transition hover:text-accent"
                >
                  Help & support
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="transition hover:text-accent"
                >
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="transition hover:text-accent"
                >
                  Terms of service
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@ascend.example"
                  className="inline-flex items-center gap-2 transition hover:text-accent"
                >
                  <Mail size={15} />
                  Contact support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright and bottom navigation */}
        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} Ascend. All rights reserved.</p>

          <Link
            to="/explore"
            className="w-fit transition hover:text-accent"
          >
            Read. Listen. Watch. Ask. Discuss.
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default UserFooter
