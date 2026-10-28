import { Link } from 'react-router-dom'
import { Fish, HeartPulse, Globe2, ShieldCheck, Droplets, Shirt } from 'lucide-react'

export default function Home() {
  return (
    <main>
      {/* ===== HERO ===== */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 grid md:grid-cols-[1fr_380px] gap-10 items-center">
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-5">
            Know your <span className="gradient-text">microplastic risk</span> in 5 minutes
          </h1>
          <p className="text-white/70 text-lg mb-8 max-w-lg">
            A personalized exposure assessment based on your diet, water source, clothing, and
            location — with an AI-generated plan to reduce it.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/assess" className="btn-primary">Start Free Assessment</Link>
            <a href="#impact" className="btn-outline">Why It Matters</a>
          </div>

          <div className="flex gap-8 mt-10">
            <div>
              <div className="text-2xl font-bold text-accent-blue">8M+</div>
              <div className="text-xs text-white/50 mt-1">tons enter oceans yearly</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-teal">5 min</div>
              <div className="text-xs text-white/50 mt-1">to get your risk score</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-accent-green">100%</div>
              <div className="text-xs text-white/50 mt-1">free & private</div>
            </div>
          </div>
        </div>

        {/* Quick preview card */}
        <div className="glass-card p-6">
          <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
            style={{ background: 'linear-gradient(135deg, #66e0d5, #3a7bd5)' }}>
            <ShieldCheck size={20} color="#012" />
          </div>
          <h3 className="font-semibold text-lg mb-2">Quick Risk Check</h3>
          <p className="text-white/60 text-sm mb-5">
            A short quiz estimates your exposure across diet, water, air, and lifestyle —
            then gives you a tailored 7-day reduction plan.
          </p>
          <Link to="/assess" className="btn-primary w-full justify-center text-sm">
            Start Test
          </Link>
        </div>
      </section>

      {/* ===== IMPACT ===== */}
      <section id="impact" className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-3xl font-bold mb-3">Impact on environment &amp; health</h2>
          <p className="text-white/60">
            Microplastics break down from larger plastics and are now found in ecosystems,
            food, water, and air — including inside the human body.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <ImpactCard icon={<Fish size={20} />} title="Marine life"
            text="Ingestion causes reduced feeding, impaired reproduction, and transport of toxins across the food chain." />
          <ImpactCard icon={<HeartPulse size={20} />} title="Human exposure"
            text="Detected in seafood, table salt, drinking water, and indoor dust — long-term health risks are under active study." />
          <ImpactCard icon={<Globe2 size={20} />} title="Global distribution"
            text="Microplastics travel via ocean currents and wind, reaching even the most remote regions on Earth." />
        </div>
      </section>

      {/* ===== SOLUTIONS ===== */}
      <section id="solutions" className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-10">
          <h2 className="font-display text-3xl font-bold mb-3">Solutions &amp; practical steps</h2>
          <p className="text-white/60">
            Small changes scale. Personal choices, community action, and policy together
            create real impact.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          <SolutionCard icon={<Droplets size={20} />} title="Reduce"
            items={['Choose reusable bottles & bags', 'Prefer natural fibers and durable goods', 'Avoid unnecessary single-use plastic']} />
          <SolutionCard icon={<Shirt size={20} />} title="Rethink laundry"
            items={['Use a microfiber-catching laundry bag', 'Wash less often, at lower temperatures', 'Choose natural textiles where possible']} />
          <SolutionCard icon={<Globe2 size={20} />} title="Community & policy"
            items={['Organize clean-ups and awareness drives', 'Support better packaging & waste systems', 'Advocate for microplastic-reduction policy']} />
        </div>

        <div className="text-center mt-12">
          <Link to="/assess" className="btn-primary">Get Your Personalized Plan</Link>
        </div>
      </section>
    </main>
  )
}

function ImpactCard({ icon, title, text }) {
  return (
    <article className="glass-card p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl">
      <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4 bg-white/5 text-accent-teal">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-white/60 text-sm leading-relaxed">{text}</p>
    </article>
  )
}

function SolutionCard({ icon, title, items }) {
  return (
    <div className="glass-card p-6">
      <div className="w-11 h-11 rounded-full flex items-center justify-center mb-4 bg-white/5 text-accent-blue">
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((it, i) => (
          <li key={i} className="text-white/60 text-sm flex gap-2">
            <span className="text-accent-teal mt-0.5">•</span>{it}
          </li>
        ))}
      </ul>
    </div>
  )
}
