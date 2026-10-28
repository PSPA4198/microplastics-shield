// src/utils/scoring.js
// ============================================================
// MicroShield Risk Scoring Engine (frontend mirror of backend logic)
// Each answer value is 0-3. Category weights sum to 100.
// ============================================================

export const CATEGORY_WEIGHTS = {
  diet:     0.30,
  water:    0.20,
  air:      0.20,
  clothing: 0.15,
  personalCare: 0.15,
}

// Max possible raw score per category (used to normalize to 0-100)
const MAX_RAW = {
  diet: 9,          // 3 questions x 3 max
  water: 3,         // 1 question x 3 max
  air: 6,            // 2 questions x 3 max
  clothing: 3,       // 1 question x 3 max
  personalCare: 3,   // 1 question x 3 max
}

export function calculateRisk(answers) {
  const categoryRaw = {
    diet:          (answers.bottledWater ?? 0) + (answers.seafood ?? 0) + (answers.packagedFood ?? 0),
    water:         (answers.waterSource ?? 0),
    air:           (answers.airQuality ?? 0) + (answers.indoorDust ?? 0),
    clothing:      (answers.syntheticClothing ?? 0),
    personalCare:  (answers.cosmetics ?? 0),
  }

  const categoryScores = {}
  let overall = 0

  for (const cat of Object.keys(CATEGORY_WEIGHTS)) {
    const normalized = (categoryRaw[cat] / MAX_RAW[cat]) * 100
    categoryScores[cat] = Math.round(normalized)
    overall += normalized * CATEGORY_WEIGHTS[cat]
  }

  overall = Math.round(overall)

  let tier = 'Low'
  if (overall >= 60) tier = 'High'
  else if (overall >= 35) tier = 'Moderate'

  return { overall, tier, categoryScores }
}

// Rule-based Tier-1 solutions, mapped per answer
export const SOLUTIONS_MAP = {
  bottledWater: {
    threshold: 2,
    fix: 'Switch to a steel or glass bottle + filtered tap water (Jal Jeevan Mission coverage is expanding — check your area).',
    impact: 'High impact',
    cost: '₹300–800 one-time',
  },
  seafood: {
    threshold: 2,
    fix: 'Reduce shellfish/bottom-feeder intake; prefer fresh river fish over packaged/canned seafood.',
    impact: 'Medium impact',
    cost: 'Free',
  },
  packagedFood: {
    threshold: 2,
    fix: 'Avoid microwaving food in plastic containers; switch to glass or steel storage.',
    impact: 'Medium impact',
    cost: '₹200–500 one-time',
  },
  syntheticClothing: {
    threshold: 2,
    fix: 'Use a Guppyfriend washing bag — reduces microfiber shedding by up to 86%.',
    impact: 'Medium impact',
    cost: '₹1,500 one-time',
  },
  cosmetics: {
    threshold: 2,
    fix: 'Check labels for "polyethylene" or "PE" in scrubs/toothpaste — switch to microbead-free options.',
    impact: 'Low–medium impact',
    cost: 'Free (just check labels)',
  },
  airQuality: {
    threshold: 2,
    fix: 'Use a HEPA air purifier indoors and check your city AQI via the SAFAR app before outdoor activity.',
    impact: 'Medium impact',
    cost: '₹3,000+ (purifier) / Free (app)',
  },
}

export function getTopSolutions(answers, limit = 3) {
  const triggered = []
  for (const [key, rule] of Object.entries(SOLUTIONS_MAP)) {
    if ((answers[key] ?? 0) >= rule.threshold) {
      triggered.push({ key, ...rule, severity: answers[key] })
    }
  }
  return triggered.sort((a, b) => b.severity - a.severity).slice(0, limit)
}
