var TemplateSource, TemplateEngine;

TemplateSource = require('./source');

TemplateEngine = function () {};
TemplateEngine.prototype = new ko.nativeTemplateEngine();
TemplateEngine.prototype.constructor = TemplateEngine;
TemplateEngine.prototype.makeTemplateSource = function (template) {
  'use strict';

  return new TemplateSource(template);
};

module.exports = TemplateEngine;
