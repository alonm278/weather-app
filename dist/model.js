class weatherManager {
  constructor() {
    this.cityData = [];
  }
  async getDataFromDB(cityData) {
    let cities = await $.get(`/cities`);
    cities.forEach(c => {
      this.cityData.push(c);
    });
  }

  async getCityData(cityData) {
    let input = $(`#input`)
      .val()
      .toLowerCase();
    this.cityData.push(await $.get(`/city/${input}`));
  }

  async saveCity () {
    await $.post(`/city`);
  };

  removeCity = cityName => {
    $.ajax({
      url: `/city/${cityName}`,
      type: "DELETE",
      success: function(result) {
        console.log(`deleted ${cityName}`);
      }
    });
  };
}
