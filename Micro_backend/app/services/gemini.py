"""
Gemini AI service for generating personalized
microplastic reduction recommendations.
"""

import google.generativeai as genai

from app.core.config import settings


# Configure Gemini with API key
genai.configure(
    api_key=settings.GEMINI_API_KEY
)


model = genai.GenerativeModel(
    "gemini-2.5-flash"
)



def generate_ai_plan(
        answers: dict,
        risk_result: dict,
        top_solutions: list
):

    """
    Creates personalized AI recommendations
    based on user's lifestyle and risk score.
    """


    prompt = f"""

You are MicroShield AI, an environmental health assistant.

Analyze this user's microplastic exposure data.

Risk Score:
{risk_result["overall_score"]}/100

Risk Level:
{risk_result["risk_tier"]}

Category Breakdown:
{risk_result["category_scores"]}

Lifestyle Answers:
{answers}

Current Recommendations:
{top_solutions}


Generate a personalized microplastic reduction plan.

Rules:
- Keep it practical
- Give 5 steps
- Explain why each step helps
- Focus on diet, water, air, clothing, personal care
- Avoid medical diagnosis
- Friendly tone
- Maximum 250 words

"""


    try:

        response = model.generate_content(
            prompt
        )


        return response.text


    except Exception as e:


        return (
            "AI recommendations are temporarily unavailable. "
            "Please follow the suggested lifestyle improvements."
        )
        