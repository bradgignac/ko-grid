var Engine, includeFolder, templates;

Engine = require('../../templating/engine');
includeFolder = require('include-folder');
templates = includeFolder('lib/templates');

function StatusColumn(key, options) {
  var columnOptions;

  options = options || {};

  if(!key) {
    throw new Error('Please specify a valid data-bind key!')
  }

  columnOptions = {
    'checked': ko.observable(false),
    'sortable': false,
    'class': options['class'],
    'bodyTemplate': function () {
      return '<input type="checkbox" data-bind="checked: model.' + key + '"></input>';
    },
    'headerTemplate': function () {
      return '<input type="checkbox" data-bind="checked: checked, click: checkAll(checked(), $root)"></input>';
    },
    'checkAll': function (checked, viewModel) {
      var checked;

      viewModel['data']().forEach(function (row) {
        row[key](checked);
      });
    }
  };

  return columnOptions;
};

module.exports = StatusColumn;
