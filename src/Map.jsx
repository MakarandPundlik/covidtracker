import { makeStyles } from "@material-ui/core";
import React from "react";
import { MapContainer, TileLayer,useMap,Circle } from "react-leaflet";
import { showDataOnMap } from "./util";
const useStyles = makeStyles({
  map:{
    height:"500px",
    backgroundColor:"#ff9991",
    borderRadius:"20px",
    padding:"2rem",
    margin:"2rem"
  }
})

const casesTypeColors = {
  cases: {
    hex: "#CC1034",
    // rgb: "rgb(204,16,52)",
    // half_op: "rgba(204,16,52,0.5)",
    mulitiplier: 800,
  },

  recovered: {
    hex: "#7DD71D",
    // rgb: "rgb(125,215,29)",
    // half_op: "rgba(125,215,29,0.5)",
    mulitiplier: 1200,
  },

  deaths: {
    hex: "#C0C0C0",
    // rgb: "rgb(251,68,67)",
    // half_op: "rgba(251,68,67,0.5)",
    mulitiplier: 2000,
  },
};

function Map({ countries, casesType="cases", center, zoom }) {

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
    <ChangeView zoom={zoom} center={center}/>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
   
    
    {
      countries.map((country)=>{
      return(  <Circle
        center={{lat:country.countryInfo.lat,lng: country.countryInfo.long}}
        fillOpacity={0.4}
        pathOptions={{
          color: "#CC1034",
          fillColor: "#CC1034"
        }}
        radius={
          Math.sqrt(country[casesType] / 20) *
        casesTypeColors[casesType].mulitiplier
        }
      >
        </Circle>)
      })
    }
      
    </MapContainer>
  );
}

export default Map;
