var sort = require('../util/sort');

function GridViewModel(data) {
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
    innerArray.sort(sort.byProperty.bind(this, this.sortedColumn(), 'ascending'));

    return innerArray;
  }, this);
}

GridViewModel.prototype.addColumn = function (name) {
  this.columns.push({ name: name });
};

GridViewModel.prototype.sortColumn = function (column, e) {
  // Peek to get sorted column - we don't want to trigger re-display unnecessarily.
  // If the column name is the same, toggle the direction.
  // Otherwise, set the colum name and direction, making sure not to trigger two
  //   updates. This could be handled by setting a single sort function instead
  //   of a column name and a direction.
  this.sortedColumn(column.name);
};

module.exports = GridViewModel;
