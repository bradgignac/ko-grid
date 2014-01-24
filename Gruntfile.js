module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      grid: ['dist']
    },
    browserify: {
      grid: {
        src: ['lib/javascripts/ko-grid.js'],
        dest: 'dist/ko-grid.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['browserify']);
  grunt.registerTask('dist', ['clean', 'build']);

  grunt.registerTask('default', ['dist']);
};
