import React, { useState, useEffect } from 'react';

import { Card, Skeleton } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash';

import { formatNumber } from '../../../utils/FormatNumber/index';

function DeathsCard(props) {
  const { covidData } = props;
  const [deaths, setDeaths] = useState(0);
  const [todayDeaths, setTodayDeaths] = useState(0);
  const [deathsPerMillion, setDeathsPerMillion] = useState(0);

  useEffect(() => {
    setDeaths(formatNumber(covidData.deaths));
    setTodayDeaths(formatNumber(covidData.todayDeaths));
    setDeathsPerMillion(formatNumber(covidData.deathsPerOneMillion));
  }, [covidData]);

  return (
    <Card title="Tử vong">
      {!_.isEmpty(covidData) ? (
        <>
          <p>{deaths}</p>
          <p>
            +{todayDeaths} <br></br>
            <span>ca/ngày</span>
          </p>
          <p>
            ~ {deathsPerMillion}
            <span>/1M</span>
          </p>
        </>
      ) : (
        <Skeleton className="cardskeleton" active />
      )}
    </Card>
  );
}

export default DeathsCard;
