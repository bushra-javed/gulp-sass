
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

// gulp.task('copyHtml',function(){
//     gulp.src('src/*.html')
//     .pipe(gulp.dest('dist'));    
    
// });



// optimize Images 
gulp.task('imageMin',()=>
gulp.src('app/images/*')
.pipe(imagemin())
.pipe(gulp.dest('dist/images'))
);

//minify js   


gulp.task('minify',function(){
    gulp.src('app/js/*.js')
   .pipe(uglify())
   .pipe(gulp.dest('dist/js'));
});

//compile sass
gulp.task('sass',function(){

return gulp.src(['app/sass/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});



gulp.task('copyHtml',function(){

    return gulp.src(['app/*.html'])
            .pipe(gulp.dest('./'))
            .pipe(gulp.dest('dist'))

            // files are duplicated for git pages purpose at root and in dest
            .pipe(browserSync.stream());
    });

    
// Watch Sass & Serve
gulp.task('serve', ['sass','copyHtml'], function() {
    browserSync.init({
        server: "./dist"  
    });

    gulp.watch(['app/sass/*.scss'], ['sass']);
    gulp.watch(['app/*.html'], ['copyHtml']);
    gulp.watch(['app/images/*'], ['imageMin']);
    
    gulp.watch("app/*.html").on('change', browserSync.reload);
});

// Default Task
gulp.task('default', ['serve', 'sass','copyHtml','imageMin']);