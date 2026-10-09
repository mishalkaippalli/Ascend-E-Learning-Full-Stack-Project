
import { BookOpen, Headphones, PlayCircle, Sparkles } from 'lucide-react'

function ExplorePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
          Your next discovery
        </p>

        <h1 className="font-serif text-4xl leading-tight text-primary sm:text-5xl">
          What will you explore today?
        </h1>

        <p className="mt-5 text-base leading-7 text-secondary sm:text-lg">
          Discover books and podcasts, experience ideas in different formats,
          and explore the questions that inspire you.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl text-primary">
          Explore your way
        </h2>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <ExploreCard
            icon={<BookOpen size={24} />}
            title="Read"
            description="Explore books and discover new ideas."
          />
          <ExploreCard
            icon={<Headphones size={24} />}
            title="Listen"
            description="Experience content through audio."
          />
          <ExploreCard
            icon={<PlayCircle size={24} />}
            title="Watch"
            description="Discover ideas through video."
          />
          <ExploreCard
            icon={<Sparkles size={24} />}
            title="Ask"
            description="Explore questions with AI assistance."
          />
        </div>
      </section>
    </div>
  )
}

interface ExploreCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function ExploreCard({ icon, title, description }: ExploreCardProps) {
  return (
    <article className="rounded-2xl border border-border bg-surface p-6 text-primary transition hover:-translate-y-1 hover:border-accent/50">
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
        {icon}
      </div>

      <h3 className="text-lg font-semibold">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-secondary">
        {description}
      </p>
    </article>
  )
}

export default ExplorePage
