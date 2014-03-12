var Engine, includeFolder, templates;

Engine = require('../templating/engine');
includeFolder = require('include-folder');
templates = includeFolder('lib/templates');

function column(options) {
  'use strict';

  if (!options['name']) {
    options['name'] = '';
  }

  if (!options['headerTemplate']) {
    options['headerTemplate'] = function () { return '<span>' + options['name'] + ' </span>'; };
  }

  return options;
};


module.exports = column;
