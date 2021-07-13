import { formatNumber } from '../FormatNumber';

const formatCases = (cases) => {
  return Object.entries(cases).map((element, key) => {
    const [time, value, category] = element;
    const objectElement = { time, value, category };
    objectElement.category = 'Số ca nhiễm';
    formatNumber(objectElement.value);
    return objectElement;
  });
};

const formatDeaths = (deaths) => {
  return Object.entries(deaths).map((element, key) => {
    const [time, value, category] = element;
    const objectElement = { time, value, category };
    objectElement.category = 'Tử vong';
    formatNumber(objectElement.value);
    return objectElement;
  });
};

const formatRecovered = (recovered) => {
  return Object.entries(recovered).map((element, key) => {
    const [time, value, category] = element;
    const objectElement = { time, value, category };
    objectElement.category = 'Đã khỏi';
    formatNumber(objectElement.value);
    return objectElement;
  });
};

export { formatCases };
export { formatDeaths };
export { formatRecovered };
