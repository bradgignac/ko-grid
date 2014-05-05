var GridViewModel = require('../../lib/javascripts/subscribables/grid_view_model');
var BaseColumn = require('../../lib/javascripts/subscribables/columns/base_column');

describe('GridViewModel', function () {
  var viewModel, observableArray;

  beforeEach(function () {
    observableArray = ko.observableArray([{ 'name' : 'foo' }, { 'name' : 'bar' }, { 'name' : 'fun' }]);
    viewModel = new GridViewModel(observableArray);
  });

  it('sets data source', function () {
    expect(viewModel.data()).toEqual([{ 'name' : 'foo' }, { 'name' : 'bar' }, { 'name' : 'fun' }]);
  });

  describe('#addColumn', function () {
    var newColumn;

    beforeEach(function () {
      newColumn = new BaseColumn('name', { sortable: true });
      viewModel = new GridViewModel(observableArray);

      viewModel.addColumn(newColumn);
    });

    it('sorts the column', function () {
      spyOn(newColumn, 'sortState').andReturn('');

      viewModel.sort(newColumn);

      expect(viewModel.data()).toEqual([{ 'name' : 'bar' }, { 'name' : 'foo' }, { 'name' : 'fun' }]);
    });

    it('reverse sorts the column', function () {
      spyOn(newColumn, 'sortState').andReturn('ascending');

      viewModel.sort(newColumn);

      expect(viewModel.data()).toEqual([{ 'name' : 'fun' }, { 'name' : 'foo' }, { 'name' : 'bar' }]);
    });

    it('sets new sort state to ascending if no initial sort state on the column', function () {
      spyOn(newColumn, 'sortState').andReturn('');

      viewModel.sort(newColumn);

      expect(newColumn.sortState).toHaveBeenCalledWith('ascending');
    });

    it('sets new sort state to descending if initial sort state is ascending on the column', function () {
      spyOn(newColumn, 'sortState').andReturn('ascending');

      viewModel.sort(newColumn);

      expect(newColumn.sortState).toHaveBeenCalledWith('descending');
    });
  });

  describe('custom sort classes', function () {
    var newColumn;

    beforeEach(function () {
      newColumn = new BaseColumn('name', { sortable: true });
      viewModel = new GridViewModel(
        observableArray,
        { 'ascending-sort-css': 'a-css', 'descending-sort-css': 'd-css' }
      );

      viewModel.addColumn(newColumn);
    });

    it('sets new sort state to ascending if no initial sort state on the column', function () {
      spyOn(newColumn, 'sortState').andReturn('');

      viewModel.sort(newColumn);

      expect(newColumn.sortState).toHaveBeenCalledWith('a-css');
    });

    it('sets new sort state to descending if initial sort state is ascending on the column', function () {
      spyOn(newColumn, 'sortState').andReturn('a-css');

      viewModel.sort(newColumn);

      expect(newColumn.sortState).toHaveBeenCalledWith('d-css');
    });
  });
});
