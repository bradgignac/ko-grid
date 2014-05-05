var grid = require('../../lib/javascripts/subscribables/grid');
var baseColumn = require('../../lib/javascripts/subscribables/columns/base_column');
var GridViewModel = require('../../lib/javascripts/subscribables/grid_view_model');
var TextColumn = require('../../lib/javascripts/subscribables/columns/text_column');

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

  describe('columns from observable', function () {
    var fakeTextColumn;

    beforeEach(function () {
      array = ko.observableArray([{ 'name': 'foo', 'age': 10 }]);

      fakeTextColumn = new TextColumn('anykey', {});

      spyOn(TextColumn, 'create').andReturn(fakeTextColumn);

      spyOn(GridViewModel.prototype, 'addColumn');

      viewModel = grid(array);
    });

    it('gets created for each columns', function () {
      expect(TextColumn.create).toHaveBeenCalledWith('name', {});
      expect(TextColumn.create).toHaveBeenCalledWith('age', {});

      expect(viewModel.addColumn.calls[0].args[0]).toEqual(fakeTextColumn);
      expect(viewModel.addColumn.calls[1].args[0]).toEqual(fakeTextColumn);
    });
  });
});
