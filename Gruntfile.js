module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    browserify: {
      dist: {
        options: {
          transform: ['folderify']
        },
        src: ['lib/javascripts/ko-grid.js'],
        dest: 'dist/ko-grid-<%= pkg.version %>.min.js'
      }
    },
    clean: {
      dist: ['dist']
    },
    connect: {
      server: {
        options: {
          base: ['dist', 'examples'],
          livereload: true,
          port: grunt.option('port') || 8000
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
      source: {
        src: ['Gruntfile.js', 'lib/javascripts/**/*.js'],
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
          transform: ['folderify'],
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
      example: {
        files: ['examples/**/*'],
        options: {
          livereload: true
        }
      },
      source: {
        files: ['lib/javascripts/**/*.js', 'lib/templates/**/*.html'],
        tasks: ['browserify'],
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
