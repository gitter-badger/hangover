;(function(gulp) {

    var path = require('path');

    var paths = {
        js: path.join('assets/js/'),
    };

    var files = {
        js: [
            path.join(paths.js, '*.js'),
            path.join(paths.js, 'vendors/*/*.min.js'),
            path.join(paths.js, 'app/*.js'),
            path.join(paths.js, 'app/*/*.js')
        ]
    };

    var gutil = require('gulp-util');
    var jshint = require('gulp-jshint');
    var sass = require('gulp-sass');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var rename = require('gulp-rename');
    var watch = require('gulp-watch');
    var imagemin = require('gulp-imagemin');
    var sourcemaps = require('gulp-sourcemaps');
    var debug = require('gulp-debug');
    var bower = require('gulp-bower');

    /**
     * Bower routine
     */
    gulp.task('bower', function() {
        gutil.log("JS : install required vendors");

        return bower(paths.js + 'vendors')
            .pipe(gulp.dest(paths.js + 'vendors'));
    });

    /**
     * Script routine
     */
    gulp.task('scripts', function() {
        gutil.log("JS : concat and uglifycation for files presents in : ");

        for (var k in files.js) {
            gutil.log(files.js[k]);
        }

        gutil.log("Destination is : ", paths.js + 'build');

        return gulp.src(files.js)
            .pipe(sourcemaps.init())
            .pipe(concat('all.js'))
            .pipe(gulp.dest(paths.js + 'build'))
            .pipe(rename('all.min.js'))
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.js + 'build'));
    });

    /**
     * Watch routine
     */
    gulp.task('watch', function() {
        gulp.watch(files.js, ['scripts']);
    });

    // Registering tasks

    gulp.task('default', ['watch', 'bower', 'scripts']);

})(require('gulp'));