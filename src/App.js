import React, { useState, useEffect } from "react";
import "./App.css";
import {
  CssBaseline,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import InfoBox from "./InfoBox";

const useStyles = makeStyles({
  app_header: {
    display: "flex",
    marginBottom: "20px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  app_stats:{
    display:"flex",
    justifyContent:"space-between"
  }
});

function App() {
  const classes = useStyles();
  //for list
  const [countries, setCountries] = useState([]);
  //for selecting value
  const [country, setCountry] = useState("global");

  //run only when whole page is mounted
  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));

          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);


  //set specific country on select value change
  const handleCountryChange=(e)=>{
    const country = e.target.value;
    console.log(country);
    setCountry(country)
  }
  return (
    <>
      <CssBaseline />
      <div className={classes.app_header}>
        <h1>Covid-19 Tracker</h1>
        <FormControl className="app_dropdown">
          <Select value={country} variant="outlined" onChange={(e)=>handleCountryChange(e)}>
            <MenuItem value="global">Global</MenuItem>
            {countries.map((country, key) => {
              return (
                <MenuItem value={country.value} key={key}>
                  {country.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
      <div className={classes.app_stats}>
        <InfoBox 
        cases={231}
        total={12}
        title="Coronavirun Cases"
        />
          <InfoBox
          cases={231}x 
        total={12}
        title="Recovered"
        />
          <InfoBox
          cases={231}x 
        total={12}
        title="Deaths"
        />
      </div>
    </>
  );
}

export default App;
