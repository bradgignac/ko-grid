var Engine, includeFolder, templates;

Engine = require('../../templating/engine');
includeFolder = require('include-folder');
templates = includeFolder('lib/templates');

function TextColumn(key, options) {
  var sortFunction

  options = options || {};

  if(!key) {
    throw new Error('Please specify a valid data-bind key!')
  }

  sortFunction = function (a, b) {
    if (a === b) {
      return 0;
    } else if (a < b) {
      return -1;
    }
    return 1;
  }

  return {
    'class': options['class'],
    'sortable': options['sortable'] || false,
    'sortFunction': options['sortable'] ? sortFunction : undefined,
    'bodyTemplate': function () {
      return options['template'] || '<span data-bind="text: model.' + key + '"></span>';
    },
    'headerTemplate': function () {
      return options['headerTemplate'] || '<span>' + (options['header'] || '') + '</span>';
    }
  };
};

module.exports = TextColumn;
