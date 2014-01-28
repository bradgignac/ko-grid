var grid, binding, subscribable;

grid = require('../lib/javascripts/ko-grid');
binding = require('../lib/javascripts/bindings/grid');
subscribable = require('../lib/javascripts/subscribables/grid');

describe('ko-grid', function () {
  it('exports binding handler', function () {
    expect(ko.bindingHandlers.grid).toBe(binding);
  });

  it('exports subscribable', function () {
    expect(ko.grid).toBe(subscribable);
  });
});
