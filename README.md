
# Flight Tracker

A web-based flight tracking application that monitors live flights within a specified geographic area. The project leverages the Flightradar24 and AviationStack APIs for fetching live flight data and additional flight details.

## Features

- **Real-Time Flight Tracking**: Displays flights near a specific coordinate with a user-defined bounding box.
- **Flight Details**: Provides detailed information about flights, including departure and arrival airports.
- **Customizable Parameters**: Users can adjust the tracking coordinates, bounding box tolerance, scan rate, and duration.

## Project Structure

- **`index.html`**: Entry point of the web application with a minimal user interface.
- **`styles.css`**: CSS for styling the user interface.
- **`app.js`**: JavaScript file implementing the flight tracking logic.
- **`FlightRadar.py`**: Python script for a command-line version of the flight tracker.

## Prerequisites

- **API Keys**:
  - [AviationStack](https://aviationstack.com/) API key
  - [Flightradar24](https://www.flightradar24.com/) authentication token

- **Python Dependencies** (for `FlightRadar.py`):
  - `python-dotenv`
  - `requests`

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/flight-tracker.git
cd flight-tracker
```

### 2. Set Up API Keys

- Replace `YOUR_AVIATIONSTACK_API_KEY` and `YOUR_FR24_AUTH_TOKEN` in `app.js` with your actual API keys.
- For the Python script, create a `.env` file in the same directory as `FlightRadar.py` with the following content:

  ```plaintext
  AVIATIONSTACK_API_KEY=your_aviationstack_api_key
  FR24_AUTH_TOKEN=your_fr24_auth_token
  ```

### 3. Running the Web Application

1. Open `index.html` in your preferred browser.
2. The application will begin tracking flights based on the specified coordinates.

### 4. Running the Python Script

1. Install required Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

2. Run the script:

   ```bash
   python FlightRadar.py
   ```

## Customization

- **Coordinates and Tolerance**:
  - Update the `coordinates` and `tolerance` in `app.js` or `FlightRadar.py` for your desired area.
- **Scan Rate and Duration**:
  - Modify `scanRate` and `duration` to adjust the flight scanning frequency and total monitoring time.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue for suggestions and bug reports.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [AviationStack API](https://aviationstack.com/)
- [Flightradar24 API](https://www.flightradar24.com/)
