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
  var bundler = browserify('./src/scripts/app.jsx')
    bundler.transform(babelify, {presets: ['react']})
    var stream = bundler.bundle()
    return stream
      // vinle-source-stream transforms stream from browserify to 
      //   gulp-like streams (called through-streams).
      .pipe(source('index.js'))
      .pipe(gulp.dest('public'));
});

gulp.task('compile-css', function(){
  return gulp.src("./src/stylesheets/app.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(rename("index.css"))
    .pipe(gulp.dest('public'));
})

gulp.task('lint', function() {
  return gulp.src('./src/scripts/**/*')
    .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }))
    .pipe(jshint.reporter(stylish))
});

gulp.task('watch', function(){
  gulp.watch("src/stylesheets/**/*", ['compile-css']);
  gulp.watch("src/scripts/**/*", ['convert-jsx', 'lint']);
});

gulp.task('start-server', function(){
  server.createServer()
})

gulp.task("default", ["compile-css", "convert-jsx", "watch", "start-server"], function(){
})

