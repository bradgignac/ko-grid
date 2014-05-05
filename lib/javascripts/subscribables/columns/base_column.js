function BaseColumn(key, options) {
  'use strict';

  var bodyClass, bodyClassOption, sortFunction;

  if(!key) {
    throw new Error('Please specify a valid data-bind key.');
  }

  sortFunction = function (model1, model2) {
    var key1, key2;

    key1 = ko.utils.unwrapObservable(model1[key]);
    key2 = ko.utils.unwrapObservable(model2[key]);

    if (key1 === key2) {
      return 0;
    } else if (key1 < key2) {
      return -1;
    }
    return 1;
  };

  bodyClassOption = options.bodyClass || key;

  if (typeof bodyClassOption === 'string') {
    bodyClass = function () { return bodyClassOption; };
  } else if (typeof bodyClassOption !== 'function') {
    throw new Error('bodyClass needs to be a function type or a string type.');
  } else {
    bodyClass = bodyClassOption;
  }

  sortFunction = function (item1, item2) {
    if ( item1 < item2 )
      return -1;
    if ( item1 > item2 )
      return 1;
    return 0;
  };

  return {
    'class': options.class || key,
    'sortable': options.sortable || false,
    'sortState': ko.observable(''),
    'sortFunction': sortFunction,
    'bodyClass': bodyClass,
    'bodyTemplate': function () {
      return options.template || '';
    },
    'headerTemplate': function () {
      return options.headerTemplate || options.header || '';
    },
    'hasHeader': function () {
      return !!this.headerTemplate();
    }
  };
}

module.exports = BaseColumn;
