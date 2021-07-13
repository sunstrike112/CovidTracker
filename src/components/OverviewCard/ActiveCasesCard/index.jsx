import React, { useState, useEffect } from 'react';

import { Card, Skeleton } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash';

import { formatNumber } from '../../../utils/FormatNumber/index';

function ActiveCasesCard(props) {
  const { covidData } = props;
  const [activeCases, setActiveCases] = useState(0);
  const [activeCasesPerMillion, setActiveCasesPerMillion] = useState(0);
  const [criticalCases, setCriticalCases] = useState(0);

  useEffect(() => {
    setActiveCases(formatNumber(covidData.active));
    setActiveCasesPerMillion(formatNumber(covidData.activePerOneMillion));
    setCriticalCases(formatNumber(covidData.critical));
  }, [covidData]);

  return (
    <Card title="Điều trị">
      {!_.isEmpty(covidData) ? (
        <>
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
        </>
      ) : (
        <Skeleton className="cardskeleton" active />
      )}
    </Card>
  );
}

export default ActiveCasesCard;
