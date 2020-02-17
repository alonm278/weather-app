class weatherManager {
  constructor() {
    this.cityData = [];
  }
  getDataFromDB = () => {
    $.get(`/cities`, function(response) {});
  };

  async getCityData(cityData) {
    let input = $(`#input`)
      .val()
      .toLowerCase();
      this.cityData.push(await $.get(`/city/${input}`))
  };

  saveCity = () => {
    $.post(`/city`);
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
