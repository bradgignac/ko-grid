module.exports = function (grunt) {
  grunt.initConfig({
    browserify: {
      grid: {
        src: ['lib/javascripts/ko-grid.js'],
        dest: 'dist/ko-grid.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', ['browserify']); // Templates
  grunt.registerTask('dist', ['build']); // Clean

  grunt.registerTask('default', ['dist']);
};
