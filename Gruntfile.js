module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			scripts: {
				files: ['src/**/*.js'],
				tasks: ['concat:app'],
			},
			css: {
				files: 'css/**/*.less',
				tasks: ['less:development']
			},
		},
		uglify: {
			development: {
				options: {
					mangle: false,
				},
				files: {
		            'build/compiled.js': ['src/game_framework.js',
						'src/common.js',
						'src/main.js',
						'src/readAJAX.js',
						'src/GameObject.js',
						'src/sprite.js',
						'src/Text.js',
						'src/Particle.js',
						'src/ParticleEmitter.js',
						'src/State.js',
						'src/**/*.js']
				},
			},
			compressed: {
				options: {
					mangle: true,
					compress: {
						//TODO: Optimize using compressor options (https://github.com/mishoo/UglifyJS2#compressor-options)
					}
				},
				files: {
					'build/compiled.js': ['src/game_framework.js',
						'src/common.js',
						'src/main.js',
						'src/readAJAX.js',
						'src/GameObject.js',
						'src/sprite.js',
						'src/Text.js',
						'src/Particle.js',
						'src/ParticleEmitter.js',
						'src/State.js',
						'src/**/*.js']
				},
			}
		},
		htmlmin: {
			development: {
				options: {
					removeComments: false,
					collapseWhitespace: false,
				},
				files: {
					'build/index.html': '*.html'
				}
			},
			compressed: {
				options: {
					removeComments: true,
					collapseWhitespace: true,
				},
				files: {
					'build/index.html': '*.html'
				}
			}
		},
		compress: {
			main: {
				options: {
					archive: 'build/game.zip',
					mode: 'zip'
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: './',
					src: ['build/*.css', 'build/*.js', 'build/*.html'],
					dest: './'
				}]
			}
		},
        concat: {
            options: {
            },
            dist: {
                src: ['src/game_framework.js',
                    'src/common.js',
                    'src/main.js',
                    'src/readAJAX.js',
                    'src/GameObject.js',
                    'src/sprite.js',
                    'src/Text.js',
                    'src/Particle.js',
                    'src/ParticleEmitter.js',
                    'src/State.js',
                    'src/**/*.js'],
                dest: 'build/compiled.js'
            }
        },
		'closure-compiler': {
			game: {
				closurePath: 'closure',
				js: 'build/compiled.js',
				jsOutputFile: 'build/compiled.min.js',
				maxBuffer: 10240,
				options: {
					compilation_level: 'ADVANCED_OPTIMIZATIONS',
					language_in: 'ECMASCRIPT5_STRICT'
				}
			}
		},
		copy: {
			assets: {
				files: [
					{expand: true, src: ['assets/*'], dest: 'build/', filter: 'isFile'},
				],
			},
		},
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-closure-compiler');

	var fs = require('fs');
	grunt.registerTask('sizecheck', function() {
		var done = this.async();
		fs.stat('build/game.zip', function(err, zip) {
			if (zip.size > 13312) {
				//If size in bytes greater than 13kb
				grunt.log.error("Zipped file greater than 13kb \x07 \n");
				grunt.log.error("Zip is " + zip.size + " bytes when js13k max is 13,312 bytes");
			}
			done();
		});
	});

	grunt.registerTask('closure', ['closure-compiler']);
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['concat', 'closure']);
	grunt.registerTask('build-compress', ['uglify:compressed', 'closure', 'compress:main', 'sizecheck']);

};