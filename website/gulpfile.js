var fs = require("fs");
var gulp = require('gulp');
var minifyCSS = require('gulp-csso');
var dom = require('gulp-jsdom');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var hash = require('gulp-hash');
var replace = require('gulp-replace');

gulp.task('css', function(){
  return gulp.src('build/developers/css/main.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/developers/css/main.min.css'))
});

gulp.task('hash', function(cb){
  return gulp.src('build/developers/css/main.css')
    .pipe(hash())
    .pipe(gulp.dest('build/developers/css'))
    .pipe(hash.manifest('build/developers/assets.json', {
    	  deleteOld: true,
    	  sourceDir: __dirname + '/build/developers'
    	}))
    .pipe(gulp.dest('.'));
});

gulp.task('replace', ['hash'], function(){
  var manifest = JSON.parse(fs.readFileSync(__dirname + '/build/developers/assets.json', 'utf8'));
  gulp.src(['build/developers/*.html'])
    .pipe(replace('main.css', manifest['main.css']))
    .pipe(gulp.dest('build/developers'));
});

gulp.task('replaceDocs', ['hash'], function(){
  var manifest = JSON.parse(fs.readFileSync(__dirname + '/build/developers/assets.json', 'utf8'));
  gulp.src(['build/developers/docs/*.html'])
    .pipe(replace('main.css', manifest['main.css']))
    .pipe(gulp.dest('build/developers/docs'));
});

gulp.task('replacePages', ['hash'], function(){
  var manifest = JSON.parse(fs.readFileSync(__dirname + '/build/developers/assets.json', 'utf8'));
  gulp.src(['build/developers/en/*.html'])
    .pipe(replace('main.css', manifest['main.css']))
    .pipe(gulp.dest('build/developers/en'));
});

gulp.task('replaceDocsEn', ['hash'], function(){
  var manifest = JSON.parse(fs.readFileSync(__dirname + '/build/developers/assets.json', 'utf8'));
  gulp.src(['build/developers/docs/en/*.html'])
    .pipe(replace('main.css', manifest['main.css']))
    .pipe(gulp.dest('build/developers/docs/en'));
});

gulp.task('viewPort', function() {
  return gulp.src('build/developers/index.html')
    .pipe(dom(function(){
        return this.querySelectorAll('[name="viewport"]')[0].setAttribute('content', 'width=device-width, initial-scale=1.0');
    }))
    .pipe(gulp.dest('build/developers'));
});

gulp.task('viewPortEn', function() {
  return gulp.src('build/developers/en/index.html')
    .pipe(dom(function(){
        return this.querySelectorAll('[name="viewport"]')[0].setAttribute('content', 'width=device-width, initial-scale=1.0');
    }))
    .pipe(gulp.dest('build/developers/en'));
});

gulp.task('default', [ 'css', 'hash', 'viewPort', 'viewPortEn', 'replace', 'replaceDocs', 'replacePages', 'replaceDocsEn' ]);
