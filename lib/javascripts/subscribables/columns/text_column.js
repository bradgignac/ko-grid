var BaseColumn;

BaseColumn = require('./base_column');

function TextColumn(key, options) {
  "use strict";

  var sortable;

  sortable = (options.sortable === undefined) ? true : options.sortable;

  return ko.utils.extend(
    BaseColumn.create(key, options),
    {
      'getValue': function (model) {
        return ko.utils.unwrapObservable(model[key]);
      },
      'sortable': sortable,
      'bodyTemplate': function () {
        return options.template || '<span data-bind="text: column.getValue(model)"></span>';
      }
    }
  );
}

module.exports = TextColumn;
