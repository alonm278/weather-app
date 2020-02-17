let renderer = new Renderer();
let manager = new weatherManager();

$(`#submit`).on(`click`, async function() {
    await manager.getCityData()
    $(`#input`).val('')
    console.log(manager.cityData);
    
    renderer.render(manager.cityData)
});
