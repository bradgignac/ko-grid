var TemplateEngine = require('../../lib/javascripts/templating/engine');

describe('TemplateEngine', function () {
  describe('#makeTemplateSource', function () {
    it('creates template source from template text', function () {
      var template, engine, source;

      template = 'this is my template text';
      engine = new TemplateEngine();
      source = engine.makeTemplateSource(template);

      expect(source.text()).toBe(template);
    });
  });
});
