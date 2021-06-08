import React, { useState, useEffect } from "react";
import axios from "axios";
import {sortData }from './util';
import "./App.css";
import {
  CssBaseline,
  FormControl,
  Select,
  MenuItem,
  makeStyles,
  Card,
  CardContent,
  Grid,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from "./Table";
import Chart from './Chart';
import "leaflet/dist/leaflet.css";

const useStyles = makeStyles({
  app: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "20px",
  },
  app_header: {
    display: "flex",
    marginBottom: "20px",
    justifyContent: "space-between",
    alignItems: "center",
  },
  app_stats: {
    display: "flex",
    justifyContent: "space-between",
  },
  app_left: {
    margin: "2rem",
  },
  app_right: {
    margin: "2rem",
  },
});

function App() {
  const classes = useStyles();


  //for list
  const [countries, setCountries] = useState([]);
  //for selecting value
  const [country, setCountry] = useState("worldwide");
  //for particular country
  const [countryInfo, setCountryInfo] = useState({});
  //for table on right div
  const [tableData,setTableData] = useState([]);



  //set url to global
  useEffect(()=>{
    const getGlobalData=async()=>{
      await axios.get("https://disease.sh/v3/covid-19/all")
    .then((res)=>{
      setCountryInfo(res.data);
    })
    .catch((err)=>{
      console.log(err);
    })
    }
    getGlobalData();
  },[])



  //run only when whole page is mounted
  useEffect(() => {
    const getCountriesData = async () => {
      await axios
        .get("https://disease.sh/v3/covid-19/countries")
        .then((res) => {
          const countries = res.data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          
          setTableData(sortData(res.data));
         
          setCountries(countries);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCountriesData();
  }, []);



  //set specific country on select value change
  const handleCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log(country);
    setCountry(countryCode);

    //link for particular contry
    //https://disease.sh/v3/covid-19/countries/strict=fasle

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await axios
      .get(url)
      .then((res) => {
        setCountryInfo(res.data);
      
      })
      .catch((err) => {
        console.log(err);
      });
   
  };


  return (
    <div className={classes.app}>
      <CssBaseline />
      <Grid container>
        <Grid item md={12} xs={12} sm={12} xl={12} lg={8}>
          <div className={classes.app_left}>
            <div className={classes.app_header}>
              <h1>Covid-19 Tracker</h1>
              <FormControl className="app_dropdown">
                <Select
                  value={country}
                  variant="outlined"
                  onChange={(e) => handleCountryChange(e)}
                >
                  <MenuItem value="worldwide">Global</MenuItem>
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
              <InfoBox total={countryInfo.cases} cases={countryInfo.todayCases} title="Coronavirun Cases" />
              <InfoBox total={countryInfo.recovered}  cases={countryInfo.todayRecovered} title="Recovered" />
              <InfoBox total={countryInfo.deaths}  cases={countryInfo.todayDeaths} title="Deaths" />
            </div>

            {/* map  */}
            <Map />
          </div>
        </Grid>
        <Grid item md={12} xs={12} sm={12} xl={4} lg={4}>
          <Card className={classes.app_right}>
            <CardContent style={{alignItems:"center"}}>
              <h3> Cases by country</h3>
              <Table countries={tableData}/>
              <h3>Global Statistics</h3>
              <Chart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
