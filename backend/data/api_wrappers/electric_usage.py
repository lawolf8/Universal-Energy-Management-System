'''
Electricity Usage Data Fetcher
API Information: https://www.eia.gov/opendata/qb.php?category=2251605
'''

import requests
import json
from dotenv import load_dotenv
import os
from datetime import datetime, timedelta

class EIADataFetcher:
    def __init__(self, api_key: str):
        """
        Initializes the EIADataFetcher with the EIA API key.
        Uses the v2 API endpoints.
        """
        self.api_key = api_key
        self.base_url = "https://api.eia.gov/v2"
    
    def get_historical_electricity_usage(self, location_data: dict) -> dict:
        """
        Fetches historical electricity usage data using the EIA v2 API.
        
        :param location_data: Dictionary containing location details
        :return: Dictionary containing historical electricity usage data
        """
        # For Tampa, FL we'll use the state facet for Florida
        params = {
            "api_key": self.api_key,
            "frequency": "monthly",
            "data[]": "sales",  # Get electricity sales data
            "facets[stateid][]": "FL",  # Florida
            "facets[sectorid][]": "ALL",  # All sectors
            "start": "2023-01",
            "end": "2023-12",
            "sort[0][column]": "period",
            "sort[0][direction]": "desc"
        }
        
        try:
            # Using the retail-sales endpoint as specified in the documentation
            response = requests.get(
                f"{self.base_url}/electricity/retail-sales/data",
                params=params
            )
            
            response.raise_for_status()
            
            data = response.json()
            
            if "response" in data:
                return {
                    "success": True,
                    "data": data["response"].get("data", []),
                    "total_records": data["response"].get("total", 0)
                }
            else:
                return {
                    "success": False,
                    "error": "Unexpected API response format",
                    "raw_response": data
                }
                
        except requests.exceptions.RequestException as e:
            return {
                "success": False,
                "error": f"API request failed: {str(e)}",
                "status_code": getattr(e.response, 'status_code', None) if hasattr(e, 'response') else None,
                "url": e.response.url if hasattr(e, 'response') else None
            }

if __name__ == "__main__":
    load_dotenv()
    eia_api_key = os.getenv("eia_api_key")
    
    if not eia_api_key:
        print("Error: EIA_API_KEY not found in .env file")
        exit(1)
    
    location_data = {
        "street": "4202 E Fowler Ave",
        "city": "Tampa",
        "state": "FL",
        "zipcode": "33620"
    }
    
    eia_fetcher = EIADataFetcher(eia_api_key)
    result = eia_fetcher.get_historical_electricity_usage(location_data)
    
    print("Historical Electricity Usage Data:")
    print(json.dumps(result, indent=2))
    
    # If the request failed, print the full URL for debugging
    if not result.get("success", False):
        print("\nDebug Information:")
        print(f"Error: {result.get('error')}")
        print(f"Status Code: {result.get('status_code')}")
        print(f"Request URL: {result.get('url')}")