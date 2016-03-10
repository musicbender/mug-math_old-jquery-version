// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),
    watch: {
        scripts: {
            files: ['js/*.js', 'js/vendor/*.js'],
            tasks: ['concat:scripts', 'uglify'],
            options: {
                spawn: false
            }
        },
        css: {
            files: '**/*.scss',
            tasks: ['sass', 'concat:css', 'cssmin'],
            options: {
                debounceDelay: 250,
                spawn: false
            }
        },
        images: {
            files: 'images/*.{png,jpg,gif}',
            tasks: ['clean:images', 'imagemin'],
            spawn: false
        }
    },
    sass: {
        dist: {
            files: {
                'css/main.css' : 'scss/main.scss'
            }
        }
    },
    clean: {
        images: ['build/images/*']
    },
    modernizr: {
        dist: {
          devFile: 'js/vendor/modernizr.js',
          outputFile: 'build/vendor/custom-modernizr.js',
          files: {
            src: [
              'js/*.js',
              'css/*.css'
            ]
          }
        }
    },
    concat: {
        options: {
            separator: ';\n'
        },
        scripts: {
            src: ['js/vendor/bootstrap.min.js', '!js/vendor/custom-modernizr.js', '!js/vendor/modernizr.js', 'js/*.js'],
            dest: 'build/build.js'
        },
        css: {
            src: ['!css/*.map', 'css/vendor/normalize.css', 'css/vendor/bootstrap.min.css', 'css/*.css' ],
            dest: 'build/build.css'
        }
    },
    uglify: {
      target:{
          files: {
            'build/build.js': ['build/build.js']
          }
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'build/build.css': ['build/build.css']
        }
      }
    },
    uncss: {
      options: {
          timeout: 2000
      },
      dist: {
        files: {
          'css/main.css': ['index.html']
        }
      }
    },
    imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: 'images/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'build/images'
            }]
        }
    }
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default',['watch']);
  grunt.registerTask('image',['clean:images', 'imagemin']);
  grunt.registerTask('build',['modernizr','concat', 'uglify', 'cssmin']);
};
