const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const shell = require('gulp-shell')
const gutil = require('gulp-util');
const path = require('path');
const sequence = require('run-sequence');

gulp.task('test', function() {
	gulp.src('spec/simple-test.js').pipe(jasmine());
});

gulp.task('compile', shell.task([
  'javac -classpath .:' + path.join(__dirname, 'pdfbox.jar') + ' ' + path.join(__dirname, 'src-java/br/com/appmania/*.java')
]));

gulp.task('compiled', ['compile'], function() {
	gutil.log(gutil.colors.green('Java classes compiled'));
});

gulp.task('default', function(callback) {
	sequence('compiled', 'test', callback);
});
