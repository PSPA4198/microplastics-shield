import { downloadReport } from "../utils/pdf"
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer
} from 'recharts'

import {
  AlertTriangle,
  CheckCircle2,
  RotateCcw
} from 'lucide-react'


const TIER_STYLES = {

  Low: {
    cls: 'risk-low',
    icon: CheckCircle2
  },

  Moderate: {
    cls: 'risk-medium',
    icon: AlertTriangle
  },

  High: {
    cls: 'risk-high',
    icon: AlertTriangle
  }

}


const CATEGORY_LABELS = {

  diet: 'Diet',
  water: 'Water',
  air: 'Air',
  clothing: 'Clothing',
  personal_care: 'Personal Care'

}


export default function Results() {


  const [result, setResult] = useState(null)

  const navigate = useNavigate()



  useEffect(() => {


    const storedResult =
      sessionStorage.getItem(
        "microshield_result"
      )


    if (!storedResult) {

      navigate('/assess')
      return

    }


    setResult(
      JSON.parse(storedResult)
    )


  }, [navigate])




  if (!result) {

    return null

  }




  const chartData =
    Object.entries(result.category_scores)
      .map(([key, value]) => ({

        category:
          CATEGORY_LABELS[key],

        score:
          value

      }))



  const solutions =
    result.top_solutions || []



  const TierIcon =
    TIER_STYLES[result.risk_tier].icon





  return (

    
    <main id="report-section" className="max-w-4xl mx-auto px-6 py-12">

      <h1 className="font-display text-3xl font-bold mb-2">

        Your Exposure Report

      </h1>


      <p className="text-white/60 mb-8">

        Based on your lifestyle answers

      </p>




      {/* Score summary */}

      <div className="glass-card p-7 mb-8 flex flex-wrap items-center justify-between gap-6">


        <div>


          <div className="text-sm text-white/50 mb-1">

            Overall Risk Score

          </div>


          <div className="text-5xl font-bold gradient-text">

            {result.overall_score}

            <span className="text-2xl text-white/40">
              /100
            </span>

          </div>


        </div>




        <div
          className={`
          px-5 py-3 rounded-2xl
          flex items-center gap-2
          font-semibold
          ${TIER_STYLES[result.risk_tier].cls}
          `}
        >

          <TierIcon size={20}/>

          {result.risk_tier} Risk


        </div>


      </div>





      {/* Chart + Category */}

      <div className="grid md:grid-cols-2 gap-6 mb-8">


        <div className="glass-card p-6">


          <h3 className="font-semibold mb-4">

            Risk Breakdown

          </h3>



          <ResponsiveContainer width="100%" height={260}>

            <RadarChart data={chartData}>

              <PolarGrid stroke="rgba(255,255,255,0.1)" />

              <PolarAngleAxis
                dataKey="category"
                tick={{
                  fill:'rgba(255,255,255,0.6)',
                  fontSize:12
                }}
              />

              <PolarRadiusAxis
                angle={30}
                domain={[0,100]}
              />


              <Radar
                dataKey="score"
                stroke="#1fb6ff"
                fill="#1fb6ff"
                fillOpacity={0.35}
              />


            </RadarChart>

          </ResponsiveContainer>


        </div>






        <div className="glass-card p-6">


          <h3 className="font-semibold mb-4">

            By Category

          </h3>


          <div className="space-y-4">


            {chartData.map(({category, score}) => (

              <div key={category}>


                <div className="flex justify-between text-sm mb-1.5">

                  <span className="text-white/70">

                    {category}

                  </span>


                  <span>

                    {score}/100

                  </span>


                </div>


                <div className="h-2 rounded-full bg-white/5 overflow-hidden">


                  <div

                    className="h-full rounded-full"

                    style={{
                      width:`${score}%`,
                      background:
                      'linear-gradient(90deg,#3a7bd5,#1fb6ff)'
                    }}

                  />


                </div>


              </div>


            ))}


          </div>


        </div>


      </div>







      {/* Solutions */}


      <div className="mb-8">


        <h3 className="font-semibold text-lg mb-4">

          Your Top {solutions.length} Recommended Changes

        </h3>



        {
        solutions.length === 0 ?

        <div className="glass-card p-6 text-white/60 text-sm">

          Great news — no major red flags in your answers.

        </div>


        :


        <div className="space-y-3">


        {solutions.map((s,i)=>(


          <div
            key={s.key}
            className="glass-card p-5 flex gap-4"
          >


            <div className="
              w-8 h-8 rounded-full
              flex items-center justify-center
              text-sm font-bold
            ">

              {i+1}

            </div>



            <div>


              <p className="text-sm text-white/90 mb-1.5">

                {s.fix}

              </p>


              <div className="flex gap-3 text-xs text-white/50">

                <span>{s.impact}</span>

                <span>·</span>

                <span>{s.cost}</span>

              </div>


            </div>


          </div>


        ))}


        </div>

        }


      </div>





      {/* Gemini AI Plan */}


      {result.ai_plan && (


        <div className="glass-card p-6 mb-8">


          <h3 className="font-semibold text-lg mb-4">

            🤖 AI Personalized Reduction Plan

          </h3>


          <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">

            {result.ai_plan}

          </p>


        </div>


      )}






      <div className="flex flex-wrap gap-4">


        <button

          onClick={()=>navigate('/assess')}

          className="btn-outline"

        >

          <RotateCcw size={16}/>

          Retake Assessment


        </button>


        <button 
        onClick={downloadReport}
        className="btn-primary"> Download PDF Report </button>

      </div>




    </main>

  )

}
