'''
Electricity Cost Data Fetcher
API Information: https://developer.nrel.gov/docs/electricity/utility-rates-v3/

'''

import requests
import json
from dotenv import load_dotenv
import os

class UtilityRatesFetcher:
    def __init__(self, api_key: str):
        """
        Initializes the UtilityRatesFetcher with an API key.
        :param api_key: API key for the NREL Utility Rates API.
        """
        self.api_key = api_key
        self.base_url = "https://developer.nrel.gov/api/utility_rates/v3.json"

    def get_residential_rate(self, address: str) -> dict:
        """
        Fetches the residential electricity rate for a given ZIP code.
        :param address: ZIP code for the location.
        :return: Dictionary containing the utility name and residential rate.
        """
        params = {
            "api_key": self.api_key,
            "address": address,
        }
        response = requests.get(self.base_url, params=params)
        
        if response.status_code == 200:
            data = response.json()
            if "outputs" in data and "residential" in data["outputs"]:
                return {
                    "utility_name": data["outputs"].get("utility_name", "Unknown"),
                    "residential_rate": data["outputs"]["residential"]
                }
            else:
                return {"error": "No residential rate data available."}
        else:
            return {"error": f"API request failed with status code {response.status_code}"}

if __name__ == "__main__":
    # Load the NREL API key from the .env file
    load_dotenv() 
    API_KEY = os.getenv("nreal_api_key")
    address = '4202 E Fowler Ave, Tampa, FL 33620'
    fetcher = UtilityRatesFetcher(API_KEY)
    result = fetcher.get_residential_rate(address)
    print(json.dumps(result, indent=2))
