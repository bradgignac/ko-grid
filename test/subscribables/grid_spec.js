var grid, column;

grid = require('../../lib/javascripts/subscribables/grid');
column = require('../../lib/javascripts/subscribables/column');

describe('grid', function () {
  var array, viewModel;

  it('creates GridViewModel with observable', function () {
    array = ko.observableArray();
    viewModel = grid(array);

    expect(viewModel.data()).toBe(array());
  });

  it('creates GridViewModel with provided columns', function () {
    array = ko.observableArray();
    viewModel = grid(array, {
      'name': column({ header: 'Name' }),
      'count': column({ header: 'Count' })
    });

    expect(viewModel.columns).toEqual([
      { key: 'name', column: { header: 'Name' } },
      { key: 'count', column: { header: 'Count' } }
    ]);
  });

  it('creates GridViewModel with default columns', function () {
    array = ko.observableArray();
    array.push({ name: 'one', count: 1 });
    array.push({ name: 'two', count: 2 });

    viewModel = grid(array);

    expect(viewModel.columns).toEqual([
      { key: 'name', column: { header: 'name' } },
      { key: 'count', column: { header: 'count' } }
    ]);
  });
});
