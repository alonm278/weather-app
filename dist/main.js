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

// $(`#container`).on(`click`, `.save`, async function(){
//     await
// })