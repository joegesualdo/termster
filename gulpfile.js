var gulp = require('gulp');
var browserify = require('browserify');
// vinle-source-stream transforms stream from browserify to 
//   gulp-like streams (called through-streams).
var source = require('vinyl-source-stream');
var rename = require('gulp-rename')
var babelify = require('babelify');
var sass = require('gulp-sass')
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var server = require("./server.js")

gulp.task('convert-jsx', function (){
  // http://egorsmirnov.me/2015/05/25/browserify-babelify-and-es6.html
  var bundler = browserify({entries: ['./app/scripts/app.jsx', './index.js']})
    bundler.transform(babelify, {presets: ['react']})
    var stream = bundler.bundle()
    return stream
      // vinle-source-stream transforms stream from browserify to 
      //   gulp-like streams (called through-streams).
      .pipe(source('index.js'))
      .pipe(gulp.dest('public'));
});

gulp.task('compile-demo-css', function(){
  return gulp.src("./app/stylesheets/demo/demo.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("index.css"))
    .pipe(gulp.dest('public'));
})
gulp.task('compile-termster-css', function(){
  return gulp.src("./app/stylesheets/termster/termster.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("termster.css"))
    .pipe(gulp.dest('public'));
})

gulp.task('lint', function() {
  return gulp.src('./app/scripts/**/*')
    .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }))
    .pipe(jshint.reporter(stylish))
});

gulp.task('watch', function(){
  gulp.watch("app/stylesheets/**/*", ['compile-demo-css', 'compile-termster-css']);
  gulp.watch("app/scripts/**/*", ['convert-jsx', 'lint']);
});

gulp.task('start-server', function(){
  server.createServer()
})

gulp.task("default", ["compile-demo-css", "compile-termster-css", "convert-jsx", "watch", "start-server"], function(){
})


