// ----- API Keys ----- //
const AVIATIONSTACK_API_KEY = "YOUR_AVIATIONSTACK_API_KEY";
const FR24_AUTH_TOKEN = "YOUR_FR24_AUTH_TOKEN";

// ----- Parameters ----- //
const coordinates = { latitude: 33.420556, longitude: -111.933889 }; // Example Coordinates (ASU Tempe Campus)
const tolerance = 0.025;
const scanRate = 10 * 1000; // in milliseconds
const duration = 60 * 1000; // in milliseconds

// ----- Calculate Bounding Box ----- //
const boxOrigin = {
    latitude: (coordinates.latitude + tolerance).toFixed(4),
    longitude: (coordinates.longitude - tolerance).toFixed(4),
};
const boxDestination = {
    latitude: (coordinates.latitude - tolerance).toFixed(4),
    longitude: (coordinates.longitude + tolerance).toFixed(4),
};

// ----- API URLs ----- //
const FR24_URL = "https://fr24api.flightradar24.com/api/live/flight-positions/light";
const AVIATIONSTACK_URL = "https://api.aviationstack.com/v1/flights";

// ----- Helper Functions ----- //
const getMoreDetails = async (callsign) => {
    try {
        const response = await fetch(
            `${AVIATIONSTACK_URL}?access_key=${AVIATIONSTACK_API_KEY}&limit=1&flight_icao=${callsign}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching flight details:", error);
        return null;
    }
};

const getFlights = async () => {
    const outputElement = document.getElementById("output");
    const bounds = `${boxOrigin.latitude},${boxDestination.latitude},${boxOrigin.longitude},${boxDestination.longitude}`;

    const headers = {
        Accept: "application/json",
        "Accept-Version": "v1",
        Authorization: `Bearer ${FR24_AUTH_TOKEN}`,
    };

    let remainingTime = duration;

    while (remainingTime > 0) {
        try {
            const response = await fetch(`${FR24_URL}?bounds=${bounds}`, { headers });
            const data = await response.json();

            if (!data.data || data.data.length === 0) {
                outputElement.innerHTML += `<p>No flights found in the specified area.</p>`;
            } else {
                const flight = data.data[0];
                const callsign = flight.callsign;
                outputElement.innerHTML += `<p>Flight found: ${callsign}</p>`;
                outputElement.innerHTML += `<p>Loading more details...</p>`;

                const moreDetails = await getMoreDetails(callsign);

                if (!moreDetails || !moreDetails.pagination || moreDetails.pagination.total === 0) {
                    outputElement.innerHTML += `<p>No additional details found for flight ${callsign}.</p>`;
                } else {
                    const flightDetails = moreDetails.data[0];
                    const departure = flightDetails.departure.airport;
                    const arrival = flightDetails.arrival.airport;
                    outputElement.innerHTML += `<p>Flight from ${departure} to ${arrival} is overhead.</p>`;
                }
            }
        } catch (error) {
            outputElement.innerHTML += `<p>Error occurred: ${error.message}</p>`;
        }

        remainingTime -= scanRate;
        await new Promise((resolve) => setTimeout(resolve, scanRate));
    }
};

// ----- Start Tracking ----- //
document.addEventListener("DOMContentLoaded", () => {
    getFlights();
});
