CREATE SCHEMA user_management;

-- User Information Table
CREATE TABLE user_management.Users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15) UNIQUE NOT NULL,
    house_address TEXT NOT NULL
);

-- User Preferences Table
CREATE TABLE user_management.UserPreferences (
    preference_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES user_management.Users(user_id) ON DELETE CASCADE,
    preferred_temperature INT NOT NULL,
    preferred_hours INT,
    automation_enabled BOOLEAN DEFAULT TRUE
);
