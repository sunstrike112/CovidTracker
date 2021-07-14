import React from 'react';

import OverviewMap from '../../components/OverviewMap';
import OverviewLineChart from '../../components/OverviewLineChart';
import OverviewPieChart from '../../components/OverviewPieChart';
import OverviewCard from '../../components/OverviewCard';
import './Home.scss';

import MainLayout from '../../HOCs/MainLayout';

function Home(props) {
  return (
    <MainLayout>
      <div className="home">
        <OverviewCard />
        <OverviewMap />
        <div className="overviewchart">
          <OverviewLineChart />
          <OverviewPieChart />
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
