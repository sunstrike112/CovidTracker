const formatCases = (cases) => {
  return Object.entries(cases).map((element, key) => {
    const arrayElement = element;
    const [time, value, category] = arrayElement;
    const objectElement = { time, value, category };
    objectElement.category = 'cases';
    return objectElement;
  });
};

const formatDeaths = (deaths) => {
  return Object.entries(deaths).map((element, key) => {
    const arrayElement = element;
    const [time, value, category] = arrayElement;
    const objectElement = { time, value, category };
    objectElement.category = 'deaths';
    return objectElement;
  });
};

const formatRecovered = (recovered) => {
  return Object.entries(recovered).map((element, key) => {
    const arrayElement = element;
    const [time, value, category] = arrayElement;
    const objectElement = { time, value, category };
    objectElement.category = 'recovered';
    return objectElement;
  });
};

export { formatCases };
export { formatDeaths };
export { formatRecovered };
