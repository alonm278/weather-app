let renderer = new Renderer();
let manager = new TempManager();

$(`#submit`).on(`click`, async function() {
  await manager.getCityData();
  $(`#input`).val("");
  renderer.renderCurrent(manager.currentCity);
});

$(window).on(`load`, async function() {
  await manager.getDataFromDB();
  renderer.renderSaved(manager.savedCities);
});

$(`#currentCityContainer`).on(`click`, `.save`, async function() {
  const name = $(this)
    .closest(".currentCity")
    .data().name;
  await manager.saveCity(manager.currentCity);
  renderer.renderSaved(manager.savedCities);
});

$(`#savedContainer`).on(`click`, `.delete`, async function() {
  const name = $(this)
    .closest(".savedCity")
    .data().name;
  const index = manager.savedCities.findIndex(c => c.name == name);
  await manager.removeCity(name, index);
  renderer.renderSaved(manager.savedCities);
});

$(`#savedContainer`).on(`click`, `.refresh`, async function() {
  const name = $(this)
    .closest(".savedCity")
    .data().name;
  const index = manager.savedCities.findIndex(c => c.name == name);
  await manager.updateCity(manager.savedCities[index], index);
  renderer.renderSaved(manager.savedCities);
});

$(`#savedContainer`).on(`click`, `.savedCity`, function() {
  $(`.savedCity`).css("background-color", "rgba(180, 180, 180, 0.2");
  $(this).css("background-color", "rgba(180, 180, 180, 0.5)");
});