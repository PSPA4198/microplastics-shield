import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Assessment from './pages/Assessment.jsx'
import Results from './pages/Results.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background orbs */}
      <div className="orb w-96 h-96 top-20 right-0 opacity-20"
        style={{ background: 'radial-gradient(circle, #1fb6ff, #3a7bd5)' }} />
      <div className="orb w-72 h-72 top-96 left-0 opacity-10"
        style={{ background: 'radial-gradient(circle, #66e0d5, #3a7bd5)', animationDelay: '3s' }} />

      <div className="relative z-10">
        <Navbar />
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/assess"     element={<Assessment />} />
          <Route path="/results"    element={<Results />} />
          <Route path="/login"      element={<Login />} />
          <Route path="/signup"     element={<Signup />} />
        </Routes>
      </div>
    </div>
  )
}
