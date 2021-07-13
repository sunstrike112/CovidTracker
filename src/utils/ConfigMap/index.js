import mapboxgl from 'mapbox-gl';

import { formatNumber } from '../FormatNumber';

const configMap = (map, popup, data) => {
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
      const coordinates = position.features[0].geometry.coordinates.slice();
      while (Math.abs(position.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += position.lngLat.lng > coordinates[0] ? 360 : -360;
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
  return map;
};

const declareMap = (map) => {
  const mapInitial = new mapboxgl.Map({
    container: map.current,
    style: 'mapbox://styles/notalemesa/ck8dqwdum09ju1ioj65e3ql3k',
    center: [110, 15],
    zoom: 3,
  });
  return mapInitial;
};

const declarePopup = () => {
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
  });
  return popup;
};

const createPopup = (
  cases,
  deaths,
  recovered,
  country,
  province,
  countryISO
) => {
  const provinceHTML =
    province !== 'null' ? `<p>Tỉnh/Bang: <b>${province}</b></p>` : '';
  const countryFlagHTML = Boolean(countryISO)
    ? `<img src="https://www.countryflags.io/${countryISO}/flat/64.png"></img>`
    : '';
  const popUp = `
      <p>Quốc gia: <b>${country}</b></p>
      ${provinceHTML}
      <p>Nhiếm bệnh: <b>${formatNumber(cases)}</b></p>
      <p>Tử vong: <b>${formatNumber(deaths)}</b></p>
      <p>Đã khỏi: <b>${formatNumber(recovered)}</b></p>
      ${countryFlagHTML}
    `;
  return popUp;
};

import lookup from 'country-code-lookup';

const getIso = (country) => {
  let countryISO =
    lookup.byCountry(country)?.iso2.toLowerCase() ||
    lookup.byInternet(country)?.iso2.toLowerCase();
  if (country == 'Burma') countryISO = 'mm';
  if (country == 'Korea, South') countryISO = 'kr';
  if (country == 'Taiwan*') countryISO = 'tw';
  if (country == 'Congo (Brazzaville)' || country == 'Congo (Kinshasa)')
    countryISO = 'cg';
  if (country == 'Micronesia') countryISO = 'fm';
  return countryISO;
};

export { configMap, declareMap, declarePopup };
