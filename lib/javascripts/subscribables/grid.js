var GridViewModel, column;

GridViewModel = require('./grid_view_model');
column = require('./column');

function defaultColumnsForGrid(observable) {
  'use strict';

  var innerArray = observable.peek();

  if (innerArray.length === 0) {
    return [];
  }

  return Object.keys(innerArray[0]);
}

function grid(observable, columns) {
  'use strict';

  var viewModel, columnNames;

  viewModel = new GridViewModel(observable);

  if (columns) {
    Object.keys(columns).forEach(function (key) {
      viewModel.addColumn(key, columns[key]);
    });
  } else {
    defaultColumnsForGrid(observable).forEach(function (key) {
      viewModel.addColumn(key, column({ header: key }));
    });
  }

  return viewModel;
}

module.exports = grid;
