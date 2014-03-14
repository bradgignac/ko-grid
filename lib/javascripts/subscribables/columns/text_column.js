var BaseColumn;

BaseColumn = require('./base_column');

function TextColumn(key, options) {
  var sortFunction;

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

  return ko.utils.extend(
    BaseColumn(key, options),
    {
      'bodyTemplate': function () {
        return options['template'] || '<span data-bind="text: model.' + key + '"></span>';
      },
      'sortFunction': options['sortable'] ? sortFunction : undefined,
   }
  );
};

module.exports = TextColumn;
