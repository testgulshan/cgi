var gulp = require('gulp'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    cleanCss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

var paths = {
  less: 'src/less/*.less',
  html: ['src/*.html', '*.html'],
  images: 'src/images/**/*',
  js: 'src/js/*.js',
  dist: 'dist'
}

// LESS TASK
gulp.task('less', function() {
  return gulp.src('src/less/main.less')
    .pipe(less())
    .pipe(gulp.dest(paths.dist + '/css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.dist + '/css'))
    .pipe(browserSync.stream());
});

// HTML TASK
gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(browserSync.stream());
});

// JS TASK
gulp.task('js', function() {
  return gulp.src(paths.js)
    .pipe(gulp.dest(paths.dist + '/js'))
    .pipe(browserSync.stream());
});

// IMAGES TASK
gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.dist + '/images'))
    .pipe(browserSync.stream());
});

// WATCH TASK
gulp.task('watch', function() {
  gulp.watch(paths.less, ['less']);
  gulp.watch(paths.js, ['js']);
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.images, ['images']);
});

// BROWSER SYNC TASK
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// DEFAULT TASK
gulp.task('default',['less', 'html', 'js', 'images', 'browser-sync', 'watch']);