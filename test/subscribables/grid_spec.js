var grid = require('../../lib/javascripts/subscribables/grid');

describe('grid', function () {
  var array, viewModel;

  it('creates GridViewModel with observable', function () {
    array = ko.observableArray();
    viewModel = grid(array);

    expect(viewModel.data).toBe(array);
  });

  it('creates GridViewModel with provided columns', function () {
    array = ko.observableArray();
    viewModel = grid(array, {
      'name': 'text',
      'count': 'text'
    });

    expect(viewModel.columns).toEqual([
      { name: 'name' },
      { name: 'count' }
    ]);
  });

  it('creates GridViewModel with default columns', function () {
    array = ko.observableArray();
    array.push({ name: 'one', count: 1 });
    array.push({ name: 'two', count: 2 });

    viewModel = grid(array);

    expect(viewModel.columns).toEqual([
      { name: 'name' },
      { name: 'count' }
    ]);
  });
});
