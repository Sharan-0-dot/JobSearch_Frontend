import { NavLink } from 'react-router-dom'
import { MessageSquare, Briefcase, User, FileText } from 'lucide-react'

const navItems = [
  { to: '/app', label: 'Agent', icon: MessageSquare, end: true },
  { to: '/app/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/app/profile', label: 'Profile', icon: User },
  { to: '/app/resume', label: 'Resume', icon: FileText },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 h-screen bg-surface border-r border-border">
      <div className="px-5 py-5">
        <h2 className="font-display text-lg text-ink">Job Search Agent</h2>
      </div>
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md font-body text-body transition-colors
               ${isActive
                 ? 'bg-accent-soft text-accent font-medium'
                 : 'text-ink-muted hover:bg-bg hover:text-ink'}`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}