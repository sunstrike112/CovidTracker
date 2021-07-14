import React, { useRef, useState, useEffect } from 'react';

import { Skeleton } from 'antd';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import 'mapbox-gl/dist/mapbox-gl.css';

import './OverviewMap.scss';
import {
  configMap,
  declareMap,
  declarePopup,
} from '../../utils/ConfigMap/index';

mapboxgl.accessToken = `pk.eyJ1Ijoic3Vuc3RyaWtlMTEyIiwiYSI6ImNrcXV4OTY2djA2bDIydXBjNHZobTBtbzMifQ.BYCyLBgyOMbG7eycxXX_6A`;

function OverviewMap() {
  const covidMap = useRef(null);
  const [loadMap, setLoadMap] = useState(false);
  const getDataMap = (url) =>
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        data.map((point, index) => ({
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              point.coordinates.longitude,
              point.coordinates.latitude,
            ],
          },
          properties: {
            id: index,
            country: point.country,
            province: point.province,
            cases: point.stats.confirmed,
            deaths: point.stats.deaths,
            recovered: point.stats.recovered,
          },
        }))
      );

  const { data } = useSWR('https://disease.sh/v3/covid-19/jhucsse', getDataMap);

  useEffect(() => {
    setTimeout(() => {
      if (data) {
        const map = declareMap(covidMap);
        const popup = declarePopup();
        configMap(map, popup, data);
      }
      setLoadMap(true);
    }, 2000);
  }, [data]);

  return (
    <div className="container">
      {loadMap == false ? (
        <Skeleton className="mapskeleton" paragraph={{ rows: 18 }} active />
      ) : (
        <div className="overviewmap">
          <div ref={covidMap}></div>
        </div>
      )}
    </div>
  );
}

export default OverviewMap;
