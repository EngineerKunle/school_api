'use strict';
const gulp      = require('gulp'),
sass            = require('gulp-sass'),
connect         = require('gulp-connect'),
uglify          = require('gulp-uglify'),
shell           = require('gulp-shell'),
pump            = require('pump');

var filesLocation = {
    dis          : 'dist/css',
    htmlSource   : 'src/front_end/html/index.html', 
    distCss      : 'dist/css/',
    sassFiles    : 'src/front_end/scss/styles.scss',
    jsFiles      : 'src/front_end/js/*.js',
    distJs       : 'dist/js/',
    apiRunFile   : 'src/api/**'
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

// create api method to stop me from refresh 
gulp.task('run-api:watch', function() {
    gulp.watch(filesLocation.apiRunFile, ['run-api'])
});

gulp.task('run-api', () => {
    return gulp.src(filesLocation.apiRunFile).pipe(shell('npm run api'))
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