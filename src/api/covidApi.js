import { axiosCovid } from './axiosClient';
const covidApi = {
  async getAllCountry() {
    const data = await axiosCovid.get('/countries');
    return data;
  },
  async getCountry(country, time) {
    const data = await axiosCovid.get(`/historical/${country}`, {
      params: {
        lastdays: time,
      },
    });
    return data;
  },
  async getGlobalSummary() {
    const data = await axiosCovid.get(`/all`);
    return data;
  },
  async getHistoricalGlobal(time) {
    const data = await axiosCovid.get(`/historical/all`, {
      params: {
        lastdays: time,
      },
    });
    return data;
  },
};
export default covidApi;
