ko-grid
=======

This is a work-in-progress that aims to build the following public interface. In
your Javascript, you would write:

```
var viewModel, grid, element;

viewModel = ko.observableArray();
viewModel.push({ 'foo': 1, 'bar': 'one' });
viewModel.push({ 'foo': 2, 'bar': 'two' });

grid = ko.grid(viewModel, {
  'foo': ko.grid.column('text', { sort: true }),
  'bar': ko.grid.column('text', { sort: false })
});

element = document.getElementById('grid');
ko.applyBindings(grid, element);
```

In your HTML,

```
<body>
  <div id="grid" data-bind="grid: $data"></div>
</body>
```

The above code would render a two-column table. The first column, foo, would be
sortable. The second column, bar, would not be sortable. `ko.grid` also allows
different column types. In the example, both columns use the "text" column type,
but any number of different column types can be built that handle formatting of
special data types.
