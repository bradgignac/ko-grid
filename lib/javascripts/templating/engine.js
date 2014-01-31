var TemplateSource = require('./source');

function TemplateEngine() {}
TemplateEngine.prototype = new ko.nativeTemplateEngine();
TemplateEngine.prototype.constructor = TemplateEngine;
TemplateEngine.prototype.makeTemplateSource = function (template) {
  'use strict';

  return new TemplateSource(template);
};

module.exports = TemplateEngine;
