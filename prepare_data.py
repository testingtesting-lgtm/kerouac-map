import requests
import json

MAPBOX_API_KEY = 'pk.eyJ1Ijoic2ltb25yb3Nlbjk5IiwiYSI6ImNtZTh3dDM3NjBmZ2gyd3F1eGxkdWVwNmgifQ.pAxK5NehYbdAnKvLypQ8tw'

# --- DATA FOR ALL JOURNEYS ---
journeys = {
    "journey_1": [ [40.7128, -74.0060], [41.8781, -87.6298], [41.6005, -93.6091], [41.1394, -100.7652], [41.1399, -104.8202], [39.7392, -104.9903], [37.7749, -122.4194] ],
    "journey_2": [ [37.5407, -77.4360], [38.9072, -77.0369], [29.9511, -90.0715], [29.7604, -95.3698], [35.3733, -119.0187], [37.7749, -122.4194] ],
    "journey_3": [ [39.7392, -104.9903], [36.0595, -102.5130], [27.5239, -99.4804], [22.7709, -102.5734], [19.4326, -99.1332] ]
}

def get_mapbox_route(locations, api_key):
    coords_string = ";".join([f"{lon},{lat}" for lat, lon in locations])
    url = f"https://api.mapbox.com/directions/v5/mapbox/driving/{coords_string}"
    params = {'geometries': 'geojson', 'access_token': api_key}
    try:
        response = requests.get(url, params=params)
        response.raise_for_status()
        route_data = response.json()
        if 'routes' in route_data and len(route_data['routes']) > 0:
            return route_data['routes'][0]['geometry']
        return None
    except requests.exceptions.RequestException as e:
        print(f"Error fetching route: {e}")
        return None

def save_geojson(geometry, filename):
    if not geometry: return
    geojson_feature = {"type": "Feature", "properties": {}, "geometry": geometry}
    with open(filename, 'w') as f:
        json.dump(geojson_feature, f)
    print(f"Successfully saved route to {filename}")

# --- MAIN EXECUTION ---
if __name__ == "__main__":
    for name, locations in journeys.items():
        print(f"--- Generating route for {name} ---")
        route_geometry = get_mapbox_route(locations, MAPBOX_API_KEY)
        save_geojson(route_geometry, f"{name}.geojson")