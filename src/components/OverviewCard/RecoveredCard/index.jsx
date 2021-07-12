import React, { useState, useEffect } from 'react';

import { Card, Skeleton } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash';

import { formatNumber } from '../../../utils/FormatNumber/index';

function RecoveredCard(props) {
  const { covidData } = props;
  const [recovered, setRecovered] = useState(0);
  const [todayRecovered, setTodayRecovered] = useState(0);
  const [recoveredPerMillion, setRecoveredPerMillion] = useState(0);

  useEffect(() => {
    setRecovered(formatNumber(covidData.recovered));
    setTodayRecovered(formatNumber(covidData.todayRecovered));
    setRecoveredPerMillion(formatNumber(covidData.recoveredPerOneMillion));
  }, [covidData]);
  console.log(covidData);
  return (
    <Card title="Đã khỏi">
      {!_.isEmpty(covidData) ? (
        <>
          <p>{recovered}</p>
          <p>
            +{todayRecovered} <br></br>
            <span>ca/ngày</span>
          </p>
          <p>
            ~{recoveredPerMillion}
            <span>/1M</span>
          </p>
        </>
      ) : (
        <Skeleton className="cardskeleton" active />
      )}
    </Card>
  );
}

export default RecoveredCard;
