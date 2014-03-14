var sort = require('../util/sort');

function GridViewModel(data, options) {
  'use strict';

  data = data || [];

  this.sortCssAscending_ = options['ascending-sort-css'] || 'ascending';
  this.sortCssDescending_ = options['descending-sort-css'] || 'descending';

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

  this.columns.push(column);
};

GridViewModel.prototype.sort = function (column) {
  'use strict';

  var newDirection;

  if (!column.sortable) {
    return;
  }

  if (column.sortState() === this.sortCssAscending_) {
    newDirection = this.sortCssDescending_;
    this.observableData().sort(this.reverseSortFunction(column.sortFunction));
  } else {
    newDirection = this.sortCssAscending_;
    this.observableData().sort(column.sortFunction);
  }

  for (var i = 0; i < this.columns.length; i++) {
    this.columns[i].sortState('');
  }

  column.sortState(newDirection);
};

GridViewModel.prototype.reverseSortFunction = function (sortFunction) {
  return function (a, b) { return sortFunction(b, a) };
};

module.exports = GridViewModel;
