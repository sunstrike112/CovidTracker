import React, { useState, useEffect } from 'react';

// import { Line } from '@ant-design/charts';
import axios from 'axios';

function OverviewChart(props) {
  const [dataChart, setDataChart] = useState([]);
  let cases = [];

  const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const handleApi = async () => {
      await axios
        .get(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`)
        .then((response) => {
          setDataChart(
            Object.entries(response.data.cases).map((element, key) => {
              const arrayElement = element;
              const [time, cases] = arrayElement;
              const objectElement = { time, cases };
              return objectElement;
            })
          );
        })
        .catch(() => {
          alert(`Request to API failed, Please try again !!!`);
        });
    };
    setTimeout(() => {
      handleApi();
      console.log(dataChart);
    }, 3000);
  }, []);

  return (
    <div>
      <p></p>
    </div>
  );
}

export default OverviewChart;
