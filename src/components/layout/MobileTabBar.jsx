import { NavLink } from 'react-router-dom'
import { MessageSquare, Briefcase, User, FileText } from 'lucide-react'

const navItems = [
  { to: '/app', label: 'Agent', icon: MessageSquare, end: true },
  { to: '/app/jobs', label: 'Jobs', icon: Briefcase },
  { to: '/app/profile', label: 'Profile', icon: User },
  { to: '/app/resume', label: 'Resume', icon: FileText },
]

export default function MobileTabBar() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface border-t border-border flex">
      {navItems.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-1 font-body text-caption
             ${isActive ? 'text-accent' : 'text-ink-muted'}`
          }
        >
          <Icon size={20} strokeWidth={2} />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}