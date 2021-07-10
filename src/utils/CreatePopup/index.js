const createPopup = (
  cases,
  deaths,
  recovered,
  country,
  province,
  countryISO
) => {
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
      ${countryFlagHTML}
    `;
  return popUp;
};

export { createPopup };
