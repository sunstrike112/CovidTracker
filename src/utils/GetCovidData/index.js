import axios from 'axios';

const getCovidData = (url) => {
  return new Promise((resolve) => {
    axios
      .get(`${url}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch(() => {
        alert(`Request to API failed, Please try again !!!`);
      });
  });
};

export { getCovidData };
