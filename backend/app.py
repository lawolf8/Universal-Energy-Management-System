from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from data.api_wrappers.weather import WeatherFetcher
from data.api_wrappers.electric_cost import UtilityRatesFetcher

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize API wrappers
weather_fetcher = WeatherFetcher()
utility_rates_fetcher = UtilityRatesFetcher(os.getenv("nreal_api_key"))

@app.route('/api/weather', methods=['GET'])
def get_weather():
    """
    Endpoint to get weather data based on ZIP code
    Example: /api/weather?zipcode=33620
    """
    try:
        zipcode = request.args.get('zipcode')
        if not zipcode:
            return jsonify({'error': 'ZIP code is required'}), 400
        
        # Create location data dictionary
        location_data = {
            "zipcode": zipcode
        }
        
        # Get weather data
        weather_data = weather_fetcher.get_weather(location_data)
        
        # Check for errors in weather data
        if 'error' in weather_data:
            return jsonify(weather_data), 400
        
        # Process and format the weather data for frontend
        formatted_data = format_weather_for_frontend(weather_data)
        return jsonify(formatted_data)
    
    except Exception as e:
        return jsonify({'error': f'Failed to fetch weather data: {str(e)}'}), 500

def format_weather_for_frontend(weather_data):
    """
    Format the weather data for the frontend
    """
    try:
        properties = weather_data.get("properties", {})
        periods = properties.get("periods", [])
        
        if not periods:
            return {"error": "No forecast data available"}
        
        # Get the current period (first in the list)
        current = periods[0]
        
        # Basic weather information
        current_weather = {
            "temperature": current.get("temperature"),
            "temperatureUnit": current.get("temperatureUnit"),
            "shortForecast": current.get("shortForecast"),
            "detailedForecast": current.get("detailedForecast"),
            "windSpeed": current.get("windSpeed"),
            "windDirection": current.get("windDirection"),
            "icon": current.get("icon"),
            "isDaytime": current.get("isDaytime", True)
        }
        
        # Forecast for the next few periods
        forecast = []
        for period in periods[1:6]:  # Next 5 periods
            forecast.append({
                "name": period.get("name"),
                "temperature": period.get("temperature"),
                "temperatureUnit": period.get("temperatureUnit"),
                "shortForecast": period.get("shortForecast"),
                "icon": period.get("icon"),
                "windSpeed": period.get("windSpeed")
            })
        
        return {
            "current": current_weather,
            "forecast": forecast
        }
        
    except Exception as e:
        return {"error": f"Error formatting weather data: {str(e)}"}

@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Simple health check endpoint
    """
    return jsonify({'status': 'healthy'})

@app.route('/api/electric-cost', methods=['GET'])
def get_electric_cost():
    """
    Endpoint to get electricity cost data based on address or ZIP code
    Example: /api/electric-cost?address=33620
    """
    try:
        address = request.args.get('address')
        if not address:
            return jsonify({'error': 'Address or ZIP code is required'}), 400
        
        # Get electricity cost data
        cost_data = utility_rates_fetcher.get_residential_rate(address)
        
        # Check for errors
        if 'error' in cost_data:
            return jsonify(cost_data), 400
        
        return jsonify(cost_data)
    
    except Exception as e:
        return jsonify({'error': f'Failed to fetch electricity cost data: {str(e)}'}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 