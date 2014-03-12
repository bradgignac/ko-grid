var grid, binding, subscribable;

koGrid = require('../lib/javascripts/ko-grid');
binding = require('../lib/javascripts/bindings/grid');
grid = require('../lib/javascripts/subscribables/grid');
column = require('../lib/javascripts/subscribables/column');

describe('ko-grid', function () {
  it('exports binding handler', function () {
    expect(ko.bindingHandlers.grid).toBe(binding);
  });

  it('exports grid subscribable', function () {
    expect(ko.grid).toBe(grid);
  });

  it('exports column subscribable', function () {
    expect(ko.column).toBe(column);
  });
});
