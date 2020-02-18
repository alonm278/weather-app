let renderer = new Renderer();
let manager = new weatherManager();

$(`#submit`).on(`click`, async function() {
    await manager.getCityData()
    $(`#input`).val('')    
    renderer.render(manager.cityData)
});

$(window).on(`load`, async function(){
    await manager.getDataFromDB()
    renderer.render(manager.cityData)
})

$(`#container`).on(`click`, `.save`, async function(){
    const name = $(this).closest('.city').data().name
    const index = manager.cityData.findIndex(c => c.name == name)
    await manager.saveCity(manager.cityData[index], index)
    renderer.render(manager.cityData)
})

$(`#container`).on(`click`, `.delete`, async function(){
    const name = $(this).closest('.city').data().name
    const index = manager.cityData.findIndex(c => c.name == name)
    await manager.removeCity(name, index)
    renderer.render(manager.cityData)
})