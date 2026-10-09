
import { Outlet } from 'react-router-dom'
import UserHeader from '../components/user/UserHeader'
import UserFooter from '../components/user/UserFooter'

function UserLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-primary">
      <UserHeader />

      {/* Outlet renders the active child route inside the shared layout. */}
      <main className="flex-1">
        <Outlet />
      </main>

      <UserFooter />
    </div>
  )
}

export default UserLayout
