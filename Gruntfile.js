module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    browserify: {
      grid: {
        src: ['lib/javascripts/ko-grid.js'],
        dest: 'dist/ko-grid.js'
      }
    },
    clean: {
      grid: ['dist']
    },
    connect: {
      server: {
        options: {
          base: ['dist', 'examples'],
          livereload: true
        }
      }
    },
    jshint: {
      options: {
        camelcase: true,
        eqeqeq: true,
        forin: true,
        immed: true,
        indent: 2,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        strict: true,
        trailing: true,
        undef: true,
        unused: true
      },
      build: {
        src: ['Gruntfile.js'],
        options: {
          node: true
        }
      },
      grid: {
        src: ['lib/javascripts/**/*.js'],
        options: {
          node: true,
          globals: {
            ko: true
          }
        }
      }
    },
    karma: {
      options: {
        browsers: ['PhantomJS'],
        frameworks: ['browserify', 'jasmine'],
        files: [
          'node_modules/knockout/build/output/knockout-latest.debug.js',
          'lib/javascripts/**/*.js',
          'test/**/*.js'
        ],
        preprocessors: {
          'lib/javascripts/**/*.js': ['browserify'],
          'test/**/*.js': ['browserify']
        },
        browserify: {
          watch: true
        }
      },
      ci: {
        options: {
          singleRun: true
        }
      },
      watch: {
        options: {
          autoWatch: true,
          singleRun: false
        }
      }
    },
    watch: {
      grid: {
        files: 'lib/javascripts/**/*.js',
        tasks: ['build'],
        options: {
          livereload: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-karma');

  grunt.registerTask('dist', ['clean', 'browserify']);
  grunt.registerTask('server', ['dist', 'connect', 'watch']);
  grunt.registerTask('test', ['jshint', 'karma:ci']);

  grunt.registerTask('default', ['test', 'dist']);
};
