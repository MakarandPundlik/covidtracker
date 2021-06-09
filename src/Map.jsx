import { makeStyles } from "@material-ui/core";
import React from "react";
import { MapContainer, TileLayer,useMap,Marker,Circle } from "react-leaflet";
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
function Map({ countries, casesType, center, zoom }) {

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
      {showDataOnMap(countries,casesType)}
      <Marker 
        
        position={{lat:34.8074,lng: -40.4796,}}>
        <Circle
        center={{lat:34.8074,lng: -40,}}
        fillOpacity={0.4}
        pathOptions={{
          color: "#CC1034",
          fillColor: "#CC1034"
        }}
        radius={
          Math.sqrt(535453 / 10) *
          1000
        }
      >
        </Circle>
        </Marker>
    </MapContainer>
  );
}

export default Map;
