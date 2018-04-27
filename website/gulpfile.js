var fs = require("fs");
var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var dom = require('gulp-jsdom');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var hash = require('gulp-hash');
var replace = require('gulp-replace');

gulp.task('viewPort', function() {
  return gulp.src('build/developers/index.html')
    .pipe(dom(function(){
        return this.querySelectorAll('[name="viewport"]')[0].setAttribute('content', 'width=device-width, initial-scale=1.0');
    }))
    .pipe(gulp.dest('build/developers'));
});

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
  gulp.src(['build/developers/*.html'])
    .pipe(replace('main.css', manifest['main.css']))
    .pipe(gulp.dest('build/developers'));
});

gulp.task('replaceDocs', function(){
  var manifest = JSON.parse(fs.readFileSync(__dirname + '/static/assets.json', 'utf8'));
  gulp.src(['build/developers/docs/*.html'])
    .pipe(replace('main.css', manifest['main.css']))
    .pipe(gulp.dest('build/developers/docs'));
});

gulp.task('replaceDocsEn', function(){
  var manifest = JSON.parse(fs.readFileSync(__dirname + '/static/assets.json', 'utf8'));
  gulp.src(['build/developers/docs/en/*.html'])
    .pipe(replace('main.css', manifest['main.css']))
    .pipe(gulp.dest('build/developers/docs/en'));
});

// <meta name="viewport" content="width=device-width, initial-scale=1">

gulp.task('js', function(){
  return gulp.src('client/javascript/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});

gulp.task('default', [ 'viewPort', 'css', 'hash', 'replace', 'replaceDocs', 'replaceDocsEn' ]);
