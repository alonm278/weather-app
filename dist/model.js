class TempManager {
  constructor() {
    this.cityData = [];
  }
  async getDataFromDB(cityData) {
    const cities = await $.get(`/cities`);
    cities.forEach(c => {
      c.saved = true;
      this.cityData.unshift(c);
    });
  }

  async getCityData(cityData) {
    const input = $(`#input`)
      .val()
      .toLowerCase();
    const city = await $.get(`/city/${input}`);
    this.cityData.unshift(city);
    this.cityData[0].saved = false;
  }

  async saveCity(city, index) {
    this.cityData[index].saved = true;
    let savePromise = await $.post(`./city`, city);
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
    this.cityData.splice(index, 1);
  }

  async updateCity(city, index) {
    const updatedCity = await $.get(`/city/${city.name}`);
    if (this.cityData[index].saved){
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
    this.cityData.splice(index, 1, updatedCity);
  }
}
