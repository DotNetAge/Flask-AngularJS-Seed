// Generated on 2014-12-13 using generator-angular 0.10.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: require('./bower.json').appPath || 'app',
        dist: 'dist/app'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: appConfig,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            coffee: {
                files: ['<%= config.app %>/scripts/**/*.{coffee,litcoffee,coffee.md}'],
                tasks: ['newer:coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/**/*.{coffee,litcoffee,coffee.md}'],
                tasks: ['newer:coffee:test', 'karma']
            },
            python: {
                files: ['<%= config.app %>/**/*.py'],
                tasks: ['newer:copy:python']
            },
            less: {
                files: ['<%= config.app %>/less/**/*.less'],
                tasks: ['useminPrepare', 'newer:less',
                    'newer:copy:styles', 'newer:copy:dist', 'cssmin',
                    'uglify',
                    'usemin',
                    'htmlmin']
            },
            htmls: {
                files: ['<%= config.app %>/templates/{,*/}*.html'],
                tasks: ['newer:copy:dist']
            },
            styles: {
                files: ['<%= config.app %>/static/styles/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },
        less: {
            all: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: '<%= config.app %>/less',
                        src: ['{,*/}*.less'],
                        dest: '<%= config.app%>/styles',
                        ext: '.css'
                    }
                ]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= config.dist %>/{,*/}*',
                            '!<%= config.dist %>/.git{,*/}*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/styles/',
                        src: '{,*/}*.css',
                        dest: '.tmp/styles/'
                    }
                ]
            }
        },

        bowerInstall: {
            app: {
                src: ['<%= config.app %>/templates/base.html'],
                ignorePath: '<%= config.app %>/'
            }
        },

        // Compiles CoffeeScript to JavaScript
        coffee: {
            options: {
                sourceMap: true,
                sourceRoot: ''
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/scripts',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/scripts',
                        ext: '.js'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/spec',
                        src: '{,*/}*.coffee',
                        dest: '.tmp/spec',
                        ext: '.js'
                    }
                ]
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/static/scripts/{,*/}*.js',
                    '<%= config.dist %>/static/styles/{,*/}*.css',
                    '<%= config.dist %>/static/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= config.dist %>/static/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: [
                '<%= config.app %>/templates/base.html'
            ]
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg,gif}',
                        dest: '<%= config.dist %>/static/images'
                    }
                ]
            }
        },

        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= config.dist %>/static/images'
                    }
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.dist %>/app/templates',
                        src: ['*.html', '{,*/}*.html'],
                        dest: '<%= config.dist %>/app/templates'
                    }
                ]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat/static/scripts',
                        src: ['*.js', '!oldieshim.js'],
                        dest: '.tmp/concat/static/scripts'
                    }
                ]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'images/{,*/}*.{webp}',
                            '*.cfg'
                        ]
                    },

                    {
                        expand: true,
                        cwd: '<%= config.app %>/templates',
                        dest: '<%= config.dist %>/templates',
                        src: ['{,*/}*.html']
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/fonts',
                        dest: '<%= config.dist %>/static/fonts',
                        src: ['*.*']
                    },
                    {
                        expand: true,
                        cwd: '.tmp/images',
                        dest: '<%= config.dist %>/static/images',
                        src: ['generated/*']
                    },
                    {
                        expand: true,
                        cwd: 'bower_components/bootstrap/dist',
                        src: 'fonts/*',
                        dest: '<%= config.dist %>/static/'
                    }
                ]
            },
            python: {
                files: [
                    {
                        dest: 'dist/app/__init__.py',
                        src: 'app/__init__.py'
                    },
                    {
                        dest: 'dist/manage.py',
                        src: 'manage.py'
                    },
                    {
                        dest: 'dist/config.py',
                        src: 'config.py'
                    },
                    {
                        expand: true,
                        cwd: '<%= config.app %>/main',
                        dest: '<%= config.dist %>/main',
                        src: ['{,*/}*.py']
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= config.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'coffee:dist',
                'less',
                'copy:styles'
            ],
            test: [
                'coffee',
                'less',
                'copy:styles'
            ],
            dist: [
                'coffee',
                'less',
                'copy:styles',
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'test/karma.conf.coffee',
                singleRun: true
            }
        },
        shell: {
            options: {
                stderr: false
            },
            setup: {
                venv: {
                    command: 'sudo virtualenv venv'
                },
                flask: {
                    command: 'venv/bin/pip2.7 install -r requirements.txt'
                },
                bower: {
                    command: 'bower install'
                }
            }
        },
        open: {
            dev: {
                path: 'http://127.0.0.1:5000/',
                app: 'Google Chrome'
            }
        }
    });


    grunt.registerTask('flask', 'Run flask server.', function () {
        var spawn = require('child_process').spawn;
        grunt.log.writeln('Starting Flak development server.');
        spawn('venv/bin/python2.7', ['dist/manage.py', 'runserver'], {stdio: 'inherit'});
    });

    grunt.registerTask('livereload', 'Start livereload server', function () {
        var spawn = require('child_process').spawn;
        grunt.log.writeln('Starting livereload server.');
        spawn('venv/bin/livereload', ['dist'], {stdio: 'inherit'});
    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            //'clean:server',
            'bowerInstall',
            'concurrent:server',
            'autoprefixer',
            'flask',
            'livereload',
            'open:dev',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        //'wiredep',
        'bowerInstall',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'copy:python',
        'cssmin',
        'uglify',
        //'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('setup', ['shell:flask_setup', 'shell:bower'])
};
