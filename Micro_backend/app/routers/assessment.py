"""
The core API route for Day 2: POST /api/assess

Takes the user's lifestyle answers, runs them through the scoring
engine, saves the result to PostgreSQL, and returns the computed
risk score + breakdown + top solutions to the frontend.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session


from app.core.database import get_db
from app.models.assessment import Assessment
from app.schemas.assessment import AssessmentRequest, AssessmentResponse
from app.services.scoring import calculate_risk, get_top_solutions
from app.services.gemini import generate_ai_plan


router = APIRouter(prefix="/api", tags=["assessment"])


@router.post("/assess", response_model=AssessmentResponse)
def create_assessment(payload: AssessmentRequest, db: Session = Depends(get_db)):
    answers = payload.model_dump(exclude={"city", "state", "country", "user_id"})

    risk_result = calculate_risk(answers)
    top_solutions = get_top_solutions(answers)
    ai_plan = generate_ai_plan( answers,
    risk_result,
    top_solutions)

    assessment = Assessment(
        user_id=payload.user_id,
        city=payload.city,
        state=payload.state,
        country=payload.country,
        raw_answers=answers,
        overall_score=risk_result["overall_score"],
        risk_tier=risk_result["risk_tier"],
        category_scores=risk_result["category_scores"],
        top_solutions=top_solutions,
        ai_plan=ai_plan,
    )

    db.add(assessment)
    db.commit()
    db.refresh(assessment)

    return assessment


@router.get("/assess/{assessment_id}", response_model=AssessmentResponse)
def get_assessment(assessment_id: int, db: Session = Depends(get_db)):
    assessment = db.query(Assessment).filter(Assessment.id == assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return assessment
