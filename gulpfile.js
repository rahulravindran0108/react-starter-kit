var gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  webserver = require('gulp-webserver');


var src = "./src",
    app = "./build";

// html page
gulp.task('html', function() {
  return gulp.src(src + '/index.html')
    .pipe(gulp.dest(app+"/"));
});

// js files
gulp.task('js', function() {
  return gulp.src(src + '/js/main.js')
    .pipe(browserify({
      transform: 'reactify',
      debug: true
    }))
    .on('error', function(err) {
      console.error('Error!', err.message);
    })
    .pipe(gulp.dest(app + '/js'));
});

// css files
gulp.task('css', function() {
  return gulp.src(src+ '/css/**/*')
  .pipe(gulp.dest(app+'/css/'));
});

// watcher task
gulp.task('watch', function() {
  gulp.watch(src + '/js/**/*', ['js']);
  gulp.watch([src + '/**/*.html'], ['html']);
  gulp.watch( src + '/css/**/*.css', ['css']);
});

// webserver example
gulp.task('webserver', function() {
  gulp.src(app + "/")
    .pipe(webserver({
      livereload: true,
      open: true
    }));
});

gulp.task('default', ['watch', 'html', 'css', 'js', 'webserver']);
