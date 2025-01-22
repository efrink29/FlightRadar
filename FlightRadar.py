
from dotenv import load_dotenv

import requests
import json
import os
import time


# ----- Load environment variables ----- #

# Get sensitive information from environment variables
load_dotenv()
AVIATIONSTACK_API_KEY = os.getenv("AVIATIONSTACK_API_KEY")
FR24_AUTH_TOKEN = os.getenv("FR24_AUTH_TOKEN")

# ------ Define parameters ----- #  ENTER YOUR COORDINATES AND TOLERANCE HERE ----- #

coordinates = 33.420556, -111.933889 # Example Coordinates (latitude, longitude) ASU Tempe Campus
tolerance = 0.025 # Tolerance for the bounding box around the coordinates

# ----- Define scan rate and duration ----- # Enter the scan rate and duration for how long the script should run #

scanRate = 10 # Scan rate in seconds
duration = 60 # Duration in seconds for how long the script should run

# ----- Calculate bounding box ----- #

box_origin = round((coordinates[0] + tolerance),4), round((coordinates[1] - tolerance),4)
box_destination = round((coordinates[0] - tolerance),4), round((coordinates[1] + tolerance),4)

print("Origin: " + str(box_origin) + " Destination: " + str(box_destination))

# ----- Setup the API URL and parameters ----- #
url = "https://fr24api.flightradar24.com/api/live/flight-positions/light"

params = {
  'bounds': f"{box_origin[0]},{box_destination[0]},{box_origin[1]},{box_destination[1]}",
}
headers = {
  'Accept': 'application/json',
  'Accept-Version': 'v1',
  'Authorization': 'Bearer ' + FR24_AUTH_TOKEN
}

# ----- Function to get more details about the flight ----- #

def getMoreDetails(callsign):
    params = {
        'access_key': AVIATIONSTACK_API_KEY,
        'limit': 1,
        'flight_icao': callsign
    }

    api_result = requests.get('https://api.aviationstack.com/v1/flights', params)
    data = api_result.json()
    return data


# ----- Function to get Flights for a period of time ----- #

def get_flights(duration, scanRate):
    while duration > 0:
        duration -= scanRate
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            
            
            if data == []:
                print("No flights found in the specified area.")
            else:
                data = data['data']
                print("Flight found: " + data[0]['callsign'])
                print("Loading more details...")
                more_info = getMoreDetails(str(data[0]['callsign']))
                if more_info['pagination']['total'] == 0:
                    print("No additional details found for this flight.")
                else:
                    more_info = more_info['data'][0]
                    print("Flight from: " + more_info['departure']['airport'] + " to " + more_info['arrival']['airport'] + " is overhead.")
            
            
        except requests.exceptions.HTTPError as http_err:
            print(f"HTTP error occurred: {http_err}")
        except Exception as err:
            print(f"An error occurred: {err}")
        time.sleep(scanRate)

get_flights(duration, scanRate)
