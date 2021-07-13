import React, { useState, useEffect } from 'react';

import { Card, Skeleton } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash';
import numeral from 'numeral';

function CasesCard(props) {
  const { covidData } = props;
  const [cases, setCases] = useState(0);
  const [todayCases, setTodayCases] = useState(0);
  const [casesPerMillion, setCasesPerMillion] = useState(0);

  useEffect(() => {
    setCases(numeral(covidData.cases).format('0.0a'));
    setTodayCases(numeral(covidData.todayCases).format('0.0a'));
    setCasesPerMillion(numeral(covidData.casesPerOneMillion).format('0.0a'));
  }, [covidData]);

  return (
    <Card title="Số ca">
      {!_.isEmpty(covidData) ? (
        <>
          <p>{cases}</p>
          <p>
            +{todayCases} <br></br>
            <span>ca/ngày</span>
          </p>
          <p>
            ~ {casesPerMillion}
            <span>/1M</span>
          </p>
        </>
      ) : (
        <Skeleton className="cardskeleton" active />
      )}
    </Card>
  );
}

export default CasesCard;
