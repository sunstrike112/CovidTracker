import React, { useState, useEffect } from 'react';

import { Card } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

import './OverviewCard.scss';
import { formatNumber } from '../../utils/FormatNumber/index';

function OverviewCard(props) {
  const [cases, setCases] = useState(0);
  const [todayCases, setTodayCases] = useState(0);
  const [casesPerMillion, setCasesPerMillion] = useState(0);

  const [deaths, setDeaths] = useState(0);
  const [todayDeaths, setTodayDeaths] = useState(0);
  const [deathsPerMillion, setDeathsPerMillion] = useState(0);

  const [activeCases, setActiveCases] = useState(0);
  const [activeCasesPerMillion, setActiveCasesPerMillion] = useState(0);
  const [criticalCases, setCriticalCases] = useState(0);

  const [recovered, setRecovered] = useState(0);
  const [todayRecovered, setTodayRecovered] = useState(0);
  const [recoveredPerMillion, setRecoveredPerMillion] = useState(0);

  useEffect(() => {
    const getCovidData = () => {
      axios
        .get(`https://disease.sh/v3/covid-19/all`)
        .then((response) => {
          setCases(formatNumber(response.data.cases));
          setTodayCases(formatNumber(response.data.todayCases));
          setCasesPerMillion(formatNumber(response.data.casesPerOneMillion));

          setDeaths(formatNumber(response.data.deaths));
          setTodayDeaths(formatNumber(response.data.todayDeaths));
          setDeathsPerMillion(formatNumber(response.data.deathsPerOneMillion));

          setActiveCases(formatNumber(response.data.active));
          setActiveCasesPerMillion(
            formatNumber(response.data.activePerOneMillion)
          );
          setCriticalCases(formatNumber(response.data.critical));

          setRecovered(formatNumber(response.data.recovered));
          setTodayRecovered(formatNumber(response.data.todayRecovered));
          setRecoveredPerMillion(
            formatNumber(response.data.recoveredPerOneMillion)
          );
        })
        .catch(() => {
          alert(`Request to API failed, Please try again !!!`);
        });
    };
    getCovidData();
  }, []);

  console.log('wtf');

  return (
    <div className="overviewcard">
      <Card title="Ca mắc">
        <p>{cases}</p>
        <p>
          + {todayCases} <br></br>
          <span>ca/ngày</span>
        </p>
        <p>
          ~ {casesPerMillion}
          <span>/1M</span>
        </p>
      </Card>
      <Card title="Tử vong">
        <p>{deaths}</p>
        <p>
          + {todayDeaths} <br></br>
          <span>ca/ngày</span>
        </p>
        <p>
          ~ {deathsPerMillion}
          <span>/1M</span>
        </p>
      </Card>
      <Card title="Điều trị">
        <p>{activeCases}</p>
        <p>
          {criticalCases}
          <br></br>
          <span>nguy kịch</span>
        </p>
        <p>
          ~ {activeCasesPerMillion}
          <span>/1M</span>
        </p>
      </Card>
      <Card title="Đã khỏi">
        <p>{recovered}</p>
        <p>
          + {todayRecovered} <br></br>
          <span>ca/ngày</span>
        </p>
        <p>
          ~{recoveredPerMillion}
          <span>/1M</span>
        </p>
      </Card>
    </div>
  );
}

export default OverviewCard;
