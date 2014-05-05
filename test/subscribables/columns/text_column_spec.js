var TextColumn = require('../../../lib/javascripts/subscribables/columns/text_column');

describe('TextColumn', function () {
  var column;

  beforeEach(function () {
    column = TextColumn.create('text-key', {});
  });

  it('sortable defaults to true', function () {
    expect(column['sortable']).toBe(true);
  });

  it('can set sortable to true', function () {
    column = TextColumn.create('text-key', {'sortable': true});

    expect(column['sortable']).toBe(true);
  });

  it('can set sortable to false', function () {
    column = TextColumn.create('text-key', {'sortable': false});

    expect(column['sortable']).toBe(false);
  });

  it('getValue works with flat strings', function () {
    expect(column['getValue']({'text-key': 'someValue'})).toBe('someValue');
  });

  it('getValue works with observables', function () {
    expect(column['getValue']({'text-key': ko.observable('someValue')})).toBe('someValue');
  });

  it('bodyTemplate is correct', function () {
    expect(column['bodyTemplate']()).toBe(
      '<span data-bind="text: column.getValue(model)"></span>'
    );
  });
});
