function TemplateSource(template) {
  'use strict';

  this.template = template;
  this.dataStore = {};
}

TemplateSource.prototype.text = function (template) {
  'use strict';

  if (arguments.length === 1) {
    this.template = template;
  }

  return this.template;
};

TemplateSource.prototype.data = function (key, value) {
  'use strict';

  if (arguments.length === 2) {
    this.dataStore[key] = value;
  }

  return this.dataStore[key];
};

module.exports = TemplateSource;
