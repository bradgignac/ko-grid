var TemplateSource = require('./source');

function TextEngine() {}
TextEngine.prototype = new ko.nativeTemplateEngine();
TextEngine.prototype.constructor = TextEngine;
TextEngine.prototype.renderTemplateSource = function (template, bindingContext, options, templateDocument) {
  'use strict';

  var templateSource;

  templateSource = new TemplateSource(options.text);

  return ko.nativeTemplateEngine.prototype['renderTemplateSource'].call(this, templateSource, bindingContext, options, templateDocument);
};

module.exports = TextEngine;
