'use strict'

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    jade = require('gulp-jade'),
    minify = require('gulp-minify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    flatten = require('gulp-flatten'),
    imageop = require('gulp-image-optimization');



var bower_js = [
    "app/bower_components/jquery/dist/jquery.js",
    "app/bower_components/angular/angular.js",
    "app/bower_components/angular-route/angular-route.js",
    "app/bower_components/fancybox/source/jquery.fancybox.js",
]



var bower_css = bowercatalog('app/bower_components/',[
    'reset-css/reset.css',
    'fancybox/source/jquery.fancybox.css'
]);


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
	.pipe(rename("custom_compile.css"))
	.pipe(gulp.dest('./public/css/'))
  .pipe(connect.reload());
});


gulp.task('bower_css',function(){
    gulp.src(bower_css)
        .pipe(concat('bower_compile.css'))
        .pipe(minify())
        .pipe(gulp.dest('public/css/'))
})

gulp.task('watch',function(){
  gulp.watch('app/jade/*.jade',['jade']);
  gulp.watch('app/sass/*.scss',['sass']);
});


gulp.task('bower_javascript',function(){

    
   gulp.src(bower_js)
        .pipe(concat('bower_compile.js'))
        .pipe(minify())
        .pipe(gulp.dest('public/js/'))
});

gulp.task('custom_javascript',function(){
   gulp.src('app/js/*.js')
        .pipe(concat('custom_compile.js'))
        .pipe(minify())
        .pipe(gulp.dest('public/js/'))
});

gulp.task('images',function(){
    gulp.src(['app/img/**/*.png','app/img/**/*.jpg','app/img/**/*.gif','app/img/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('public/img'));
    
    console.log('Optimization ready');
});


gulp.task('font',function(){
    gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('public/fonts'))
});

gulp.task('default',['jade','sass','bower_css','font','images','bower_javascript','custom_javascript','watch','connect']);




function bowercatalog(bower,arr){
    
    var copy = [];
    
    for(var i = 0; i < arr.length; i++){
        copy.push(bower+arr[i]);
    }
    
    return copy;
}