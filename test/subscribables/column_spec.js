var column = require('../../lib/javascripts/subscribables/column');

describe('#column', function () {
  it('is sortable by default', function () {
    var columnDefinition;

    columnDefinition = column({});

    expect(columnDefinition.sort).toBe(true);
  });
});
