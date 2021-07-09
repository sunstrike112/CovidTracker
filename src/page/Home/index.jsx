import React from 'react';

import OverviewMap from '../../components/OverviewMap';
import OverviewChart from '../../components/OverviewChart';
import './Home.scss';

function Home(props) {
  return (
    <div className="home">
      <OverviewMap />
      <OverviewChart />
    </div>
  );
}

export default Home;
