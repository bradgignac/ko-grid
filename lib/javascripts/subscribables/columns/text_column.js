var Engine, includeFolder, templates;

Engine = require('../../templating/engine');
includeFolder = require('include-folder');
templates = includeFolder('lib/templates');

function TextColumn(key, options) {

  options = options || {};

  if(!key) {
    throw new Error('Please specify a valid data-bind key!')
  }

  return {
    'class': options['class'],
    'bodyTemplate': function () {
      return options['template'] || '<span data-bind="text: model.' + key + '"></span>';
    },
    'headerTemplate': function () {
      return options['headerTemplate'] || '<span>' + (options['header'] || '') + '</span>';
    }
  };
};

module.exports = TextColumn;
