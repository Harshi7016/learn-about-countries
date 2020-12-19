import React, { useEffect, useState } from "react";
import "./styles.css";
//import restDB from "./db/restCountries.json";

//const countryData = restDB;

export default function App() {
  const [regions, setRegions] = useState("Asia");
  const [countryData, setCountryData] = useState([]);
  const [continentRegion, setContinentRegion] = useState([]);
  useEffect(() => {
    async function getCountries() {
      const response = await fetch("https://restcountries.eu/rest/v2/all");
      const body = await response.json();
      setCountryData(body);
      setContinentRegion([
        ...new Set(body.map((continent) => continent.region))
      ]);
    }

    getCountries();
  }, []);

  const regionSelector = (region) => {
    setRegions(region);
  };
  return (
    <div className="App">
      <header className="header">Know Your Country</header>
      <div className="container">
        {console.log(continentRegion)}
        <ul className="list-region">
          {continentRegion
            .filter((elem) => elem !== "Polar" && elem.length > 0)
            .map((elem) => (
              <li className="list-region-inline" key={elem}>
                <div
                  className="region-button"
                  onClick={() => regionSelector(elem)}
                >
                  {" "}
                  <span> {elem}</span>
                </div>
              </li>
            ))}
        </ul>
        <br />

        <div className="country-list">
          {countryData
            .filter((elem) => elem.region === regions)
            .slice(0, 12)
            .map(({ name, capital, flag, subregion, population }) => (
              <div key={flag}>
                <div className="country-flag-card">
                  <img className="country-flag-image" src={flag} alt={flag} />
                  <div className="country-details">
                    <span className="country-name">{name}</span>
                    <div>
                      {" "}
                      <span>Capital: </span>{" "}
                      <span className="country-subheading">{capital}</span>
                    </div>
                    <div>
                      {" "}
                      <span>Sub Region: </span>{" "}
                      <span className="country-subheading">{subregion}</span>
                    </div>
                    <div>
                      {" "}
                      <span>Population: </span>{" "}
                      <span className="country-subheading">{population}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <footer className="footer">
        Made with ❤ by Harshith Venkatesh
        <div class="sm-footer">
          <a
            href="https://www.instagram.com/harshith_bing/"
            rel="noreferrer"
            target="_blank"
          >
            <i class="fab fa-instagram"></i>
          </a>
          <a
            href="https://twitter.com/Harshith_V007"
            rel="noreferrer"
            target="_blank"
          >
            <i class="fab fa-twitter"></i>
          </a>
          <a href="https://github.com/harshi7016">
            <i class="fab fa-github"></i>
          </a>

          <a
            href="https://medium.com/@harshithvenkatesh"
            rel="noreferrer"
            target="_blank"
          >
            <i class="fab fa-medium"></i>
          </a>

          <a
            href="https://www.linkedin.com/in/harshithv7016/"
            rel="noreferrer"
            target="_blank"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </footer>
    </div>
  );
}
