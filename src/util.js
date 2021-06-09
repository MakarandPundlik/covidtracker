import { Circle, Popup,Marker } from "leaflet";

export const sortData=(data)=>{
    const sortedData = [...data];

    sortedData.sort((a,b)=>{
        if(a.cases>=b.cases)
        return -1;
        return 1;
    });

    return sortedData;
}

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
export const showDataOnMap=(data,casesType="cases")=>{
    data.map(country=>{
    console.log(country);
       return(
        <Marker 
        
        position={{lat:country.countryInfo.lat, lng:country.countryInfo.long }}>
        <Circle
        center={[country.countryInfo.lat, country.countryInfo.long]}
        fillOpacity={0.4}
        pathOptions={{
          color: casesTypeColors["cases"].hex,
          fillColor: casesTypeColors["cases"].hex,
        }}
        radius={
          Math.sqrt(country["cases"] / 10) *
          casesTypeColors["cases"].mulitiplier
        }
      >
        </Circle>
        </Marker>
       )
    })
}