'''
Weather Data Fetcher
API Information: https://www.weather.gov/documentation/services-web-api
'''

import requests
import json
import pgeocode
from dotenv import load_dotenv
import os
import time

class WeatherFetcher:
    def __init__(self):
        """
        Initializes the WeatherFetcher with the National Weather Service API.
        """
        self.weather_url = "https://api.weather.gov/points/"
        self.headers = {
            'User-Agent': '(Universal Energy Management System, contact@example.com)',
            'Accept': 'application/json'
        }
    
    def get_coordinates(self, zipcode: str) -> tuple:
        """
        Converts ZIP code to latitude and longitude using pgeocode.
        :param zipcode: ZIP code
        :return: Tuple (latitude, longitude)
        """
        try:
            print(f"Attempting to get coordinates for ZIP code: {zipcode}")
            nomi = pgeocode.Nominatim('us')
            location = nomi.query_postal_code(zipcode)
            print(f"Raw location data from pgeocode: {location}")
            
            # Only check if latitude and longitude are valid
            if location is not None and not pd.isna(location['latitude']) and not pd.isna(location['longitude']):
                lat, lon = location['latitude'], location['longitude']
                print(f"Successfully retrieved coordinates: {lat}, {lon}")
                return lat, lon
            else:
                print("Invalid or missing coordinates in location data")
                return None, None
        except Exception as e:
            print(f"Error getting coordinates: {str(e)}")
            return None, None

    def get_weather(self, location_data: dict) -> dict:
        """
        Fetches weather forecast for a given ZIP code in the provided location data hashmap.
        :param location_data: Dictionary containing location details, including a "zipcode" key.
        :return: Dictionary containing weather information.
        """
        try:
            print(f"\nProcessing location data: {location_data}")
            zipcode = location_data.get("zipcode")
            if not zipcode:
                return {"error": "ZIP code not found in provided location data."}
            
            print(f"Getting coordinates for ZIP code: {zipcode}")
            lat, lon = self.get_coordinates(zipcode)
            if not lat or not lon:
                return {"error": "Invalid ZIP code or unable to fetch coordinates."}
            
            print(f"Attempting to fetch weather data for coordinates: {lat}, {lon}")
            max_retries = 3
            retry_delay = 1
            
            for attempt in range(max_retries):
                try:
                    weather_url = f"{self.weather_url}{lat},{lon}"
                    print(f"Making request to: {weather_url}")
                    
                    response = requests.get(
                        weather_url,
                        headers=self.headers,
                        timeout=10
                    )
                    print(f"Initial API response status code: {response.status_code}")
                    response.raise_for_status()
                    
                    grid_data = response.json()
                    print(f"Grid data received: {json.dumps(grid_data, indent=2)}")
                    
                    if "properties" in grid_data and "forecast" in grid_data["properties"]:
                        forecast_url = grid_data["properties"]["forecast"]
                        print(f"Fetching forecast from: {forecast_url}")
                        
                        forecast_response = requests.get(
                            forecast_url,
                            headers=self.headers,
                            timeout=10
                        )
                        print(f"Forecast API response status code: {forecast_response.status_code}")
                        forecast_response.raise_for_status()
                        
                        return forecast_response.json()
                    else:
                        return {"error": "Invalid response format from weather service."}
                
                except requests.exceptions.RequestException as e:
                    print(f"Request attempt {attempt + 1} failed: {str(e)}")
                    if attempt == max_retries - 1:
                        return {"error": f"Failed to fetch weather data after {max_retries} attempts: {str(e)}"}
                    print(f"Waiting {retry_delay} seconds before retrying...")
                    time.sleep(retry_delay)
                    continue
            
            return {"error": "Unable to fetch weather data."}
        
        except Exception as e:
            print(f"Unexpected error: {str(e)}")
            return {"error": f"An unexpected error occurred: {str(e)}"}

def format_weather_data(weather_data: dict) -> None:
    """
    Formats and prints weather data in a more readable way.
    """
    if "error" in weather_data:
        print(f"Error: {weather_data['error']}")
        return
    
    try:
        properties = weather_data.get("properties", {})
        periods = properties.get("periods", [])
        
        if not periods:
            print("No forecast data available.")
            return
        
        print("\nWeather Forecast:")
        for period in periods[:5]:
            print(f"\n{period['name']}:")
            print(f"Temperature: {period['temperature']}°{period['temperatureUnit']}")
            print(f"Forecast: {period['shortForecast']}")
            print(f"Wind: {period['windSpeed']} {period['windDirection']}")
    except Exception as e:
        print(f"Error formatting weather data: {e}")

if __name__ == "__main__":
    load_dotenv()
    import pandas as pd  # Added pandas import for isna check
    
    location_data = {
        "street": "4202 E Fowler Ave",
        "city": "Tampa",
        "state": "FL",
        "zipcode": "33620"
    }
    
    weather_fetcher = WeatherFetcher()
    weather_result = weather_fetcher.get_weather(location_data)
    format_weather_data(weather_result)