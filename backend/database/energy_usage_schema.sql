CREATE SCHEMA energy_usage;

-- Energy Consumption Log Table (log of energy consumption for each device)
-- Note: This will use a 3rd Party API to log energy consumption (unless product is IoT)
CREATE TABLE energy_usage.EnergyConsumptionLog (
    log_id SERIAL PRIMARY KEY,
    device_id INT REFERENCES household.Devices(device_id) ON DELETE CASCADE,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    energy_used_kWh DECIMAL(10, 4) NOT NULL
);

-- Historical Electricity Usage Table (from the API Wrapper "electric_usage.py")
CREATE TABLE energy_usage.HistoricalElectricityUsage (
    record_id SERIAL PRIMARY KEY,
    period DATE NOT NULL,
    state_id VARCHAR(10) NOT NULL,
    state_description VARCHAR(50) NOT NULL,
    sector_id VARCHAR(10) NOT NULL,
    sector_name VARCHAR(50) NOT NULL,
    sales DECIMAL(15, 5) NOT NULL,
    sales_units VARCHAR(50) NOT NULL
);

-- Electricity Cost Table (from the API Wrapper "electric_cost.py")
CREATE TABLE energy_usage.ElectricityCost (
    cost_id SERIAL PRIMARY KEY,
    utility_name VARCHAR(100) NOT NULL,
    residential_rate DECIMAL(10, 4) NOT NULL,
    log_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
