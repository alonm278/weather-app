class weatherManager {
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
      success: function(result) {
        console.log(`deleted ${city}`);
      }
    });
    this.cityData.splice(index, 1)
  }
}
