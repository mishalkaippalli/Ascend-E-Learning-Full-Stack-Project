
import { Outlet } from 'react-router-dom'
import AdminHeader from '../components/admin/AdminHeader'
import AdminFooter from '../components/admin/AdminFooter'

function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-primary">
      <AdminHeader />

      {/* Outlet renders the active admin page inside this layout. */}
      <main className="flex-1">
        <Outlet />
      </main>

      <AdminFooter />
    </div>
  )
}

export default AdminLayout
