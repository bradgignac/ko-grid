var grid = require('../../lib/javascripts/subscribables/grid');
var SelectColumn = require('../../lib/javascripts/subscribables/columns/select_column');
var TextColumn = require('../../lib/javascripts/subscribables/columns/text_column');

describe('integration', function () {
  var data, grid, element;

  beforeEach(function () {
    data = ko.observableArray();
    grid = ko.grid(data, [
      SelectColumn('checked', {}),
      TextColumn('name', {
        'headerTemplate': 'Name',
        'sortable': true,
        'class': 'name-column'
      })
    ]);
    element = document.createElement('div');
    element.setAttribute('data-bind', 'grid: gridValue');

    ko.applyBindings({'gridValue': grid}, element);

    data.push({'name': 'Test', 'checked': ko.observable()});
    data.push({'name': 'Second Item', 'checked': ko.observable()});
  });

  it('displays the items', function ()  {
    var nameCells;

    nameCells = element.getElementsByClassName('name-column');

    expect(nameCells[0].textContent.trim()).toBe('Name');
    expect(nameCells[1].textContent.trim()).toBe('Test');
    expect(nameCells[2].textContent.trim()).toBe('Second Item');
  });

  it('sorting works', function () {
    var nameCells;

    nameCells = element.getElementsByClassName('name-column');

    console.log(jQuery);

    expect(nameCells[1].textContent.trim()).toBe('Second Item');
    expect(nameCells[2].textContent.trim()).toBe('Test');
  });

});
