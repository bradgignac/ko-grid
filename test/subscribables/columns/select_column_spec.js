var SelectColumn = require('../../../lib/javascripts/subscribables/columns/select_column');

describe('SelectColumn', function () {
  var column;

  beforeEach(function () {
    column = new SelectColumn('key-name', {});
  });

  it('defaults checked to false', function () {
    expect(column['checked']()).toBe(false);
  });

  it('sets sortable to false', function () {
    expect(column['sortable']).toBe(false);
  });

  it('getkey returns the key on the model', function () {
    var model;

    model = {'key-name': 'some-value'};

    expect(column['getKey'](model)).toBe('some-value');
  });

  it('has the right body template', function () {
    expect(column['bodyTemplate']()).toBe(
      '<input type="checkbox" data-bind="checked: column.getKey(model)"></input>'
    );
  });

  it('has the right header template', function () {
    expect(column['headerTemplate']()).toBe(
      '<input type="checkbox" data-bind="checked: checked, click: checkAll(checked(), $root)"></input>'
    );
  });

  it('checkAll checks each row', function () {
    var fakeViewModel, data;

    fakeViewModel = {'data': function () { return data; }};
    data = [
      {'key-name': jasmine.createSpy('key-name')},
      {'key-name': jasmine.createSpy('key-name')}
    ];

    column['checkAll'](true, fakeViewModel);

    expect(data[0]['key-name']).toHaveBeenCalledWith(true);
    expect(data[1]['key-name']).toHaveBeenCalledWith(true);
  });
});
