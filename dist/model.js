class TempManager {
  constructor() {
    this.savedCities = [];
    this.currentCity = {};
  }
  async getDataFromDB(savedCities) {
    const cities = await $.get(`/cities`);
    cities.forEach(c => {
      c.saved = true;
      this.savedCities.unshift(c);
    });
  }

  async getCityData(cityData) {
    const input = $(`#input`).val();
    let city = await $.get(`/city/${input}`);
    let name = city.name;
    if (this.savedCities.find(c => c.name == name)) {
      const index = this.savedCities.findIndex(c => c.name == name);
      this.currentCity = this.savedCities[index];
    } else {
      this.currentCity = city;
      this.currentCity.saved = false;
    }
  }

  async saveCity(city) {
    city.saved = true;
    let savePromise = await $.post(`./city`, city);
    this.savedCities.unshift(city);
    console.log(`${savePromise} saved to DB`);
  }

  async removeCity(city, index) {
    this.currentCity.saved = false;
    await $.ajax({
      url: `/city/${city}`,
      type: "DELETE",
      success: function() {
        console.log(`deleted ${city}`);
      }
    });
    this.savedCities.splice(index, 1);
  }

  async updateCity(city, index) {
    const updatedCity = await $.get(`/city/${city.name}`);
    if (this.currentCity.saved) {
      updatedCity.saved = true;
    } else {
      updatedCity.saved = false;
    }
    await $.ajax({
      url: `/city`,
      type: "PUT",
      data: updatedCity,
      success: () => {
        console.log(`updated ${city.name}`);
      },
      error: function(err) {
        console.log(err);
      }
    });
    this.savedCities.splice(index, 1, updatedCity);
    this.currentCity = updatedCity;
  }
}
