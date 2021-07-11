const formatCases = (cases) => {
  return Object.entries(cases).map((element, key) => {
    const arrayElement = element;
    const [time, value, category] = arrayElement;
    const objectElement = { time, value, category };
    objectElement.category = 'Ca nhiễm';
    return objectElement;
  });
};

const formatDeaths = (deaths) => {
  return Object.entries(deaths).map((element, key) => {
    const arrayElement = element;
    const [time, value, category] = arrayElement;
    const objectElement = { time, value, category };
    objectElement.category = 'Tử vong';
    return objectElement;
  });
};

const formatRecovered = (recovered) => {
  return Object.entries(recovered).map((element, key) => {
    const arrayElement = element;
    const [time, value, category] = arrayElement;
    const objectElement = { time, value, category };
    objectElement.category = 'Đã khỏi';
    return objectElement;
  });
};

export { formatCases };
export { formatDeaths };
export { formatRecovered };
