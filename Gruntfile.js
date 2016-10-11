module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    sourcemap: true
                },
                files: {
                    'public/css/style.css' : 'style.scss'
                }
            }
        },
        concat: {
            gopjs:{
                src:'public/js/**/*.js',
                dest:'public/all.js'
            }
        },

        uglify:{
            nenjs:{
                src:'public/all.js',
                dest:'public/all.min.js'
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            },
            scripts: {
                files: ['public/js/**/*.js'],
                tasks: ['concat','uglify'],
                options: {
                    spawn: false
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default',['watch']);
}