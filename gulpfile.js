var gulp  = require('gulp'),
    $     = require('gulp-load-plugins')(),
    path  = require('path'),
    port  = process.env.port || 3031;

gulp.task('less', function () {
  return gulp.src('./src/less/index.less')
    .pipe($.sourcemaps.init())
    .pipe($.less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe($.sourcemaps.write('./sourcemaps/'))
    .pipe(gulp.dest('./dist/css/'));
});

// launch browser in a port
gulp.task('open', function(){
  var options = {
    uri: 'http://localhost:' + port
  };
  gulp.src('./dist/index.html')
    .pipe($.open(options));
});

// live reload server
gulp.task('connect', function() {
  $.connect.server({
    port: port,
    root: 'dist',
    livereload: true
  });
});

// live reload css
gulp.task('css', function () {
  gulp.src('./dist/**/*.css')
    .pipe($.connect.reload());
});

// live reload js
gulp.task('js', function () {
  gulp.src('./dist/**/*.js')
    .pipe($.connect.reload());
});

// live reload html
gulp.task('html', function () {
  gulp.src('./dist/**/*.html')
    .pipe($.connect.reload());
});




// watch files for live reload
gulp.task('watch', function() {
  gulp.watch('./src/less/**/*.less', ['less']);
  gulp.watch('./dist/css/*.css', ['css']);
  gulp.watch('./dist/js/*.js', ['js']);
  gulp.watch('./dist/index.html', ['html']);
});

gulp.task('serve', ['connect', 'open', 'watch']);
