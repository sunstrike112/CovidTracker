import React, { useRef, useState, useEffect } from 'react';

import mapboxgl from 'mapbox-gl';
import useSWR from 'swr';
import lookup from 'country-code-lookup';
import 'mapbox-gl/dist/mapbox-gl.css';

import './OverviewMap.scss';
import axios from 'axios';

mapboxgl.accessToken = `pk.eyJ1Ijoic3Vuc3RyaWtlMTEyIiwiYSI6ImNrcXV4OTY2djA2bDIydXBjNHZobTBtbzMifQ.BYCyLBgyOMbG7eycxXX_6A`;

function OverviewMap() {
  const mapboxElRef = useRef(null);

  const fetcher = (url) =>
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
  const { data } = useSWR('https://disease.sh/v3/covid-19/jhucsse', fetcher);

  useEffect(() => {
    if (data) {
      const map = new mapboxgl.Map({
        container: mapboxElRef.current,
        style: 'mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k',
        center: [110, 15],
        zoom: 3,
      });

      map.addControl(new mapboxgl.NavigationControl());

      map.once('load', function () {
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
            'circle-opacity': 0.9,
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
              6,
              6,
              5000,
              6,
              10000,
              6,
              25000,
              6,
              75000,
              6,
              100000,
              6,
            ],
            'circle-color': [
              'interpolate',
              ['linear'],
              ['get', 'cases'],
              1,
              '#ffffb2',
              5000,
              '#fed976',
              10000,
              '#feb24c',
              25000,
              '#fd8d3c',
              50000,
              '#fc4e2a',
              75000,
              '#e31a1c',
              100000,
              '#b10026',
            ],
          },
        });

        const popup = new mapboxgl.Popup({
          closeButton: false,
          closeOnClick: false,
        });

        let lastId;

        map.on('mousemove', 'circles', (e) => {
          const id = e.features[0].properties.id;
          if (id !== lastId) {
            lastId = id;
            const { cases, deaths, recovered, country, province } =
              e.features[0].properties;
            map.getCanvas().style.cursor = 'pointer';
            const coordinates = e.features[0].geometry.coordinates.slice();
            let countryISO =
              lookup.byCountry(country)?.iso2.toLowerCase() ||
              lookup.byInternet(country)?.iso2.toLowerCase();
            if (country == 'Burma') countryISO = 'mm';
            if (country == 'Korea, South') countryISO = 'kr';
            if (country == 'Taiwan*') countryISO = 'tw';
            if (
              country == 'Congo (Brazzaville)' ||
              country == 'Congo (Kinshasa)'
            )
              countryISO = 'cg';
            const provinceHTML =
              province !== 'null' ? `<p>Province: <b>${province}</b></p>` : '';
            const countryFlagHTML = Boolean(countryISO)
              ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
              : '';
            const popUp = `
              <p>Country: <b>${country}</b></p>
              ${provinceHTML}
              <p>Cases: <b>${cases}</b></p>
              <p>Deaths: <b>${deaths}</b></p>
              <p>Recovered: <b>${recovered}</b></p>
              ${countryFlagHTML}`;

            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup.setLngLat(coordinates).setHTML(popUp).addTo(map);
          }
        });

        map.on('mouseleave', 'circles', function () {
          lastId = undefined;
          map.getCanvas().style.cursor = '';
          popup.remove();
        });
      });
    }
  }, [data]);

  return (
    <div className="overviewMap">
      <div className="mapContainer">
        <div className="mapBox" ref={mapboxElRef} />
      </div>
    </div>
  );
}

export default OverviewMap;
