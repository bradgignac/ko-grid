function BaseColumn(key, options) {
  var bodyClass, bodyClassOption, sortFunction;

  sortFunction = function (model1, model2) { };

  if(!key) {
    throw new Error('Please specify a valid data-bind key.');
  }

  bodyClassOption = options['bodyClass'] || '';

  if (typeof bodyClassOption === 'string') {
    bodyClass = function () { return bodyClassOption; };
  } else if (typeof bodyClassOption !== 'function') {
    throw new Error('bodyClass needs to be a function type or a string type.');
  } else {
    bodyClass = bodyClassOption;
  }

  return {
    'class': options['class'],
    'sortable': options['sortable'] || false,
    'sortFunction': sortFunction,
    'bodyClass': bodyClass,
    'bodyTemplate': function () {
      return options['template'] || '';
    },
    'headerTemplate': function () {
      return options['headerTemplate'] || options['header'] || '';
    },
    'hasHeader': function () {
      return !!this.headerTemplate();
    }
  };
};

module.exports = BaseColumn;
