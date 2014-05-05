var GridViewModel = require('./grid_view_model');
var TextColumn = require('./columns/text_column');

function defaultColumnsForGrid(observable) {
  'use strict';

  var innerArray, keysArray, columnsArray;

  innerArray = ko.utils.unwrapObservable(observable || [] );

  if (innerArray.length === 0) {
    return [];
  }

  columnsArray = [];
  keysArray = Object.keys(innerArray[0]);
  for (var i=0; i < keysArray.length; i++) {
    columnsArray.push(
      TextColumn.create(keysArray[i], {})
    );
  }

  return columnsArray;
}

function grid(observable, columns, options) {
  'use strict';

  var viewModel;

  viewModel = new GridViewModel(observable, options);

  if (!columns) {
    columns = defaultColumnsForGrid(observable);
  }

  columns.forEach(function (column) {
    viewModel.addColumn(column);
  });

  return viewModel;
}

module.exports = grid;
