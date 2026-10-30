import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { siteConfig } from '../config/siteConfig'
import ThemeToggle from './ThemeToggle'
import Button from './Button'
import '../styles/Header.css'

export default function Header() {
  const [open, setOpen] = useState(false)

  // Close the mobile menu whenever the route changes or user resizes past mobile.
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const linkClass = ({ isActive }) =>
    `nav-link ${isActive ? 'nav-link--active' : ''}`

  return (
    <header className="site-header">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img
            src={siteConfig.logo}
            alt={siteConfig.logoAlt}
            className="h-9 w-9 rounded-lg object-cover sm:h-10 sm:w-10"
            onError={(e) => {
              // Fallback: hide broken image, show a colored badge instead.
              e.currentTarget.style.display = 'none'
            }}
          />
          <span className="font-display text-xl font-extrabold uppercase tracking-tight text-slate-900 sm:text-2xl dark:text-white">
            {siteConfig.companyName}
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {siteConfig.navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden lg:block">
            <Button to="/apply-now" className="!px-5 !py-2.5 text-sm">
              Apply Now
            </Button>
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700 lg:hidden dark:border-slate-600 dark:text-slate-200"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div className={`mobile-nav lg:hidden ${open ? 'mobile-nav--open' : ''}`}>
        <nav className="container-page flex flex-col gap-1 py-4" aria-label="Mobile navigation">
          {siteConfig.navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-3">
            <Button to="/apply-now" onClick={() => setOpen(false)} className="w-full">
              Apply Now
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}