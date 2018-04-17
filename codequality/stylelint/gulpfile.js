const gulp = require('gulp');
const gulpStylelint = require('gulp-stylelint');

gulp.task('stylelint', (done) => {

  return gulp
    .src('src/**/*.scss')
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ],
    }));
});


gulp.task('stylelint-fix', (done) => {
  return gulp
    .src('src/**/*.scss')
    .pipe(gulpStylelint({fix: true}))
    .pipe(gulp.dest('src'));
});

gulp.task('default', ['stylelint-fix', 'stylelint']);