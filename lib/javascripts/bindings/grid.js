var fs = require('fs');

function init(element, value, bindings, model, context) {
  ko.renderTemplate('grid-template', value, {
    templateEngine: new ko.nativeTemplateEngine()
  }, element);

  return { controlsDescendantBindings: true };
}

module.exports = { init: init };
