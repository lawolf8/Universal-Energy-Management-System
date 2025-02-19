CREATE SCHEMA pricing;

-- Peak Energy Pricing Table (pricing for peak energy hours)
CREATE TABLE pricing.PeakEnergyPricing (
    pricing_id SERIAL PRIMARY KEY,
    state_id VARCHAR(10) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    peak_rate DECIMAL(10, 4) NOT NULL
);
