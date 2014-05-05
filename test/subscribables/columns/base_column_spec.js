var BaseColumn = require('../../../lib/javascripts/subscribables/columns/base_column');

describe('BaseColumn', function () {
  it('sets the body class correctly if it is a string', function () {
    var column;

    column = new BaseColumn('key', {bodyClass: 'some-body-class'})

    expect(column['bodyClass']()).toBe('some-body-class');
  });

  it('sets the body class correctly if it is a function', function () {
    var column;

    column = new BaseColumn('key', {bodyClass: function () { return 'some-other-body-class'}})

    expect(column['bodyClass']()).toBe('some-other-body-class');
  });

  it('sets class correctly', function () {
    var column;

    column = new BaseColumn('key', {class: 'someClassName'});

    expect(column['class']).toBe('someClassName');
  });

  it('sets sortable to true', function () {
    var column;

    column = new BaseColumn('key', {sortable: true});

    expect(column['sortable']).toBe(true);
  });

  it('sets sortable to false', function () {
    var column;

    column = new BaseColumn('key', {sortable: false});

    expect(column['sortable']).toBe(false);
  });

  it('defaults sortable to false', function () {
    var column;

    column = new BaseColumn('key', {});

    expect(column['sortable']).toBe(false);
  });

  it('creates sortState and defaults it to ""', function () {
    var column;

    column = new BaseColumn('key', {});

    expect(column['sortState']()).toBe('');
  });

  it('defaults to a blank header', function () {
    var column;

    column = new BaseColumn('key', {});

    expect(column['headerTemplate']()).toBe('');
    expect(column['hasHeader']()).toBe(false);
  });

  it('sets the header', function () {
    var column;

    column = new BaseColumn('key', {headerTemplate: 'some header template'});

    expect(column['headerTemplate']()).toBe('some header template');
    expect(column['hasHeader']()).toBe(true);
  });

  it('defaults to a blank body', function () {
    var column;

    column = new BaseColumn('key', {});

    expect(column['bodyTemplate']()).toBe('');
  });

  it('sets the header', function () {
    var column;

    column = new BaseColumn('key', {template: 'some body template'});

    expect(column['bodyTemplate']()).toBe('some body template');
  });

  describe('sort function', function () {
    var column;

    beforeEach(function () {
      column = new BaseColumn('key-name', {'sortable': true});
    });

    it('returns 0 when the two keys are equal', function () {
      expect(column['sortFunction'](
        {'key-name': 5}, {'key-name': 5}
      )).toBe(0);
    });

    it('returns 1 when key 1 > key 2', function () {
      expect(column['sortFunction'](
        {'key-name': 6}, {'key-name': 5}
      )).toBe(1);
    });

    it('returns -1 when key 1 < key 2', function () {
      expect(column['sortFunction'](
        {'key-name': 6}, {'key-name': 7}
      )).toBe(-1);
    });
  });
});
