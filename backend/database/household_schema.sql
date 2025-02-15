CREATE SCHEMA household;

-- Households Table
CREATE TABLE household.Households (
    household_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_management.Users(user_id) ON DELETE CASCADE
);

-- Rooms Table (rooms associated with a household)
CREATE TABLE household.Rooms (
    room_id SERIAL PRIMARY KEY,
    household_id INT REFERENCES household.Households(household_id) ON DELETE CASCADE,
    room_name VARCHAR(50) NOT NULL
);

-- Devices Table (devices associated with a room)
CREATE TABLE household.Devices (
    device_id SERIAL PRIMARY KEY,
    room_id INT REFERENCES household.Rooms(room_id) ON DELETE CASCADE,
    device_name VARCHAR(100) NOT NULL,
    power_usage_per_hour_kWh DECIMAL(10, 4) NOT NULL
);
