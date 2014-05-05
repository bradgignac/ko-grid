var BaseColumn = require('./base_column');

function StatusColumn(key, options) {
  "use strict";

  return ko.utils.extend(
    new BaseColumn(key, options),
    {
      'checked': ko.observable(false),
      'sortable': false,
      'getKey': function (model) {
        return model[key];
      },
      'bodyTemplate': function () {
        return '<input type="checkbox" data-bind="checked: column.getKey(model)"></input>';
      },
      'headerTemplate': function () {
        return '<input type="checkbox" data-bind="checked: checked, click: checkAll(checked(), $root)"></input>';
      },
      'checkAll': function (checked, viewModel) {
        ko.utils.unwrapObservable(viewModel.observableData)().forEach(function (row) {
          row[key](checked);
        });
      }
    }
  );
}

module.exports = StatusColumn;

