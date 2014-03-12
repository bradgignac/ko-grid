var TemplateSource = require('./source');

function TextEngine() {}
TextEngine.prototype = new ko.nativeTemplateEngine();
TextEngine.prototype.constructor = TextEngine;
TextEngine.prototype.renderTemplateSource = function (template, bindingContext, options, templateDocument) {
  'use strict';
  return ko.nativeTemplateEngine.prototype['renderTemplateSource'].call(this, options, bindingContext, options, templateDocument);
};

module.exports = TextEngine;
