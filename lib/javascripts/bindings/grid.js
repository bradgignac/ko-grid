var Engine, includeFolder, templates;

Engine = require('../templating/engine');
includeFolder = require('include-folder');
templates = includeFolder('lib/templates');

function init(element, value) {
  'use strict';

  ko.renderTemplate(templates.grid, value, {
    templateEngine: new Engine()
  }, element);

  return { controlsDescendantBindings: true };
}

module.exports = { init: init };
