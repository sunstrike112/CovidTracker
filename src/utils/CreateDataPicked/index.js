const createDataPicked = (startDate, endDate, cases, deaths, recovered) => {
  let blankArray = [[], [], [], []];
  let [indexDatePicked, casesFiltered, deathsFiltered, recoveredFiltered] =
    blankArray;
  if (startDate !== '' && endDate !== '') {
    indexDatePicked.push(
      cases?.findIndex((element) => element.time == startDate),
      cases?.findIndex((element) => element.time == endDate)
    );
    casesFiltered = cases?.filter(
      (element, index) =>
        index >= indexDatePicked[0] && index <= indexDatePicked[1]
    );
    deathsFiltered = deaths?.filter(
      (element, index) =>
        index >= indexDatePicked[0] && index <= indexDatePicked[1]
    );
    recoveredFiltered = recovered?.filter(
      (element, index) =>
        index >= indexDatePicked[0] && index <= indexDatePicked[1]
    );
  }
  return casesFiltered.concat(deathsFiltered, recoveredFiltered);
};

export { createDataPicked };
