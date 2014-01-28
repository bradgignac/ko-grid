var TemplateSource = require('../../lib/javascripts/templating/source');

describe('TemplateSource', function () {
  describe('#text', function () {
    it('is equal to value of constructor argument', function () {
      var text, source;

      text = 'this is my template';
      source = new TemplateSource(text);

      expect(source.text()).toBe(text);
    });

    it('is updated after being called with new value', function () {
      var text, source;

      text = 'this is my NEW template';
      source = new TemplateSource();
      source.text(text);

      expect(source.text()).toBe(text);
    });
  });

  describe('#data', function () {
    it('is undefined when key has not been set', function () {
      var source, data;

      source = new TemplateSource();
      data = source.data('undefined');

      expect(data).toBeUndefined();
    });

    it('allows value to be set for key', function () {
      var data, source;

      data = 'my new value';
      source = new TemplateSource();
      source.data('key', data);

      expect(source.data('key')).toBe(data);
    });
  });
});
