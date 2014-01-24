function init(element, value) {
  'use strict';

  ko.renderTemplate('grid-template', value, {
    templateEngine: new ko.nativeTemplateEngine()
  }, element);

  return { controlsDescendantBindings: true };
}

module.exports = { init: init };
