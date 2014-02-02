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
    it('initially sorts clicked column in ascending order', function () {
      observable = ko.observableArray([
        { propertyname: '2' },
        { propertyname: '3' },
        { propertyname: '1' }
      ]);

      viewModel = new GridViewModel(observable);
      viewModel.sortColumn({ name: 'propertyname' });

      expect(viewModel.data()).toEqual([
        { propertyname: '1' },
        { propertyname: '2' },
        { propertyname: '3' }
      ]);
    });

    it('maintains sorting when adding new data', function () {
      observable = ko.observableArray([
        { propertyname: '2' },
        { propertyname: '4' },
        { propertyname: '1' }
      ]);

      viewModel = new GridViewModel(observable);
      viewModel.sortColumn({ name: 'propertyname' });

      observable.push({ propertyname: '3' });

      expect(viewModel.data()).toEqual([
        { propertyname: '1' },
        { propertyname: '2' },
        { propertyname: '3' },
        { propertyname: '4' }
      ]);
    });
  });
});
