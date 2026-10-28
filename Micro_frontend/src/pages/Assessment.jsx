import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import api from '../utils/api'

const STEPS = ['Location', 'Diet & Water', 'Air & Home', 'Clothing & Care']

const initialAnswers = {
  city: '', state: '', country: '',
  bottledWater: 0, seafood: 0, packagedFood: 0,
  waterSource: 0,
  airQuality: 0, indoorDust: 0,
  syntheticClothing: 0,
  cosmetics: 0,
}

export default function Assessment() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(initialAnswers)
  const navigate = useNavigate()

  const update = (key, value) => setAnswers(a => ({ ...a, [key]: value }))

  const next = async () => {

  if(step < STEPS.length - 1){

    setStep(s => s + 1)

  }

  else{

    const payload = {

      city: answers.city,
      state: answers.state,
      country: answers.country,

      bottled_water: answers.bottledWater,
      seafood: answers.seafood,
      packaged_food: answers.packagedFood,

      water_source: answers.waterSource,

      air_quality: answers.airQuality,
      indoor_dust: answers.indoorDust,

      synthetic_clothing: answers.syntheticClothing,
      cosmetics: answers.cosmetics

    }


    try{

      const response = await api.post(
        "/assess",
        payload
      )


      sessionStorage.setItem(
        "microshield_result",
        JSON.stringify(response.data)
      )


      navigate("/results")


    }

    catch(error){

      console.log(error)

      alert(
      "Assessment failed. Check backend."
      )

    }

  }

}
  const back = () => step > 0 && setStep(s => s - 1)

  return (
    <main className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="font-display text-3xl font-bold mb-2">Risk Assessment</h1>
      <p className="text-white/60 mb-8">Answer honestly — it takes about 5 minutes.</p>

      {/* Progress steps */}
      <div className="flex items-center gap-2 mb-10">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold border transition-all
              ${i === step ? 'step-active border-transparent' : i < step ? 'step-done' : 'step-inactive'}`}>
              {i + 1}
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-1 transition-all ${i < step ? 'bg-accent-teal/50' : 'bg-white/10'}`} />
            )}
          </div>
        ))}
      </div>
      <p className="text-xs text-white/40 mb-6 -mt-6">{STEPS[step]}</p>

      <div className="glass-card p-7">
        {step === 0 && <StepLocation answers={answers} update={update} />}
        {step === 1 && <StepDietWater answers={answers} update={update} />}
        {step === 2 && <StepAirHome answers={answers} update={update} />}
        {step === 3 && <StepClothingCare answers={answers} update={update} />}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={back} disabled={step === 0}
          className="btn-outline disabled:opacity-30 disabled:cursor-not-allowed">
          <ChevronLeft size={16} /> Back
        </button>
        <button onClick={next} className="btn-primary">
          {step === STEPS.length - 1 ? 'See My Results' : 'Next'} <ChevronRight size={16} />
        </button>
      </div>
    </main>
  )
}

// ---------- Step 1: Location ----------
function StepLocation({ answers, update }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-accent-teal mb-2">
        <MapPin size={18} />
        <span className="text-sm font-medium">This helps us factor in regional pollution data</span>
      </div>
      <Field label="City">
        <input className="form-input" placeholder="e.g. Jaipur" value={answers.city}
          onChange={e => update('city', e.target.value)} />
      </Field>
      <Field label="State">
        <input className="form-input" placeholder="e.g. Rajasthan" value={answers.state}
          onChange={e => update('state', e.target.value)} />
      </Field>
      <Field label="Country">
        <input className="form-input" placeholder="e.g. India" value={answers.country}
          onChange={e => update('country', e.target.value)} />
      </Field>
    </div>
  )
}

// ---------- Step 2: Diet & Water ----------
function StepDietWater({ answers, update }) {
  return (
    <div className="space-y-5">
      <Field label="How often do you drink bottled water vs. filtered tap water?">
        <Select value={answers.bottledWater} onChange={v => update('bottledWater', v)}
          options={['Filtered tap always', 'Occasionally bottled', 'Mostly bottled', 'Always bottled']} />
      </Field>
      <Field label="How often do you eat seafood?">
        <Select value={answers.seafood} onChange={v => update('seafood', v)}
          options={['Rarely / never', '1–2x per month', '1–2x per week', 'Multiple times a week']} />
      </Field>
      <Field label="How often do you eat packaged / ultra-processed food?">
        <Select value={answers.packagedFood} onChange={v => update('packagedFood', v)}
          options={['Rarely', 'A few times a week', 'Daily', 'Multiple times a day']} />
      </Field>
      <Field label="What's your main drinking water source?">
        <Select value={answers.waterSource} onChange={v => update('waterSource', v)}
          options={['RO / filtered tap', 'Boiled tap water', 'Unfiltered tap', 'Bottled / packaged only']} />
      </Field>
    </div>
  )
}

// ---------- Step 3: Air & Home ----------
function StepAirHome({ answers, update }) {
  return (
    <div className="space-y-5">
      <Field label="How would you describe your local air quality / surroundings?">
        <Select value={answers.airQuality} onChange={v => update('airQuality', v)}
          options={['Rural / clean air', 'Suburban, moderate traffic', 'Urban, heavy traffic', 'Near industrial area']} />
      </Field>
      <Field label="How often do you vacuum / dust your living space?">
        <Select value={answers.indoorDust} onChange={v => update('indoorDust', v)}
          options={['Daily', 'A few times a week', 'Weekly', 'Rarely']} />
      </Field>
    </div>
  )
}

// ---------- Step 4: Clothing & Care ----------
function StepClothingCare({ answers, update }) {
  return (
    <div className="space-y-5">
      <Field label="How often do you wear/wash synthetic fabrics (polyester, nylon, fleece)?">
        <Select value={answers.syntheticClothing} onChange={v => update('syntheticClothing', v)}
          options={['Rarely', 'Sometimes', 'Often', 'Almost always']} />
      </Field>
      <Field label="Do your cosmetics/toothpaste contain microbeads (check for 'polyethylene')?">
        <Select value={answers.cosmetics} onChange={v => update('cosmetics', v)}
          options={['No microbead products', 'Not sure', 'A few products', 'Most of my products']} />
      </Field>
    </div>
  )
}

// ---------- Shared field components ----------
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-white/80 mb-2">{label}</span>
      {children}
    </label>
  )
}

function Select({ value, onChange, options }) {
  return (
    <select className="form-select" value={value} onChange={e => onChange(Number(e.target.value))}>
      {options.map((opt, i) => (
        <option key={i} value={i}>{opt}</option>
      ))}
    </select>
  )
}
