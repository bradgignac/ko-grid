var GridViewModel = require('./grid_view_model');

function defaultColumnsForGrid(observable) {
  'use strict';

  var innerArray = observable.peek();

  if (innerArray.length === 0) {
    return [];
  }

  return Object.keys(innerArray[0]);
}

function grid(observable, columns, options) {
  'use strict';

  var viewModel, columnNames;

  viewModel = new GridViewModel(observable, options);

  columns.forEach(function (column) {
    viewModel.addColumn(column);
  });

  return viewModel;
}

module.exports = grid;
