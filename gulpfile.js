const gulp = require('gulp');
const jasmine = require('gulp-jasmine');

gulp.task('test', () =>
	gulp.src('spec/simple-test.js').pipe(jasmine())
);

gulp.task('default', () => {
  console.log('nothing to do here for now')
});
