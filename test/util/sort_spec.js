var sort = require('../../lib/javascripts/util/sort');

describe('sort.byProperty', function () {
  var left, right, result;

  beforeEach(function () {
    left = { name: null };
    right = { name: null };
  });

  describe('ascending', function () {
    it('returns 0 when values are equal', function () {
      left.name = 5;
      right.name = 5;

      result = sort.byProperty('name', 'ascending', left, right);

      expect(result).toBe(0);
    });

    it('returns -1 when left value is less than right value', function () {
      left.name = 1;
      right.name = 2;

      result = sort.byProperty('name', 'ascending', left, right);

      expect(result).toBe(-1);
    });

    it('returns 1 when left value is greater than right value', function () {
      left.name = 2;
      right.name = 1;

      result = sort.byProperty('name', 'ascending', left, right);

      expect(result).toBe(1);
    });
  });

  describe('descending', function () {
    it('returns 0 when values are equal', function () {
      left.name = 5;
      right.name = 5;

      result = sort.byProperty('name', 'descending', left, right);

      expect(result).toBe(0);
    });

    it('returns 1 when left value is less than right value', function () {
      left.name = 1;
      right.name = 2;

      result = sort.byProperty('name', 'descending', left, right);

      expect(result).toBe(1);
    });

    it('returns -1 when left value is greater than right value', function () {
      left.name = 2;
      right.name = 1;

      result = sort.byProperty('name', 'descending', left, right);

      expect(result).toBe(-1);
    });
  });
});
