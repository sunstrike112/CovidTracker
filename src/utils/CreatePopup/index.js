import { formatNumber } from '../FormatNumber';

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

export { createPopup };
