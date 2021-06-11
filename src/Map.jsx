import { makeStyles } from "@material-ui/core";
import numeral from "numeral";
import React from "react";
import { MapContainer, TileLayer, useMap, Circle, Popup } from "react-leaflet";

const useStyles = makeStyles({
  map: {
    height: "500px",
    backgroundColor: "#ff9991",
    borderRadius: "20px",
    marginTop: "1.2rem",
  },
  flag: {
    height: "80px",
    width: "100%",
    borderRadius: "5px",
    backgroundSize: "cover",
  },
  countryName: {
    fontSize: "20px",
    color: "#b3b3b3",
  },
  numbers: {
    fontSize: "14px",
    color: "#b3b3b3",
  },
});

const casesTypeColors = {
  cases: {
    hex: "#15009e",

    mulitiplier: 800,
  },

  recovered: {
    hex: "#008a30",

    mulitiplier: 1200,
  },

  deaths: {
    hex: "#ff1100",

    mulitiplier: 2000,
  },
};

function Map({ countries, casesType = "cases", center, zoom }) {
  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);

    return null;
  }
  const classes = useStyles();
  return (
    <MapContainer
      casesType={casesType}
      className={classes.map}
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <ChangeView zoom={zoom} center={center} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {countries.map((country) => {
        return (
          <Circle
            center={{
              lat: country.countryInfo.lat,
              lng: country.countryInfo.long,
            }}
            fillOpacity={0.4}
            pathOptions={{
              color: casesTypeColors[casesType].hex,
              fillColor: casesTypeColors[casesType].hex,
            }}
            radius={
              Math.sqrt(country[casesType] / 20) *
              casesTypeColors[casesType].mulitiplier
            }
          >
            <Popup>
              <div>
                <div
                  className={classes.flag}
                  style={{
                    backgroundImage: `url(${country.countryInfo.flag})`,
                  }}
                />
                <div className={classes.countryName}>{country.country}</div>
                <div className={classes.numbers}>
                  Cases:{numeral(country.cases).format("0,0")}
                </div>
                <div className={classes.numbers}>
                  Deaths:{numeral(country.deaths).format("0,0")}
                </div>
                <div className={classes.numbers}>
                  Recovered:{numeral(country.recovered).format("0,0")}
                </div>
              </div>
            </Popup>
          </Circle>
        );
      })}
    </MapContainer>
  );
}

export default Map;
