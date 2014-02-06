var GridViewModel, column;

GridViewModel = require('../../lib/javascripts/subscribables/grid_view_model');
column = require('../../lib/javascripts/subscribables/column');

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
      var column;

      column = jasmine.createSpy('column');

      viewModel = new GridViewModel();
      viewModel.addColumn('columnName', column);

      expect(viewModel.columns).toEqual([{
        key: 'columnName',
        column: column
      }]);
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

    it('does not sort if sorting is disabled for a column', function () {
      viewModel = new GridViewModel(observable);

      viewModel.sortColumn({ key: 'other', column: column({ sortable: false }) });

      expect(viewModel.data()).toEqual([
        { propertyname: '2', other: 'c' },
        { propertyname: '4', other: 'b' },
        { propertyname: '1', other: 'a' }
      ]);
    });

    it('initially sorts clicked column in ascending order', function () {
      viewModel = new GridViewModel(observable);
      viewModel.sortColumn({ key: 'propertyname' });

      expect(viewModel.data()).toEqual([
        { propertyname: '1', other: 'a' },
        { propertyname: '2', other: 'c' },
        { propertyname: '4', other: 'b' }
      ]);
    });

    it('maintains sorting when adding new data', function () {
      viewModel = new GridViewModel(observable);
      viewModel.sortColumn({ key: 'propertyname' });

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
      viewModel.sortColumn({ key: 'propertyname' });
      viewModel.sortColumn({ key: 'propertyname' });

      expect(viewModel.data()).toEqual([
        { propertyname: '4', other: 'b' },
        { propertyname: '2', other: 'c' },
        { propertyname: '1', other: 'a' }
      ]);
    });

    it('resets to ascending sort when clicking different column', function () {
      viewModel = new GridViewModel(observable);
      viewModel.sortColumn({ key: 'propertyname' });
      viewModel.sortColumn({ key: 'other' });

      expect(viewModel.data()).toEqual([
        { propertyname: '1', other: 'a' },
        { propertyname: '4', other: 'b' },
        { propertyname: '2', other: 'c' }
      ]);
    });
  });
});
