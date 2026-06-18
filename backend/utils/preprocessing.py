import pandas as pd
import numpy as np
from services.model_service import ModelService
from services.portfolio_service import PortfolioService

def build_feature_vector(inputs: dict) -> pd.DataFrame:
    """
    Build a 193-feature vector from user inputs.
    Missing features are filled with median values.
    """
    model_service = ModelService()
    portfolio_service = PortfolioService()
    
    feature_names = model_service.get_feature_names()
    feature_medians = portfolio_service.get_feature_medians()

    # Start with medians
    row = {f: feature_medians.get(f, 0.0) for f in feature_names}

    # Map direct inputs (matching Next.js form)
    age = inputs.get("age", inputs.get("AGE_YEARS", 35))
    income = inputs.get("income", inputs.get("AMT_INCOME_TOTAL", 150000))
    credit = inputs.get("credit_amount", inputs.get("AMT_CREDIT", 500000))
    annuity = inputs.get("annuity", inputs.get("AMT_ANNUITY", 25000))
    goods_price = inputs.get("goods_price", inputs.get("AMT_GOODS_PRICE", 450000))
    employment_years = inputs.get("employment_years", inputs.get("EMPLOYED_YEARS", 5))
    family_members = inputs.get("family_members", inputs.get("CNT_FAM_MEMBERS", 2))
    children = inputs.get("children", inputs.get("CNT_CHILDREN", 0))
    ext1 = inputs.get("ext_source_1", inputs.get("EXT_SOURCE_1", 0.5))
    ext2 = inputs.get("ext_source_2", inputs.get("EXT_SOURCE_2", 0.5))
    ext3 = inputs.get("ext_source_3", inputs.get("EXT_SOURCE_3", 0.5))
    own_car = inputs.get("own_car", False)

    # Direct feature mapping
    if "AGE_YEARS" in row:
        row["AGE_YEARS"] = float(age)
    if "DAYS_BIRTH" in row:
        row["DAYS_BIRTH"] = float(-age * 365)
    if "AMT_INCOME_TOTAL" in row:
        row["AMT_INCOME_TOTAL"] = float(income)
    if "AMT_CREDIT" in row:
        row["AMT_CREDIT"] = float(credit)
    if "AMT_ANNUITY" in row:
        row["AMT_ANNUITY"] = float(annuity)
    if "AMT_GOODS_PRICE" in row:
        row["AMT_GOODS_PRICE"] = float(goods_price)
    if "EMPLOYED_YEARS" in row:
        row["EMPLOYED_YEARS"] = float(employment_years)
    if "DAYS_EMPLOYED" in row:
        row["DAYS_EMPLOYED"] = float(-employment_years * 365)
    if "CNT_FAM_MEMBERS" in row:
        row["CNT_FAM_MEMBERS"] = float(family_members)
    if "CNT_CHILDREN" in row:
        row["CNT_CHILDREN"] = float(children)
    if "EXT_SOURCE_1" in row:
        row["EXT_SOURCE_1"] = float(ext1)
    if "EXT_SOURCE_2" in row:
        row["EXT_SOURCE_2"] = float(ext2)
    if "EXT_SOURCE_3" in row:
        row["EXT_SOURCE_3"] = float(ext3)

    # Derived features
    ext_vals = [ext1, ext2, ext3]
    if "EXT_SOURCE_MEAN" in row:
        row["EXT_SOURCE_MEAN"] = float(np.mean(ext_vals))
    if "EXT_SOURCE_MAX" in row:
        row["EXT_SOURCE_MAX"] = float(np.max(ext_vals))
    if "EXT_SOURCE_MIN" in row:
        row["EXT_SOURCE_MIN"] = float(np.min(ext_vals))
    if "EXT_SOURCE_PRODUCT" in row:
        row["EXT_SOURCE_PRODUCT"] = float(np.prod(ext_vals))
    if "EXT_SOURCE_STD" in row:
        row["EXT_SOURCE_STD"] = float(np.std(ext_vals))
    if "EXT_SOURCE_COUNT_AVAILABLE" in row:
        row["EXT_SOURCE_COUNT_AVAILABLE"] = 3.0

    if "CREDIT_INCOME_RATIO" in row and income > 0:
        row["CREDIT_INCOME_RATIO"] = float(credit / income)
    if "ANNUITY_INCOME_RATIO" in row and income > 0:
        row["ANNUITY_INCOME_RATIO"] = float(annuity / income)
    if "CREDIT_GOODS_RATIO" in row and goods_price > 0:
        row["CREDIT_GOODS_RATIO"] = float(credit / goods_price)
    if "INCOME_PER_PERSON" in row and family_members > 0:
        row["INCOME_PER_PERSON"] = float(income / family_members)

    if "FLAG_OWN_CAR_Y" in row:
        row["FLAG_OWN_CAR_Y"] = 1.0 if own_car else 0.0
    if "FLAG_OWN_CAR_N" in row:
        row["FLAG_OWN_CAR_N"] = 0.0 if own_car else 1.0

    df = pd.DataFrame([row], columns=feature_names)
    df = df.fillna(0)
    return df
