"""
MicroShield Risk Scoring Engine.

This is the SOURCE OF TRUTH for scoring (the frontend's scoring.js does
the same math for instant UI feedback, but this backend version is what
actually gets saved to the database and is authoritative).

Methodology: weighted linear model across 5 exposure categories,
weights based on WHO / EFSA / ICMR literature on microplastic exposure
pathways (see synopsis doc, Section 6).
"""

CATEGORY_WEIGHTS = {
    "diet": 0.30,
    "water": 0.20,
    "air": 0.20,
    "clothing": 0.15,
    "personal_care": 0.15,
}

# Max possible raw score per category — used to normalize to a 0-100 scale.
# diet = 3 questions x max 3 points = 9. water = 1 question x 3 = 3. etc.
MAX_RAW = {
    "diet": 9,
    "water": 3,
    "air": 6,
    "clothing": 3,
    "personal_care": 3,
}

# Rule-based Tier-1 solutions. "threshold" = answer value (0-3) that triggers this fix.
SOLUTIONS_MAP = {
    "bottled_water": {
        "threshold": 2,
        "fix": "Switch to a steel or glass bottle + filtered tap water (Jal Jeevan Mission coverage is expanding — check your area).",
        "impact": "High impact",
        "cost": "₹300–800 one-time",
    },
    "seafood": {
        "threshold": 2,
        "fix": "Reduce shellfish/bottom-feeder intake; prefer fresh river fish over packaged/canned seafood.",
        "impact": "Medium impact",
        "cost": "Free",
    },
    "packaged_food": {
        "threshold": 2,
        "fix": "Avoid microwaving food in plastic containers; switch to glass or steel storage.",
        "impact": "Medium impact",
        "cost": "₹200–500 one-time",
    },
    "synthetic_clothing": {
        "threshold": 2,
        "fix": "Use a Guppyfriend washing bag — reduces microfiber shedding by up to 86%.",
        "impact": "Medium impact",
        "cost": "₹1,500 one-time",
    },
    "cosmetics": {
        "threshold": 2,
        "fix": "Check labels for \"polyethylene\" or \"PE\" in scrubs/toothpaste — switch to microbead-free options.",
        "impact": "Low–medium impact",
        "cost": "Free (just check labels)",
    },
    "air_quality": {
        "threshold": 2,
        "fix": "Use a HEPA air purifier indoors and check your city AQI via the SAFAR app before outdoor activity.",
        "impact": "Medium impact",
        "cost": "₹3,000+ (purifier) / Free (app)",
    },
}


def calculate_risk(answers: dict) -> dict:
    """
    Takes a dict of answers (matching AssessmentRequest field names)
    and returns overall score, tier, and per-category breakdown.
    """
    category_raw = {
        "diet": answers["bottled_water"] + answers["seafood"] + answers["packaged_food"],
        "water": answers["water_source"],
        "air": answers["air_quality"] + answers["indoor_dust"],
        "clothing": answers["synthetic_clothing"],
        "personal_care": answers["cosmetics"],
    }

    category_scores = {}
    overall = 0.0

    for category, weight in CATEGORY_WEIGHTS.items():
        normalized = (category_raw[category] / MAX_RAW[category]) * 100
        category_scores[category] = round(normalized)
        overall += normalized * weight

    overall = round(overall, 1)

    if overall >= 60:
        tier = "High"
    elif overall >= 35:
        tier = "Moderate"
    else:
        tier = "Low"

    return {
        "overall_score": overall,
        "risk_tier": tier,
        "category_scores": category_scores,
    }


def get_top_solutions(answers: dict, limit: int = 3) -> list[dict]:
    """
    Returns the top N triggered solutions, ranked by severity
    (how far above threshold the user's answer was).
    """
    triggered = []
    for key, rule in SOLUTIONS_MAP.items():
        value = answers.get(key, 0)
        if value >= rule["threshold"]:
            triggered.append({
                "key": key,
                "fix": rule["fix"],
                "impact": rule["impact"],
                "cost": rule["cost"],
                "severity": value,
            })

    triggered.sort(key=lambda s: s["severity"], reverse=True)
    return triggered[:limit]
