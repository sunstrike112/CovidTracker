// import React, { useState, useEffect } from 'react';

// import axios from 'axios';
// import { Row, Col } from 'antd';

// import './News.scss';

// import MainLayout from '../../HOCs/MainLayout';

// function News(props) {
//   const [listNews, setListNews] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     let options = {
//       method: 'GET',
//       url: 'https://covid-19-news.p.rapidapi.com/v1/covid',
//       params: {
//         q: 'covid-19',
//         // lang: 'vn',
//         sort_by: 'date',
//         country: 'vn',
//         page_size: '10',
//         // sources: 'vnexpress.net',
//         // sources: 'genk.vn',
//         // sources: 'kenh14.vn',
//         // sources: 'laodong.vn',
//         sources: 'vtv.vn',
//         media: 'True',
//       },
//       headers: {
//         'x-rapidapi-key': '71b5780ae6msh4ed8d90d8a5d6e3p13d86ejsnb4d5f7e4645a',
//         'x-rapidapi-host': 'covid-19-news.p.rapidapi.com',
//       },
//     };

//     const handleNews = () => {
//       axios
//         .request(options)
//         .then((response) => {
//           setListNews([...listNews, ...response.data.articles]);
//           setTotalPages(listNews?.length);
//           setIsLoading(false);
//         })
//         .catch(() => {
//           alert(`API news request failed`);
//         });
//     };

//     handleNews();
//   }, [page]);

//   console.log(totalPages);
//   console.log(listNews);
//   return (
//     <MainLayout>
//       <div className="news">
//         {listNews.map((element, index) => {
//           return (
//             <div key={index} className="box">
//               <img src={element.media} />
//               <div className="name">{element.title}</div>
//               <div className="email">{element.author}</div>
//             </div>
//           );
//         })}
//       </div>
//       <div>
//         {totalPages !== page && (
//           <button className="btn-load-more" onClick={() => setPage(page + 1)}>
//             {isLoading ? 'Loading...' : 'Load More'}
//           </button>
//         )}
//       </div>
//     </MainLayout>
//   );
// }

// export default News;

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Row, Col } from 'antd';

import './News.scss';

import MainLayout from '../../HOCs/MainLayout';

function News(props) {
  const [listNews, setListNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let options = {
      method: 'GET',
      url: 'https://covid-19-news.p.rapidapi.com/v1/covid',
      params: {
        q: 'covid-19',
        // lang: 'vn',
        sort_by: 'date',
        country: 'vn',
        page_size: '10',
        // sources: 'vnexpress.net',
        // sources: 'genk.vn',
        // sources: 'kenh14.vn',
        // sources: 'laodong.vn',
        sources: 'vtv.vn',
        media: 'True',
      },
      headers: {
        'x-rapidapi-key': '71b5780ae6msh4ed8d90d8a5d6e3p13d86ejsnb4d5f7e4645a',
        'x-rapidapi-host': 'covid-19-news.p.rapidapi.com',
      },
    };

    const handleNews = () => {
      axios
        .request(options)
        .then((response) => {
          setListNews([...listNews, ...response.data.articles]);
          setTotalPages(listNews?.length);
          setIsLoading(false);
        })
        .catch(() => {
          alert(`API news request failed`);
        });
    };

    handleNews();
  }, [page]);

  console.log(totalPages);
  console.log(listNews);
  return (
    <MainLayout>
      <div className="news">
        {listNews.map((element, index) => {
          return (
            <div key={index}>
              <Row className="news__item">
                <Row>
                  <Col xs={24} lg={12}>
                    <img className="news__image" src={element.media} />
                    <div>{element.published_date}</div>
                    <div>{element.title}</div>
                  </Col>
                </Row>
                <Row>
                  <Col className="news__item--small" xs={12} lg={12}>
                    <img className="news__image--small" src={element.media} />
                    <div>{element.published_date}</div>
                    <div className="news__title--short">{element.title}</div>
                  </Col>
                  <Col xs={12} lg={12}>
                    <img className="news__image--small" src={element.media} />
                    <div>{element.published_date}</div>
                    <div className="news__title--short">{element.title}</div>
                  </Col>
                </Row>
              </Row>
            </div>
          );
        })}
      </div>
      <div>
        {totalPages !== page && (
          <button className="btn-load-more" onClick={() => setPage(page + 1)}>
            {isLoading ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </MainLayout>
  );
}

export default News;
