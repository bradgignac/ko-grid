var sort = require('../util/sort');

function GridViewModel(data) {
  'use strict';

  data = data || [];

  this.columns = [];
  this.sortedColumn = ko.observable();
  this.sortedDirection = ko.observable();

  this.observableData = ko.observable(data);

  this.data = ko.computed(function () {
    var innerArray;

    // TODO: Make sure this triggers knockout change tracking. I don't think
    //   this is tracking changes to values inside the array. Perhaps we need to
    //   subscribe to each observable value inside of the array.

    innerArray = ko.utils.unwrapObservable(this.observableData());
    innerArray.sort(sort.byProperty.bind(this, this.sortedColumn(), this.sortedDirection()));

    return innerArray;
  }, this);
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
    this.observableData().sort(column.sortFunction);
  } else {
    newDirection ='rs-table-sort-asc';
    this.observableData().sort(this.reverseSortFunction(column.sortFunction));
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
