'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    jade = require('gulp-jade'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');




gulp.task('connect', function() {
  connect.server({
    root: 'public',
    livereload: true
  });
});


gulp.task('jade',function(){
  gulp.src('app/jade/*.jade')
      .pipe(jade({pretty: true})).on('error',console.log)
      .pipe(gulp.dest('./public'))
      .pipe(connect.reload());
});


gulp.task('sass',function(){
  gulp.src('app/sass/style.scss')
	.pipe(concat('build.scss'))
	.pipe(sass({
		outputStyle:"expanded"
	})).on('error',console.log)
	.pipe(rename("build.min.css"))
	.pipe(gulp.dest('./public/css'))
  .pipe(connect.reload());
});


gulp.task('watch',function(){
  gulp.watch('app/jade/*.jade',['jade']);
  gulp.watch('app/sass/*.scss',['sass']);
});


gulp.task('default',['jade','sass','watch','connect']);
