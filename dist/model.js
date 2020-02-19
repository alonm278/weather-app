class TempManager {
  constructor() {
    this.savedCities = [];
    this.currentCity = {}
  }
  async getDataFromDB(savedCities) {
    const cities = await $.get(`/cities`);
    cities.forEach(c => {
      c.saved = true;
      this.savedCities.unshift(c);
    });
  }

  async getCityData(cityData) {
    const input = $(`#input`)
      .val()
      .toLowerCase();
    const city = await $.get(`/city/${input}`);    
    this.currentCity = city;
    this.currentCity.saved = false;
    console.log(this.currentCity);
    
  }

  async saveCity(city) {
    let savePromise = await $.post(`./city`, city);
    city.saved = true;
    this.savedCities.unshift(city)
    console.log(`${savePromise} saved to DB`);
  }

  async removeCity(city, index) {
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
    if (this.savedCities[index].saved){
      updatedCity.saved = true
    } else {
      updatedCity.saved = false
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
  }
}
