var BaseColumn;

BaseColumn = require('./base_column');

function StatusColumn(key, options) {
  return ko.utils.extend(
    BaseColumn(key, options),
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
        var checked;

        ko.utils.unwrapObservable(viewModel['observableData'])().forEach(function (row) {
          row[key](checked);
        });
      }
    }
  );
};

module.exports = StatusColumn;

