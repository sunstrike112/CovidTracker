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

export { getIso };
