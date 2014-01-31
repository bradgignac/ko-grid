var sort = require('../util/sort');

function GridViewModel(data) {
  this.data = data;
  this.columns = [];
}

GridViewModel.prototype.addColumn = function (name) {
  this.columns.push({ name: name });
};

GridViewModel.prototype.sortColumn = function (column, e) {
  this.data.sort(sort.byProperty.bind(this, column.name, 'ascending'));
};

module.exports = GridViewModel;
