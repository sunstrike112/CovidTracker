import React, { useState, useEffect } from 'react';

import { Skeleton } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

import './OverviewCard.scss';
import CasesCard from './CasesCard';
import DeathsCard from './DeathsCard';
import ActiveCasesCard from './ActiveCasesCard';
import RecoveredCard from './RecoveredCard';

function OverviewCard(props) {
  const [covidData, setCovidData] = useState({});

  useEffect(() => {
    const getCovidData = () => {
      return new Promise((resolve) => {
        axios
          .get(`https://disease.sh/v3/covid-19/all`)
          .then((response) => {
            resolve(response.data);
          })
          .catch(() => {
            alert(`Request to API failed, Please try again !!!`);
          });
      });
    };
    const handleCovidData = async () => {
      setCovidData(await getCovidData());
    };
    handleCovidData();
  }, []);

  console.log(covidData);

  return (
    <>
      <div className="overviewcard">
        <CasesCard covidData={covidData} />
        <DeathsCard covidData={covidData} />
        <ActiveCasesCard covidData={covidData} />
        <RecoveredCard covidData={covidData} />
      </div>
    </>
  );
}

export default OverviewCard;
