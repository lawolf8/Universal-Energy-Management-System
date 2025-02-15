CREATE SCHEMA model_results;

-- Model Results Tables
CREATE TABLE model_results.ModelAccuracy (
    accuracy_id SERIAL PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    date_run TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metric_name VARCHAR(50) NOT NULL, -- e.g., RMSE, MAE, Precision, Recall
    metric_value DECIMAL(10, 5) NOT NULL
);

-- Model Optimization Tables (for model hyperparameter tuning)
CREATE TABLE model_results.OptimizationDecisions (
    decision_id SERIAL PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    date_run TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    device_id INT REFERENCES household.Devices(device_id) ON DELETE CASCADE,
    recommended_action VARCHAR(255) NOT NULL, -- e.g., "Turn off from 2-5 PM"
    estimated_savings_kWh DECIMAL(10, 4) NOT NULL
);

-- Model Execution Logs Table (logs of model execution times and hyperparameters)
CREATE TABLE model_results.ModelExecutionLogs (
    log_id SERIAL PRIMARY KEY,
    model_name VARCHAR(100) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    execution_time_seconds DECIMAL(10, 3) NOT NULL,
    parameters JSONB NOT NULL -- Stores model hyperparameters
);
