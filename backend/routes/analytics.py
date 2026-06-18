from flask import Blueprint, jsonify, request
import numpy as np
from services.portfolio_service import PortfolioService
from utils.recommendation_engine import get_recommendation

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/portfolio-summary', methods=['GET'])
def portfolio_summary():
    portfolio_service = PortfolioService()
    portfolio_df = portfolio_service.get_portfolio_df()

    if portfolio_df is None or portfolio_df.empty:
        return jsonify({"error": "Portfolio data not available"}), 404

    total = len(portfolio_df)
    avg_pd = float(portfolio_df["PD_SCORE"].mean())
    median_pd = float(portfolio_df["PD_SCORE"].median())
    expected_defaults = int((portfolio_df["PD_SCORE"] >= 0.5).sum())
    high_risk = int((portfolio_df["PD_SCORE"] >= 0.35).sum())

    segment_counts = portfolio_df["RISK_SEGMENT"].value_counts().to_dict()

    top20 = portfolio_df.nlargest(20, "PD_SCORE")[
        ["SK_ID_CURR", "TARGET", "PD_SCORE", "RISK_SEGMENT"]
    ].to_dict(orient="records")

    hist_values, bin_edges = np.histogram(portfolio_df["PD_SCORE"], bins=50)
    pd_histogram = [
        {"bin_start": round(float(bin_edges[i]), 4),
         "bin_end": round(float(bin_edges[i + 1]), 4),
         "count": int(hist_values[i])}
        for i in range(len(hist_values))
    ]

    return jsonify({
        "total_customers": total,
        "avg_pd": round(avg_pd, 4),
        "median_pd": round(median_pd, 4),
        "expected_defaults": expected_defaults,
        "high_risk_count": high_risk,
        "segment_counts": segment_counts,
        "top20_riskiest": top20,
        "pd_histogram": pd_histogram,
    })

@analytics_bp.route('/risk-segments', methods=['GET'])
def risk_segments():
    portfolio_service = PortfolioService()
    risk_segments_df = portfolio_service.get_risk_segments_df()

    if risk_segments_df is None:
        return jsonify({"error": "Risk segment data not available"}), 404

    records = risk_segments_df.to_dict(orient="records")
    return jsonify({"segments": records})

@analytics_bp.route('/portfolio-search', methods=['GET'])
def portfolio_search():
    portfolio_service = PortfolioService()
    portfolio_df = portfolio_service.get_portfolio_df()

    if portfolio_df is None or portfolio_df.empty:
        return jsonify({"error": "Portfolio data not available"}), 404

    try:
        page = int(request.args.get("page", 1))
        page_size = int(request.args.get("page_size", 20))
    except ValueError:
        return jsonify({"error": "Invalid pagination parameters"}), 400

    search = request.args.get("search", "")
    segment = request.args.get("segment", "")

    filtered = portfolio_df.copy()

    if search:
        filtered = filtered[filtered["SK_ID_CURR"].astype(str).str.contains(search)]

    if segment:
        filtered = filtered[filtered["RISK_SEGMENT"] == segment]

    total = len(filtered)
    start = (page - 1) * page_size
    end = start + page_size
    page_data = filtered.iloc[start:end]

    records = page_data.to_dict(orient="records")
    for r in records:
        # Use PD score to determine recommendation since that's logic from recommendation_engine
        # Although portfolio DB only contains SK_ID_CURR, TARGET, PD_SCORE, RISK_SEGMENT
        pd_score = float(r.get("PD_SCORE", 0))
        r["recommendation"] = get_recommendation(pd_score)

    return jsonify({
        "total": total,
        "page": page,
        "page_size": page_size,
        "total_pages": max(1, (total + page_size - 1) // page_size),
        "data": records,
    })
