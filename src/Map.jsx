import React from 'react';
import {Box} from '@material-ui/core';
import {MapContainer ,TileLayer} from 'react-leaflet';

function Map(props) {
    return (
     <Box component="div">
       <MapContainer>
       <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
       </MapContainer>
     </Box>
    );
}

export default Map;