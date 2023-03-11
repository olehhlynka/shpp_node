function citiesDataParser(citiesData) {
  const parsedCitiesData = citiesData
    .split(/(?:\n)/)
    .filter((row) => row && !row.startsWith("#"))
    .map((city) => {
      const cityData = city.split(",");
      return {
        x: cityData[0],
        y: cityData[1],
        name: cityData[2],
        population: cityData[3],
      };
    })
    .sort((a, b) => b.population - a.population)
    .slice(0, 10)
    .reduce(
      (compoundCitiesData, currentCity, currentIndex) => {
        compoundCitiesData[currentCity.name] = {
          population: currentCity.population,
          rating: currentIndex + 1,
        };
        return compoundCitiesData;
      },
      {}
    );
  return (text) => {
    const citiesRegexp = new RegExp(
      `(${Object.keys(parsedCitiesData).join("|")})`,
      "g"
    );
    return text.replace(
      citiesRegexp,
      (match) =>
        `${match} (${parsedCitiesData[match].rating} місце в ТОП-10 ` +
        `найбільших міст України, наслення ${parsedCitiesData[match].population} людей)`
    );
  };
}
