import React, { useRef, useState, useEffect } from 'react';

import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import 'mapbox-gl/dist/mapbox-gl.css';

import { help } from '../../utils/help';
import './OverviewMap.scss';

mapboxgl.accessToken = `pk.eyJ1Ijoic3Vuc3RyaWtlMTEyIiwiYSI6ImNrcXV4OTY2djA2bDIydXBjNHZobTBtbzMifQ.BYCyLBgyOMbG7eycxXX_6A`;

function OverviewMap() {
  const covidMap = useRef(null);
  const [map, setMap] = useState(null);

  const { data } = useSWR(
    'https://disease.sh/v3/covid-19/jhucsse',
    help.getDataMap
  );

  useEffect(() => {
    if (data && covidMap.current && !map) {
      const overviewMap = help.declareMap(covidMap);
      setMap(covidMap);
      const popup = help.declarePopup();
      help.configMap(overviewMap, popup, data);
    }
  }, [data, covidMap, map]);
  console.log(covidMap);

  return (
    <div className="container">
      <div className="overviewmap">
        <div ref={covidMap}></div>
      </div>
    </div>
  );
}

export default OverviewMap;
