import React, { useState, useEffect } from 'react';

import { Line } from '@ant-design/charts';
import axios from 'axios';

function OverviewChart(props) {
  const [cases, setCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [recovered, setRecovered] = useState([]);
  let data = cases.concat(deaths, recovered);

  useEffect(() => {
    const handleDataChart = () => {
      axios
        .get(`https://disease.sh/v3/covid-19/historical/all?lastdays=all`)
        .then((response) => {
          setCases(
            Object.entries(response.data.cases).map((element, key) => {
              const arrayElement = element;
              const [time, value, category] = arrayElement;
              const objectElement = { time, value, category };
              objectElement.category = 'cases';
              return objectElement;
            })
          );
          setDeaths(
            Object.entries(response.data.deaths).map((element, key) => {
              const arrayElement = element;
              const [time, value, category] = arrayElement;
              const objectElement = { time, value, category };
              objectElement.category = 'deaths';
              return objectElement;
            })
          );
          setRecovered(
            Object.entries(response.data.recovered).map((element, key) => {
              const arrayElement = element;
              const [time, value, category] = arrayElement;
              const objectElement = { time, value, category };
              objectElement.category = 'recovered';
              return objectElement;
            })
          );
        })
        .catch(() => {
          alert(`Request to API failed, Please try again !!!`);
        });
    };
    handleDataChart();
  }, []);

  const config = {
    data,
    width: 1200,
    height: 400,
    xField: 'time',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat(v).replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
            return ''.concat(s, ',');
          });
        },
      },
    },
    color: ['#1979C9', '#D62A0D', '#33fa19'],
    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 10000,
      },
    },
  };

  return (
    <div className="overviewchart">
      <Line {...config} />;
    </div>
  );
}

export default OverviewChart;
