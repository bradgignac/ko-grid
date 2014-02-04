var GridViewModel = require('../../lib/javascripts/subscribables/grid_view_model');

describe('GridViewModel', function () {
  var viewModel, observable;

  it('sets data source', function () {
    var observable;

    observable = ko.observableArray();
    viewModel = new GridViewModel(observable);

    expect(viewModel.data()).toBe(observable());
  });

  describe('#addColumn', function () {
    it('adds a column to column array', function () {
      viewModel = new GridViewModel();
      viewModel.addColumn('columnName');

      expect(viewModel.columns).toEqual([{ name: 'columnName' }]);
    });
  });

  describe('#sortColumn', function () {
    beforeEach(function () {
      observable = ko.observableArray([
        { propertyname: '2', other: 'c' },
        { propertyname: '4', other: 'b' },
        { propertyname: '1', other: 'a' }
      ]);
    });

    it('initially sorts clicked column in ascending order', function () {
      viewModel = new GridViewModel(observable);
      viewModel.sortColumn({ name: 'propertyname' });

      expect(viewModel.data()).toEqual([
        { propertyname: '1', other: 'a' },
        { propertyname: '2', other: 'c' },
        { propertyname: '4', other: 'b' }
      ]);
    });

    it('maintains sorting when adding new data', function () {
      viewModel = new GridViewModel(observable);
      viewModel.sortColumn({ name: 'propertyname' });

      observable.push({ propertyname: '3', other: 'd' });

      expect(viewModel.data()).toEqual([
        { propertyname: '1', other: 'a' },
        { propertyname: '2', other: 'c' },
        { propertyname: '3', other: 'd' },
        { propertyname: '4', other: 'b' }
      ]);
    });

    it('toggles sort when clicking column a second time', function () {
      viewModel = new GridViewModel(observable);
      viewModel.sortColumn({ name: 'propertyname' });
      viewModel.sortColumn({ name: 'propertyname' });

      expect(viewModel.data()).toEqual([
        { propertyname: '4', other: 'b' },
        { propertyname: '2', other: 'c' },
        { propertyname: '1', other: 'a' }
      ]);
    });

    it('resets to ascending sort when clicking different column', function () {
      viewModel = new GridViewModel(observable);
      viewModel.sortColumn({ name: 'propertyname' });
      viewModel.sortColumn({ name: 'other' });

      expect(viewModel.data()).toEqual([
        { propertyname: '1', other: 'a' },
        { propertyname: '4', other: 'b' },
        { propertyname: '2', other: 'c' }
      ]);
    });
  });
});
