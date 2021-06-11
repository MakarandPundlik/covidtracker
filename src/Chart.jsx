import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import numeral from 'numeral';
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const casesTypeColors = {
  cases: {
    hex: "#15009e"

 
  },

  recovered: {
    hex: "#008a30"

  ,
  },

  deaths: {
    hex: "#ff1100"

 
  },
};


function Chart({casesType}) {
    // https://disease.sh/v3/covid-19/historical?lastdays=120
    const [data,setData] = useState({});

    const buildChartData = (data,casesType) =>{
    
        const chartData = [];
        
        let lastDataPoint ;
       for(let date in data.cases){
            if(lastDataPoint)
            {
                const newDataPoint = {
                        x:date,
                        y:data[casesType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[casesType][date];
        }
        return chartData;
    }
    useEffect(() => {
        const getHistoricalData=async()=>{
            await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((res)=>{
                
               const chartData = buildChartData(res.data,casesType);
                setData(chartData);
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        getHistoricalData();

    }, [casesType])
    return (
      <div >
      {data?.length > 0 && (
        <Bar
          data={{
            datasets: [
              {
                backgroundColor: casesTypeColors[casesType].hex,
                borderColor: casesTypeColors[casesType].hex,
                data: data,
                label:""
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
       
    )}

export default Chart;