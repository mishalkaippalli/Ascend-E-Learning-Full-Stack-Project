
import { Outlet } from 'react-router-dom'
import PublisherHeader from '../components/publisher/PublisherHeader'
import PublisherFooter from '../components/publisher/PublisherFooter'

function PublisherLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-primary">
      <PublisherHeader />

      {/* Outlet renders the active publisher page inside this layout. */}
      <main className="flex-1">
        <Outlet />
      </main>

      <PublisherFooter />
    </div>
  )
}

export default PublisherLayout
