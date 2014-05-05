var grid = require('../../lib/javascripts/subscribables/grid');
var baseColumn = require('../../lib/javascripts/subscribables/columns/base_column');
var GridViewModel = require('../../lib/javascripts/subscribables/grid_view_model');

describe('grid', function () {
  var array, viewModel, columns;

  beforeEach(function () {
    column1 = new baseColumn('key1', {});
    column2 = new baseColumn('key2', {});
    columns = [column1, column2];
  });

  it('creates GridViewModel with observable', function () {
    array = ko.observableArray();

    spyOn(GridViewModel.prototype, 'addColumn');

   viewModel = grid(array, columns);

    expect(viewModel.data()).toBe(array());
    expect(viewModel.addColumn).toHaveBeenCalledWith(column1);
    expect(viewModel.addColumn).toHaveBeenCalledWith(column2);
  });
});
