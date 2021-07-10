import React, { useState, useLayoutEffect, useEffect } from 'react';

import { Line, Column } from '@ant-design/charts';
import axios from 'axios';

import './OverviewChart.scss';
import {
  formatCases,
  formatDeaths,
  formatRecovered,
} from '../../utils/FormatData/index';

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
          setCases(formatCases(response.data.cases));
          setDeaths(formatDeaths(response.data.deaths));
          setRecovered(formatRecovered(response.data.recovered));
        })
        .catch(() => {
          alert(`Request to API failed, Please try again !!!`);
        });
    };
    handleDataChart();
  }, []);

  const config = {
    data,
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
        duration: 1000,
      },
    },
  };

  return (
    <div className="overviewchart">
      <h2>World overview chart</h2>
      <Line {...config} />;
    </div>
  );
}

export default OverviewChart;
