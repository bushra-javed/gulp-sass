
// "use strict";
//import gulp from 'gulp';
const gulp=require('gulp');
const browserSync=require('browser-sync').create();
const sass=require('gulp-sass');
//const autoprefixer=require('gulp-autoprefixer');


//compile sass
gulp.task('sass',function(){

return gulp.src(['src/sass/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});


// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./src"  
    });

    gulp.watch(['src/sass/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve']);