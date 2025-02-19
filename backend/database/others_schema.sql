CREATE SCHEMA others;

CREATE TABLE others.WeatherForecast (
    forecast_id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    time_period VARCHAR(50) NOT NULL, -- e.g., 'Afternoon', 'Night'
    temperature_f INT NOT NULL,
    forecast_description TEXT NOT NULL,
    wind_speed_mph DECIMAL(5, 2) NOT NULL
);
