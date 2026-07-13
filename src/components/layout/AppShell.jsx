import { Outlet, useLocation, matchPath } from 'react-router-dom'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import MobileTabBar from './MobileTabBar'

const titleRoutes = [
  { path: '/app', title: 'Agent' },
  { path: '/app/jobs', title: 'Jobs' },
  { path: '/app/jobs/:id', title: 'Job detail' },
  { path: '/app/profile', title: 'Profile' },
  { path: '/app/resume', title: 'Resume' },
]

function getTitle(pathname) {
  const match = titleRoutes.find((r) => matchPath({ path: r.path, end: true }, pathname))
  return match?.title || 'Job Search Agent'
}

export default function AppShell() {
  const location = useLocation()
  const title = getTitle(location.pathname)

  return (
    <div className="flex h-screen overflow-hidden bg-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title={title} />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
          <Outlet />
        </main>
      </div>
      <MobileTabBar />
    </div>
  )
}