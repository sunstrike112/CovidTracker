import React, { useRef, useState, useEffect } from 'react';

import { Skeleton } from 'antd';
import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import 'mapbox-gl/dist/mapbox-gl.css';

import './OverviewMap.scss';
import { getIso } from '../../utils/GetIso/index';
import { createPopup } from '../../utils/CreatePopup/index';

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
        const map = new mapboxgl.Map({
          container: covidMap.current,
          style: 'mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k',
          center: [110, 15],
          zoom: 3,
        });
        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });
        map.addControl(new mapboxgl.NavigationControl());
        map.once('load', function () {
          map.resize();
          map.addSource('points', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: data,
            },
          });
          map.addLayer({
            id: 'circles',
            source: 'points',
            type: 'circle',
            paint: {
              'circle-opacity': 0.5,
              'circle-stroke-width': [
                'interpolate',
                ['linear'],
                ['get', 'cases'],
                1,
                1,
                1000,
                1.25,
                4000,
                1.5,
                8000,
                1.75,
                12000,
                2,
                100000,
                2.5,
              ],
              'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'cases'],
                1,
                6,
                1000,
                6,
                50000,
                6,
                150000,
                8,
                200000,
                10,
                500000,
                12,
                1000000,
                16,
              ],
              'circle-color': [
                'interpolate',
                ['linear'],
                ['get', 'cases'],
                1,
                '#ffffb2',
                1000,
                '#fed976',
                50000,
                '#feb24c',
                75000,
                '#fd8d3c',
                150000,
                '#fc4e2a',
                200000,
                '#e31a1c',
                500000,
                '#b10026',
                1000000,
                '#36030e',
              ],
            },
          });
          map.on('mousemove', 'circles', (position) => {
            const { cases, deaths, recovered, country, province } =
              position.features[0].properties;
            map.getCanvas().style.cursor = 'pointer';
            const coordinates =
              position.features[0].geometry.coordinates.slice();
            while (Math.abs(position.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] +=
                position.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            popup
              .setLngLat(coordinates)
              .setHTML(
                createPopup(
                  cases,
                  deaths,
                  recovered,
                  country,
                  province,
                  getIso(country)
                )
              )
              .addTo(map);
          });
          map.on('mouseleave', 'circles', function () {
            map.getCanvas().style.cursor = '';
            popup.remove();
          });
        });
      }
      setLoadMap(true);
    }, 3000);
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
