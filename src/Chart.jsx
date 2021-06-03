import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';
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

function Chart(props) {
    // https://disease.sh/v3/covid-19/historical?lastdays=120
    const [data,setData] = useState({});

    const buildChartData = (data,caseType = "cases") =>{
        const chartData = [];
        let lastDataPoint ;
       for(let date in data.cases){
            if(lastDataPoint)
            {
                const newDataPoint = {
                        x:date,
                        y:data[caseType][date] - lastDataPoint
                }
                chartData.push(newDataPoint);
            }
            lastDataPoint = data[caseType][date];
        }
        return chartData;
    }
    useEffect(() => {
        const getHistoricalData=async()=>{
            await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
            .then((res)=>{
                
               const chartData = buildChartData(res.data,"cases");
                setData(chartData);
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        getHistoricalData();

    }, [])
    return (
        <div className={props.className}>
        {data.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: "rgba(204, 16, 52, 0.5)",
                  borderColor: "#CC1034",
                  data: data,
                },
              ],
            }}
            options={options}
          />
        )}
      </div>
    );
}

export default Chart;