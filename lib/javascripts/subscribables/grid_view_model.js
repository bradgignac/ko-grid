var sort = require('../util/sort');

function GridViewModel(data) {
  'use strict';

  data = data || [];

  this.columns = [];
  this.sortedColumn = ko.observable();
  this.sortedDirection = ko.observable();

  this.data = ko.computed(function () {
    var innerArray;

    // TODO: Make sure this triggers knockout change tracking. I don't think
    //   this is tracking changes to values inside the array. Perhaps we need to
    //   subscribe to each observable value inside of the array.
    innerArray = ko.utils.unwrapObservable(data);
    innerArray.sort(sort.byProperty.bind(this, this.sortedColumn(), this.sortedDirection()));

    return innerArray;
  }, this);
}

GridViewModel.prototype.addColumn = function (name) {
  'use strict';

  // this.columns.push(
  //   GridColumnBuilder(name)
  // );

  this.columns.push({ getTemplate: function(data) { return data; }, name: name });
};

GridViewModel.prototype.sortColumn = function (column) {
  'use strict';

  var currentColumn, currentDirection, nextColumn;

  currentColumn = this.sortedColumn.peek();
  currentDirection = this.sortedDirection.peek();
  nextColumn = column.name;

  if (currentColumn === nextColumn) {
    this.sortedDirection(currentDirection === 'ascending' ? 'descending' : 'ascending');
  } else {
    this.sortedColumn(nextColumn);
    this.sortedDirection('ascending');
  }
};

module.exports = GridViewModel;
