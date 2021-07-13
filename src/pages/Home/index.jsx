import React from 'react';

import OverviewMap from '../../components/OverviewMap';
import OverviewLineChart from '../../components/OverviewLineChart';
import OverviewCard from '../../components/OverviewCard';
import './Home.scss';

function Home(props) {
  return (
    <div className="home">
      <OverviewCard />
      <OverviewMap />
      <OverviewLineChart />
    </div>
  );
}

export default Home;
