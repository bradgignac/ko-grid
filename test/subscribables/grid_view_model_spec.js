var GridViewModel = require('../../lib/javascripts/subscribables/grid_view_model');
var BaseColumn = require('../../lib/javascripts/subscribables/columns/base_column');

describe('GridViewModel', function () {
  var viewModel, observableArray;

  beforeEach(function () {
    observableArray = ko.observableArray(['foo', 'bar', 'fun']);
    viewModel = new GridViewModel(observableArray);
  });

  it('sets data source', function () {
    expect(viewModel.data()).toBe(observableArray());
  });

  describe('#addColumn', function () {
    var newColumn;

    beforeEach(function () {
      newColumn = new BaseColumn('key', { sortable: true });
      viewModel = new GridViewModel();
      viewModel.addColumn(newColumn);
    });

    it('adds a column to column array', function () {
      expect(viewModel.getColumns()[0]).toEqual(newColumn);
    });

    it('sorts data', function () {

    });
  });
});
