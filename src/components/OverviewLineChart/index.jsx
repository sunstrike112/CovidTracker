import React, { useState, useEffect } from 'react';

import { Line } from '@ant-design/charts';
import { DatePicker, Skeleton } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import _ from 'lodash';

import './OverviewLineChart.scss';
import {
  formatCases,
  formatDeaths,
  formatRecovered,
} from '../../utils/FormatData/index';
import { createDataPicked } from '../../utils/CreateDataPicked/index';

function OverviewLineChart(props) {
  const [cases, setCases] = useState([]);
  const [deaths, setDeaths] = useState([]);
  const [recovered, setRecovered] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const { RangePicker } = DatePicker;
  let dataFull = cases.concat(deaths, recovered);
  let dataFiltered = createDataPicked(
    startDate,
    endDate,
    cases,
    deaths,
    recovered
  );
  let dataChart = startDate !== '' ? dataFiltered : dataFull;

  useEffect(() => {
    const getCovidData = () => {
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

    getCovidData();
  }, []);

  const config = {
    data: dataChart,
    xField: 'time',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        formatter: function formatter(v) {
          return ''.concat((v / 1000000).toFixed(0), 'M');
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

  const handleDatePicker = (monent, date) => {
    if (date) {
      setStartDate(date[0].replace(/(^|-)0+/g, '$1').replace(/-/g, '/'));
      setEndDate(date[1].replace(/(^|-)0+/g, '$1').replace(/-/g, '/'));
    }
  };

  return (
    <>
      <div className="overviewlinechart">
        <p>
          Diễn biến dịch covid trên thế giới từ&nbsp;
          {startDate ? startDate : '1/22/20'} đến&nbsp;
          {endDate ? endDate : cases[cases.length - 1]?.time}
        </p>
        <RangePicker
          className="rangepicker"
          format="MM-DD-YY"
          placeholder={[
            '1/22/20',
            endDate ? endDate : cases[cases.length - 1]?.time,
          ]}
          onChange={handleDatePicker}
        />
        {_.isEmpty(recovered) ? (
          <Skeleton className="lineskeleton" paragraph={{ rows: 10 }} active />
        ) : (
          <Line className="linechart" {...config} />
        )}
      </div>
    </>
  );
}

export default OverviewLineChart;
