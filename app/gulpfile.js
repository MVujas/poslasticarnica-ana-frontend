var webserver = require('gulp-webserver');
var path = require('path');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
global.gulp = require('gulp');

global.micansPaths = {
  app: path.resolve('.'),
  jsGlob: path.resolve('./scripts/**/*.js'),
  jsEntry: path.resolve('./scripts/app.js')
};

gulp.task('webserver',['javascript'], function setupWebServer(){
  gulp.src(micansPaths.app)
      .pipe(webserver({
        host: process.env.IP,
        port: process.env.PORT,
      }));
});

gulp.task('javascript',['watch'], function() {

  var bundler = browserify({
    entries: [micansPaths.jsEntry],
    debug: true
  });

  var bundle = function() {
    return bundler
      .bundle()
      .on('error', function(err){
        console.log(err.toString());
      })
      .pipe(source('ana.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./dist/'));
  };

  return bundle();
});

gulp.task('watch', function initWatchers() {
  gulp.watch(micansPaths.jsGlob, ['javascript']);
});

gulp.task('default', ['webserver', 'watch']);