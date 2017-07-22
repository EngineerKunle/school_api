'use strict';
const gulp      = require('gulp'),
sass            = require('gulp-sass'),
connect         = require('gulp-connect'),
uglify          = require('gulp-uglify'),
pump            = require('pump');

var filesLocation = {
    dis          : 'dist/css',
    htmlSource   : 'src/front_end/html/index.html', 
    distCss      : 'dist/css/',
    sassFiles    : 'src/front_end/scss/styles.scss',
    jsFiles      : 'src/front_end/js/*.js',
    distJs       : 'dist/js/'
}
// Move HTML 
gulp.task('moveHTML', function() {
    gulp.src(filesLocation.htmlSource)
    .pipe(gulp.dest('dist/'));
});

// handles sass to css
gulp.task('sass', function() {
    return gulp.src(filesLocation.sassFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(filesLocation.distCss));
});

gulp.task('sass:watch', function () {
  gulp.watch(filesLocation.sassFiles, ['sass']);
});

// handles javascript
gulp.task('compress', function (cb) {
  pump([
      gulp.src(filesLocation.jsFiles),
      uglify(),
      gulp.dest(filesLocation.distJs)
    ],
    cb
  );
});

//handles connecting to local hosts
gulp.task('connect', function() {
    connect.server({
        name       : 'School API', 
        root       : 'dist/',
        port       : 8080,
        livereload : true
    });
});

gulp.task('dev', ['moveHTML','sass',"compress", 'connect']);