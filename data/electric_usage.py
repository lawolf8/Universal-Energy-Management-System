import requests
import json
from dotenv import load_dotenv
import os

class EIADataFetcher:
    def __init__(self, api_key: str):
        """
        Initializes the EIADataFetcher with the EIA API key.
        """
        self.api_key = api_key
        self.eia_url = "https://api.eia.gov/v2/electricity/rto/daily-region-data/data/"
    
    def get_historical_electricity_usage(self, location_data: dict) -> dict:
        """
        Fetches historical electricity usage for a given ZIP code area.
        :param location_data: Dictionary containing location details, including a "zipcode" key.
        :return: Dictionary containing historical electricity usage data.
        """
        zipcode = location_data.get("zipcode")
        if not zipcode:
            return {"error": "ZIP code not found in provided location data."}
        
        params = {
            "api_key": self.api_key,
            "frequency": "daily",
            "data": ["demand"],
            "facets": {"region": [zipcode]},
            "start": "2023-01-01",
            "end": "2023-12-31"
        }
        response = requests.get(self.eia_url, params=params)
        
        if response.status_code == 200:
            return response.json()
        return {"error": "Unable to fetch electricity usage data."}

if __name__ == "__main__":
    load_dotenv()
    eia_api_key = os.getenv("eia_api_key")  # Ensure you store this in a .env file
    location_data = {
        "street": "4202 E Fowler Ave",
        "city": "Tampa",
        "state": "FL",
        "zipcode": "33620"
    }
    
    eia_fetcher = EIADataFetcher(eia_api_key)
    eia_result = eia_fetcher.get_historical_electricity_usage(location_data)
    print("Historical Electricity Usage Data:")
    print(json.dumps(eia_result, indent=2))
