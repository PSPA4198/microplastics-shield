import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, User, Shield } from 'lucide-react'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    // NOTE: Backend wiring happens on Day 4 (auth endpoints).
    console.log('Signup submitted (placeholder):', form)
    alert('Signup backend will be connected on Day 4. UI is working correctly!')
  }

  return (
    <main className="max-w-md mx-auto px-6 py-16">
      <div className="text-center mb-8">
        <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #66e0d5, #3a7bd5)' }}>
          <Shield size={24} color="#012" />
        </div>
        <h1 className="font-display text-2xl font-bold">Create your account</h1>
        <p className="text-white/60 text-sm mt-1">Track your exposure score over time</p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-7 space-y-4">
        <Field label="Name" icon={<User size={16} />}>
          <input required className="form-input" placeholder="Your name"
            value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        </Field>
        <Field label="Email" icon={<Mail size={16} />}>
          <input type="email" required className="form-input" placeholder="you@example.com"
            value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        </Field>
        <Field label="Password" icon={<Lock size={16} />}>
          <input type="password" required minLength={8} className="form-input" placeholder="At least 8 characters"
            value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        </Field>
        <button type="submit" className="btn-primary w-full justify-center mt-2">Create Account</button>
      </form>

      <p className="text-center text-sm text-white/50 mt-6">
        Already have an account? <Link to="/login" className="text-accent-blue hover:underline">Log in</Link>
      </p>
    </main>
  )
}

function Field({ label, icon, children }) {
  return (
    <label className="block">
      <span className="flex items-center gap-1.5 text-sm font-medium text-white/80 mb-2">{icon}{label}</span>
      {children}
    </label>
  )
}
