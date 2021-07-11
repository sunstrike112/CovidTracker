import React from 'react';

import OverviewMap from '../../components/OverviewMap';
import OverviewLineChart from '../../components/OverviewLineChart';
import './Home.scss';

function Home(props) {
  return (
    <div className="home">
      <OverviewMap />
      <OverviewLineChart />
    </div>
  );
}

export default Home;
