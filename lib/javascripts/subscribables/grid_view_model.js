var sort = require('../util/sort');

function GridViewModel(data) {
  'use strict';

  data = data || [];

  this.columns = [];
  this.sortedColumn = ko.observable();
  this.sortedDirection = ko.observable();

  this.observableData = ko.observable();
  this.setData(data);
}

GridViewModel.prototype.setData = function (data) {
  this.observableData(data);
};

GridViewModel.prototype.addColumn = function (column) {
  'use strict';

  this.initializeColumn(column);
  this.columns.push(column);
};

GridViewModel.prototype.initializeColumn = function (column) {
  column.sortState = ko.observable('');
};

GridViewModel.prototype.sort = function (column) {
  'use strict';

  var newDirection;

  if (!column.sortable) {
    return;
  }

  if (column.sortState() === 'rs-table-sort-asc') {
    newDirection = 'rs-table-sort-desc';
    this.observableData().sort(this.reverseSortFunction(column.sortFunction));
  } else {
    newDirection ='rs-table-sort-asc';
    this.observableData().sort(column.sortFunction);
  }

  for (var i = 0; i < this.columns.length; i++) {
    this.columns[i].sortState('');
  }

  column.sortState(newDirection);
};

GridViewModel.prototype.reverseSortFunction = function (sortFunction) {
  return function (a, b) { return sortFunction(b, a)};
};

module.exports = GridViewModel;
