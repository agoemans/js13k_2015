module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: { 
			scripts: { 
				files: ['assets/*.txt', '!assets/levels.txt'],
				tasks: ['concat:levels'], 
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
					src: ['build/**/*.*'],
					dest: './'
				}]
			}
		},
        concat: {
			options: {},
			levels: {
				src: [
					'assets/level1.txt',
					'assets/level2.txt',
					'assets/level3.txt',
					'assets/level4.txt',
					'assets/level5.txt',
					'assets/level6.txt',
					'assets/level7.txt',
					'assets/level8.txt',
					'assets/level9.txt',
					'assets/level10.txt',
					'assets/level11.txt',
					'assets/level12.txt',
					'assets/level13.txt',
					'assets/level14.txt'
				],
				dest: 'assets/levels.txt',
				options: {
					separator: '&'
				},
			},
			source: {
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
        replace: {
            assets: {
                src: ['build/*.js'],
                overwrite: true,                 // overwrite matched source files
                replacements: [{
                    from: "assets/",
                    to: ""
                }]
            }
        },
		'closure-compiler': {
			game: {
				closurePath: 'closure',
				js: 'build/compiled.js',
				jsOutputFile: 'build/c.js',
                noreport: true,
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
					{expand: true, flatten: true, src: ['assets/*'], dest: 'build/', filter: 'isFile'},
				],
			},
		},
        clean:
        {
            compiled: ["build/compiled.js"],
            build: ["build/game.zip"]
        }
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-clean');
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
	grunt.registerTask('build', ['concat', 'closure', 'replace', 'clean']);
	grunt.registerTask('build-compress', ['build', 'compress:main', 'sizecheck']);
	grunt.registerTask('zip', ['compress:main', 'sizecheck']);

};