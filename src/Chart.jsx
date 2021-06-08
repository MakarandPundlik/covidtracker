import axios from 'axios';
import React,{useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import numeral from 'numeral';
const options = {
    legend: {
      display: true,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: true,
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
            format: "DD/MM/YY",
            tooltipFormat: "ll",
          },
          scaleLabel: {
            display: true,
            labelString: 'Y text'
          }
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
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

function Chart({caseType="cases"}) {
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

    }, [caseType])
    return (
        <div >
        {data?.length > 0 && ( //empowered by typescript
          <Bar
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