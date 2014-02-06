function column(options) {
  if (options.sort === undefined) {
    options.sort = true;
  }

  return options;
}

module.exports = column;
