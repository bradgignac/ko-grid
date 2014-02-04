function sortObjectByProperty(name, direction, left, right) {
  'use strict';

  var leftProperty, rightProperty, result;

  leftProperty = ko.utils.peekObservable(left[name]);
  rightProperty = ko.utils.peekObservable(right[name]);
  direction = direction === 'ascending' ? 1 : -1;

  if (leftProperty === rightProperty) {
    return 0;
  }

  result = leftProperty < rightProperty ? -1 : 1;
  return result * direction;
}

module.exports = { byProperty: sortObjectByProperty };
