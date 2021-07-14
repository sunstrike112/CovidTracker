import React from 'react';

import OverviewMap from '../../components/OverviewMap';
import OverviewLineChart from '../../components/OverviewLineChart';
import OverviewCard from '../../components/OverviewCard';
import './Home.scss';

import MainLayout from '../../HOCs/MainLayout';

function Home(props) {
  return (
    <MainLayout>
      <div className="home">
        <OverviewCard />
        <OverviewMap />
        <OverviewLineChart />
      </div>
    </MainLayout>
  );
}

export default Home;
