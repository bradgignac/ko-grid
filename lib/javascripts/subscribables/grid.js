function grid(observable, columns) {
  'use strict';

  var columnArray;

  columnArray = [];
  columns = columns || {};
  Object.keys(columns).forEach(function (key) {
    columnArray.push({ name: key, template: columns[key] });
  });

  return { data: observable, columns: columnArray };
}

module.exports = grid;