import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'animate.css';
import Time from "./components/Time";
import Weather from "./components/Weather";
import "./App.css";

// Popular countries list
const countries = {
  "United States": { city: "New York", timezone: "America/New_York" },
  "United Kingdom": { city: "London", timezone: "Europe/London" },
  Japan: { city: "Tokyo", timezone: "Asia/Tokyo" },
  France: { city: "Paris", timezone: "Europe/Paris" },
  Germany: { city: "Berlin", timezone: "Europe/Berlin" },
  India: { city: "New Delhi", timezone: "Asia/Kolkata" },
  China: { city: "Beijing", timezone: "Asia/Shanghai" },
  Brazil: { city: "São Paulo", timezone: "America/Sao_Paulo" },
  Mexico: { city: "Mexico City", timezone: "America/Mexico_City" },
  Canada: { city: "Toronto", timezone: "America/Toronto" },
  Australia: { city: "Sydney", timezone: "Australia/Sydney" },
  Russia: { city: "Moscow", timezone: "Europe/Moscow" },
  Spain: { city: "Madrid", timezone: "Europe/Madrid" },
  Italy: { city: "Rome", timezone: "Europe/Rome" },
  Korea: { city: "Seoul", timezone: "Asia/Seoul" },
  Thailand: { city: "Bangkok", timezone: "Asia/Bangkok" },
  Dubai: { city: "Dubai", timezone: "Asia/Dubai" },
  Singapore: { city: "Singapore", timezone: "Asia/Singapore" },
  Turkey: { city: "Istanbul", timezone: "Europe/Istanbul" },
  Egypt: { city: "Cairo", timezone: "Africa/Cairo" },
  Gaza: { city: "Gaza", timezone: "Asia/Gaza" },
};

const API_KEY = "";

function App() {
  const deviceTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherType, setWeatherType] = useState("clear");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
  const matchedCountry = Object.keys(countries).find(
    (country) => countries[country].timezone === deviceTimezone
  );

  if (matchedCountry) {
    setSelectedCountry(matchedCountry);
  }
}, [deviceTimezone]);

  const currentTimezone = selectedCountry
    ? countries[selectedCountry].timezone
    : deviceTimezone;

  const currentCity = selectedCountry
    ? countries[selectedCountry].city
    : "Gaza";




  // Filter countries based on search term
  const filteredCountries = Object.keys(countries).filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Apply weather class to document body
  useEffect(() => {
    document.body.className = `weather-${weatherType}`;
    return () => {
      document.body.className = "";
    };
  }, [weatherType]);


  return (
    <div className={`app`}>

      <div className="overlay"></div>

      <div className="content">

      <div className="search-container">
        <div className="custom-select">
          <input
            type="text"
            placeholder="Search country..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            className="search-input"
          />

          {isOpen && filteredCountries.length > 0 && (
            <ul className="dropdown-list">
              {filteredCountries.map((country) => (
                <li
                  key={country}
                  onClick={() => {
                    setSelectedCountry(country);
                    setSearchTerm(country);
                    setIsOpen(false);
                  }}
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>


        <div className="clock-weather-container">
          <Container>
            <Row className="g-4">
              <Col lg={6} md={6} sm={12}>
                <div className="timezone-card card equal-card">
                  <p>{selectedCountry || currentCity }</p>
                  <small>{currentTimezone}</small>
                </div>
              </Col>

              <Col lg={6} md={6} sm={12}>
                <div className="time-card card equal-card">
                  <Time timezone={currentTimezone} />
                </div>
              </Col>

              <Col lg={12}>
                <div className="weather-card-large">
                  <Weather
                    city={currentCity}
                    API_KEY={API_KEY}
                    onWeatherChange={setWeatherType}
                  />
                </div>
              </Col>
            </Row>
          </Container>

        </div>
      </div>
    </div>
  );
}

export default App;
