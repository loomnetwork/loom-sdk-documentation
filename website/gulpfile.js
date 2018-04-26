var fs = require("fs");
var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var hash = require('gulp-hash');
var replace = require('gulp-replace');

gulp.task('css', function(){
  return gulp.src('build/developers/css/main.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/developers/css/main.min.css'))
});

gulp.task('hash', function(){
  return gulp.src('build/developers/css/main.css')
    .pipe(hash())
    .pipe(gulp.dest('build/developers/css'))
    .pipe(hash.manifest('static/assets.json', {
    	  deleteOld: true,
    	  sourceDir: __dirname
    	}))
    .pipe(gulp.dest('.'));
});

gulp.task('replace', function(){
  var manifest = JSON.parse(fs.readFileSync(__dirname + '/static/assets.json', 'utf8'));
  gulp.src(['build/developers/index.html'])
    .pipe(replace('main.css', manifest['main.css']))
    .pipe(gulp.dest('build/developers'));
});


gulp.task('js', function(){
  return gulp.src('client/javascript/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});

gulp.task('default', [ 'css', 'hash', 'replace' ]);
