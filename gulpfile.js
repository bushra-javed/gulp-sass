
// "use strict";
//import gulp from 'gulp';
const gulp=require('gulp');
const browserSync=require('browser-sync').create();
const sass=require('gulp-sass');
//const autoprefixer=require('gulp-autoprefixer');

const imagemin = require('gulp-imagemin');
const uglify=require('gulp-uglify');
// const concat=require('gulp-concat');


// copy html  this will copy files from src to dist


gulp.task('copyHtml',function(){
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'));    
    
});


// optimize Images 

gulp.task('imageMin',()=>
gulp.src('src/images/.*')
.pipe(imagemin())
.pipe(gulp.dest('dist/images'))
);

//minify js   


gulp.task('minify',function(){
    gulp.src('src/js/*.js')
   .pipe(uglify())
   .pipe(gulp.dest('dist/js'));
});

//compile sass
gulp.task('sass',function(){

return gulp.src(['src/sass/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});


// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./dist"  
    });

    gulp.watch(['src/sass/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve','minify','imageMin']);