import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.aggregator import HistorianAggregator

# Import your existing engines
from src.config import PlantConfig, AdvancedConfig
from src.data_loader import DataLoader
from src.kpi_engine import KPIEngine
from src.intelligence import ProcessIntelligence

app = FastAPI(title="Hercules Industrial API")

# This allows your frontend (which will run on a different port) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. Initialize Engines & Load Data
config = PlantConfig()
adv_config = AdvancedConfig()
# Make sure this path points to where you placed the CSV file
loader = DataLoader("data/mini_hercules_mock_data_hourly.csv")

# 2. Process Data
raw_df = loader.load_data()
kpi_engine = KPIEngine(config)
intel_engine = ProcessIntelligence(adv_config)

# Run the calculations
kpi_df = kpi_engine.process(raw_df)
anomaly_df = intel_engine.detect_anomalies(kpi_df)
alerts = intel_engine.generate_alerts(anomaly_df)

@app.get("/api/kpis")
def get_kpis():
    """Returns the processed hourly KPI data for charts."""
    # Convert DataFrame to a list of dictionaries, replacing NaNs with None for JSON
    clean_df = kpi_df.where(kpi_df.notna(), None)
    return clean_df.to_dict(orient="records")

@app.get("/api/alerts")
def get_alerts():
    """Returns the generated anomaly alerts."""
    return [{"timestamp": a.timestamp.isoformat(), "category": a.category, "message": a.message, "severity": a.severity} for a in alerts]

@app.get("/api/reports")
def get_reports():
    """Returns daily aggregated production reports."""
    # LBYL: Ensure data exists before aggregating
    if kpi_df is None or kpi_df.empty:
        return []
        
    aggregator = HistorianAggregator(config)
    
    # Resample to Daily ('D') frequency
    daily_report_df = aggregator.aggregate(kpi_df, 'D')
    
    # Clean up the index and NaNs for JSON serialization
    daily_report_df = daily_report_df.reset_index()
    daily_report_df = daily_report_df.where(pd.notnull(daily_report_df), None)
    
    return daily_report_df.to_dict(orient="records")

@app.get("/api/config")
def get_plant_config():
    """Returns the current operating parameters of the facility."""
    # LBYL: Ensure config objects exist
    if config and adv_config:
        return {
            "operating_days": config.operating_days,
            "start_hour": config.start_hour,
            "end_hour": config.end_hour,
            "bag_weight_kg": config.bag_weight_kg,
            "moisture_high_warning": adv_config.moisture_high_warning,
            "temp_high_warning": adv_config.temp_high_warning
        }
    return {}

@app.post("/api/config/update")
def update_config(new_params: dict):
    """Updates the plant operational parameters dynamically."""
    # LBYL: Comprehensive validation of incoming keys
    if "start_hour" in new_params:
        val = int(new_params["start_hour"])
        if 0 <= val <= 23:
            config.start_hour = val
            
    if "end_hour" in new_params:
        val = int(new_params["end_hour"])
        if 0 <= val <= 23:
            config.end_hour = val

    if "moisture_high_warning" in new_params:
        val = float(new_params["moisture_high_warning"])
        if 0.0 < val < 100.0:
            adv_config.moisture_high_warning = val
            
    return {"status": "success", "message": "Parameters updated successfully"}