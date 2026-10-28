import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Shield } from 'lucide-react'

const links = [
  { to: '/#impact',    label: 'Impact' },
  { to: '/#solutions', label: 'Solutions' },
  { to: '/assess',     label: 'Risk Test' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const { pathname }              = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(5, 16, 37, 0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 24px rgba(2,8,20,0.5)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #66e0d5, #3a7bd5)' }}>
            <Shield size={18} color="#012" strokeWidth={2.5} />
          </div>
          <div>
            <div className="font-bold text-base leading-tight">MicroShield</div>
            <div className="text-xs text-white/50 leading-tight">Know Your Risk</div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className="px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200">
              {l.label}
            </Link>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <Link to="/login"
              className="px-4 py-2 rounded-full text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
              Login
            </Link>
            <Link to="/signup" className="btn-primary text-sm px-5 py-2">
              Get Started
            </Link>
          </div>
        </nav>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 space-y-1"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(5,16,37,0.95)' }}>
          {links.map(l => (
            <Link key={l.to} to={l.to}
              className="block px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
              {l.label}
            </Link>
          ))}
          <hr className="border-white/5 my-2" />
          <Link to="/login"
            className="block px-4 py-3 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all">
            Login
          </Link>
          <Link to="/signup" className="btn-primary w-full justify-center mt-2">
            Get Started
          </Link>
        </div>
      )}
    </header>
  )
}
