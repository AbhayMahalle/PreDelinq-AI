def assign_risk_segment(pd_score: float) -> str:
    """Assign risk segment based on PD score."""
    if pd_score < 0.05:
        return "Very Low Risk"
    elif pd_score < 0.15:
        return "Low Risk"
    elif pd_score < 0.35:
        return "Medium Risk"
    elif pd_score < 0.60:
        return "High Risk"
    else:
        return "Very High Risk"

def get_recommendation(pd_score: float) -> str:
    """Generate business recommendation based on user's required PD thresholds."""
    if pd_score < 0.10:
        return "Approve"
    elif pd_score < 0.20:
        return "Approve With Conditions"
    elif pd_score < 0.40:
        return "Manual Review"
    else:
        return "Reject"
