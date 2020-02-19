class Renderer {
    renderSaved(data) {
      const source = $("#savedCity-template").html();
      const template = Handlebars.compile(source);
      const newHTML = template({ data });
      $(`#savedContainer`)
        .empty()
        .append(newHTML);
    }
    renderCurrent(data) {
      const source = $("#currentCity-template").html();
      const template = Handlebars.compile(source);
      const newHTML = template({ data });
      $(`#currentCityContainer`)
        .empty()
        .append(newHTML);
    }
  }