'''
Kaggle API Wrapper for Household Appliances Power Consumption
Dataset: ecoco2/household-appliances-power-consumption
'''

import os
import pandas as pd
import kagglehub
from dotenv import load_dotenv

class KaggleAppliancesAPI:
    def __init__(self):
        """
        Initialize the Kaggle API wrapper for household appliances power consumption data.
        Requires KAGGLE_USERNAME and KAGGLE_KEY environment variables to be set.
        """
        load_dotenv()
        self.dataset_name = "ecoco2/household-appliances-power-consumption"
        self.dataset_path = None
        
        # Verify that Kaggle credentials are set
        self._verify_credentials()
    
    def _verify_credentials(self):
        """
        Verify that Kaggle credentials are properly set
        """
        kaggle_username = os.environ.get("KAGGLE_USERNAME")
        kaggle_key = os.environ.get("KAGGLE_KEY")
        
        if not kaggle_username or not kaggle_key:
            print("Warning: Kaggle credentials not found. Set KAGGLE_USERNAME and KAGGLE_KEY environment variables.")
    
    def get_dataset_path(self):
        """
        Get the path to the dataset files without downloading them
        """
        if self.dataset_path:
            return self.dataset_path
            
        # Just return information about the dataset without downloading
        print(f"Dataset '{self.dataset_name}' would be downloaded using:")
        print(f"kagglehub.dataset_download('{self.dataset_name}')")
        
        return "Dataset path not available (download not performed)"

    def get_appliance_data(self, appliance_name=None, sample_size=5):
        """
        Get power consumption data for a specific appliance or all appliances.
        Returns a sample of the data rather than downloading the full dataset.
        
        :param appliance_name: Name of the appliance to get data for (optional)
        :param sample_size: Number of sample rows to return
        :return: Dictionary with appliance data information
        """
        # Since we don't want to download the actual data, return mock data
        # This mimics what we would do with real data but uses mock data instead
        
        # Define mock data for common appliances
        mock_data = {
            "refrigerator": pd.DataFrame({
                "timestamp": pd.date_range(start="2023-01-01", periods=sample_size, freq="H"),
                "power_consumption": [120, 125, 118, 122, 119],
                "temperature": [4.2, 4.0, 4.1, 4.3, 4.2],
                "door_openings": [2, 0, 1, 3, 2]
            }),
            "dishwasher": pd.DataFrame({
                "timestamp": pd.date_range(start="2023-01-01", periods=sample_size, freq="H"),
                "power_consumption": [1200, 1250, 0, 0, 1300],
                "cycle_stage": ["wash", "rinse", "off", "off", "dry"],
                "water_usage": [3.2, 2.5, 0, 0, 1.0]
            }),
            "washing_machine": pd.DataFrame({
                "timestamp": pd.date_range(start="2023-01-01", periods=sample_size, freq="H"),
                "power_consumption": [500, 1800, 2000, 700, 0],
                "cycle": ["fill", "wash", "spin", "rinse", "off"],
                "load_size": ["medium", "medium", "medium", "medium", "medium"]
            }),
            "oven": pd.DataFrame({
                "timestamp": pd.date_range(start="2023-01-01", periods=sample_size, freq="H"),
                "power_consumption": [0, 2400, 1800, 1900, 0],
                "temperature": [0, 350, 350, 350, 0],
                "door_openings": [0, 1, 0, 2, 1]
            }),
            "air_conditioner": pd.DataFrame({
                "timestamp": pd.date_range(start="2023-01-01", periods=sample_size, freq="H"),
                "power_consumption": [1200, 1250, 0, 1100, 1300],
                "temperature_setting": [72, 72, 78, 74, 72],
                "outside_temp": [85, 87, 80, 83, 88]
            })
        }
        
        # If a specific appliance is requested, return its data
        if appliance_name and appliance_name.lower() in mock_data:
            return {
                "appliance": appliance_name,
                "data": mock_data[appliance_name.lower()].to_dict(orient="records"),
                "sample_size": sample_size,
                "note": "This is mock data simulating the Kaggle dataset structure"
            }
        # Otherwise return data for all appliances
        else:
            all_appliances = {}
            for appliance, data in mock_data.items():
                all_appliances[appliance] = data.head(sample_size).to_dict(orient="records")
            
            return {
                "appliances": list(mock_data.keys()),
                "data": all_appliances,
                "sample_size": sample_size,
                "note": "This is mock data simulating the Kaggle dataset structure"
            }
    
    def get_average_consumption(self, appliance_name=None):
        """
        Get the average power consumption for an appliance or all appliances.
        
        :param appliance_name: Name of the appliance (optional)
        :return: Dictionary with average consumption values
        """
        # Define mock average consumption values
        avg_consumption = {
            "refrigerator": 120.8,
            "dishwasher": 750.0,
            "washing_machine": 1000.0,
            "oven": 1525.0,
            "air_conditioner": 1170.0
        }
        
        if appliance_name and appliance_name.lower() in avg_consumption:
            return {
                "appliance": appliance_name,
                "average_consumption": avg_consumption[appliance_name.lower()],
                "unit": "watts"
            }
        else:
            return {
                "appliances": avg_consumption,
                "unit": "watts"
            }

# Example usage
if __name__ == "__main__":
    kaggle_api = KaggleAppliancesAPI()
    # Print information about the dataset
    path_info = kaggle_api.get_dataset_path()
    print(f"\nDataset path info: {path_info}")
    
    # Get sample data for all appliances
    print("\nSample data for all appliances:")
    all_data = kaggle_api.get_appliance_data()
    print(f"Available appliances: {all_data['appliances']}")
    
    # Get sample data for a specific appliance
    print("\nSample data for refrigerator:")
    fridge_data = kaggle_api.get_appliance_data("refrigerator")
    for record in fridge_data["data"][:2]:  # Print first 2 records only
        print(record)
    
    # Get average consumption
    print("\nAverage consumption for all appliances:")
    avg_data = kaggle_api.get_average_consumption()
    print(avg_data["appliances"]) 