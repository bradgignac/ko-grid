var Engine, includeFolder, templates;

Engine = require('../templating/engine');
includeFolder = require('include-folder');
templates = includeFolder('lib/templates');

function TextColumn(key, options) {
  var template, headerTemplate, columnOptions;

  options = options || {};

  if(!key) {
    throw new Error('Please specify a valid data-bind key!')
  }

  template = options['template'] || '<span data-bind="text: model.' + key + '"></span>';
  headerTemplate = options['headerTemplate'] || '<span>' + (options['header'] || '') + '</span>';

  columnOptions = {
    'class': options['class'],
    'bodyTemplate': function () { return template; },
    'headerTemplate': function () { return headerTemplate; }
  };

  return columnOptions;
};

function SelectColumn(options) {
  var columnOptions;

  options = options || {};

  columnOptions = {
    'checked': ko.observable(false),
    'class': options['class'],
    'bodyTemplate': function () { return '<input type="checkbox" data-bind="checked: model.checked"></input>'; },
    'headerTemplate': function () { return '<input type="checkbox" data-bind="checked: checked, click: checkAll(checked(), $root)"></input>'; },
    'checkAll': function (checked, viewModel) {
      var checked;

      viewModel['data']().forEach(function (row) {
        row['checked'](checked);
      });
    }
  };

  return columnOptions;
};


module.exports = {
  'TextColumn': TextColumn,
  'SelectColumn': SelectColumn
};
