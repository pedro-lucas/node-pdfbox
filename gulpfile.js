const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const shell = require('gulp-shell')
const gutil = require('gulp-util');
const path = require('path');
const sequence = require('run-sequence');
const clean = require('gulp-clean');

gulp.task('clear-test', function() {
	return gulp.src('spec/tmp/page.pdf', {read: false}).pipe(clean());
});

gulp.task('test', ['clear-test'], function() {
	return gulp.src('spec/simple-test.js').pipe(jasmine({verbose:true}));
});

gulp.task('java-compile', shell.task([
  'javac -classpath .:"' + path.join(__dirname, 'src-library/*')
	+ '" ' + path.join(__dirname, 'src-java/br/com/appmania/*.java')
]));

gulp.task('java-copy', function() {
	return gulp.src('src-java/**/*.class')
	.pipe(gulp.dest('out/production/node-pdfbox'));
});

gulp.task('java-clean', function() {
	return gulp.src('src-java/**/*.class')
	.pipe(clean());
});

gulp.task('compile', function(done) {
	sequence('java-compile', 'java-copy', 'java-clean', done);
});

gulp.task('default', function(done) {
	sequence('compile', 'test', done);
});
