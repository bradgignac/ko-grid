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

  sortFunction = function (model1, model2) {
    var key1, key2;

    key1 = ko.utils.unwrapObservable(model1[key]);
    key2 = ko.utils.unwrapObservable(model2[key]);

    if (key1 === key2) {
      return 0;
    } else if (key1 < key2) {
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
