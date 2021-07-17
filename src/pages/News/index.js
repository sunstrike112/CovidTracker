import React from 'react';

import axios from 'axios';
import { Row, Col } from 'antd';

import './News.scss';

import MainLayout from '../../HOCs/MainLayout';

function News(props) {
  let options = {
    method: 'GET',
    url: 'https://covid-19-news.p.rapidapi.com/v1/covid',
    params: {
      q: 'covid',
      lang: 'en',
      sort_by: 'date',
      country: 'vn',
      page_size: '100',
      sources: 'vnexpress.net',
      media: 'True',
    },
    headers: {
      'x-rapidapi-key': '71b5780ae6msh4ed8d90d8a5d6e3p13d86ejsnb4d5f7e4645a',
      'x-rapidapi-host': 'covid-19-news.p.rapidapi.com',
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <MainLayout>
      <div className="news"></div>
    </MainLayout>
  );
}

export default News;
