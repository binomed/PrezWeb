"use strict";
// Include gulp
var fs = require("fs");
var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps")
var path = require("path");
var browserSync = require("browser-sync").create();
var sass = require('gulp-sass');
var babelify = require('babelify');
var gutil = require('gulp-util');

var browserify = require("browserify");
var source = require('vinyl-source-stream');
var reload = browserSync.reload;

var extensions = ['.js','.json','.es6'];

gulp.task('serve',['browserify','sass'], function(){
  browserSync.init({
    server:'./'
  });
  gulp.watch("./scss/**/*.scss", ['sass']);
  gulp.watch("./*.html").on('change', reload);
  gulp.watch("./assets/**/*.md").on('change', reload);
  gulp.watch("./scripts/**/*.js",['browserify']);
  gulp.watch("./prez_bundle.js").on('change', reload);
});

gulp.task('sass',function(){
    return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass()).on('error', function logError(error) {
        console.error(error);
    })
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream:true}));  
});

gulp.task('browserify',function(){
  return browserify({entries: './scripts/prez.js', debug:true, extensions: extensions})
    .transform(babelify)
    .on('error', gutil.log)    
    .bundle()    
    .on('error', gutil.log)    
    .pipe(source('prez_bundle.js'))
    .pipe(gulp.dest('./'));
});


/* Default task */
gulp.task("default", ["serve"]);