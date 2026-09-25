function HomePage() {
  return (
    <main className="min-h-screen bg-background px-8 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-medium uppercase tracking-wider text-accent">
          Ascend
        </p>

        <h1 className="font-serif text-5xl text-primary">
          Learn something that changes your future.
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-secondary">
          Build skills, explore ideas, and keep moving forward.
        </p>

        <button className="mt-8 rounded-lg bg-accent px-6 py-3 font-medium text-white">
          Start learning
        </button>
      </div>
    </main>
  )
}

export default HomePage