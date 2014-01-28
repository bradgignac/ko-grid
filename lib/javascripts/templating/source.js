var TemplateSource;

TemplateSource = function (template) {
  this.template = template;
  this.dataStore = {};
};

TemplateSource.prototype.text = function (template) {
  if (arguments.length === 1) {
    this.template = template;
  }

  return this.template;
};

TemplateSource.prototype.data = function (key, value) {
  if (arguments.length === 2) {
    this.dataStore[key] = value;
  }

  return this.dataStore[key];
};

module.exports = TemplateSource;
