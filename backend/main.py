from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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