import React from 'react';

import { Row, Col } from 'antd';

import OverviewMap from '../../components/OverviewMap';
import OverviewLineChart from '../../components/OverviewLineChart';
import OverviewPieChart from '../../components/OverviewPieChart';
import OverviewCard from '../../components/OverviewCard';
import OverviewTable from '../../components/OverviewTable';
import './Home.scss';

import MainLayout from '../../HOCs/MainLayout';

function Home(props) {
  return (
    <MainLayout>
      <Row>
        <Col span={24}>
          <div className="home">
            <OverviewCard />
            <OverviewMap />
            <div className="overviewchart">
              <OverviewLineChart />
              <OverviewPieChart />
            </div>
            <OverviewTable />
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
}

export default Home;
