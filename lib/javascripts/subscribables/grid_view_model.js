function GridViewModel(data, options) {
  'use strict';

  data = data || [];

  this.sortCssAscending_ = options['ascending-sort-css'] || 'ascending';
  this.sortCssDescending_ = options['descending-sort-css'] || 'descending';

  this.columns = [];
  this.sortedColumn = ko.observable();
  this.sortedDirection = ko.observable();

  this.observableData = ko.observable(data);

  this.data = ko.computed(function () {
    var innerArray;

    innerArray = ko.utils.unwrapObservable(this.observableData());
    innerArray.sort(sort.byProperty.bind(this, this.sortedColumn(), this.sortedDirection()));

    return innerArray;
  }, this);
}

GridViewModel.prototype.setData = function (data) {
  'use strict';

  this.observableData(data);
};

GridViewModel.prototype.addColumn = function (column) {
  'use strict';

  this.columns.push(column);
};

GridViewModel.prototype.getColumns = function () {
  'use strict';

  return this.columns;
};

GridViewModel.prototype.sort = function (column) {
  'use strict';

  var newDirection;

  if (!column.sortable) {
    return;
  }

  if (column.sortState() === this.sortCssAscending_) {
    newDirection = this.sortCssDescending_;
    this.observableData().sort(column.sortFunction);
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
  'use strict';

  return function (a, b) { return sortFunction(b, a); };
};

module.exports = GridViewModel;
