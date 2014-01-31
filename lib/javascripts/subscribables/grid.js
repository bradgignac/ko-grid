var GridViewModel = require('./grid_view_model');

function defaultColumnsForGrid(observable) {
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

  columnNames = columns ? Object.keys(columns) : defaultColumnsForGrid(observable);
  columnNames.forEach(function (name) {
    viewModel.addColumn(name);
  });

  return viewModel;
}

module.exports = grid;
