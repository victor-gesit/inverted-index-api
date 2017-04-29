const gulp = require('gulp');
const jasmineNode = require('gulp-jasmine-node');
const gls = require('gulp-live-server');
const istanbul = require('gulp-istanbul');
const coveralls = require('gulp-coveralls');

require('dotenv').config();

gulp.task('default', () => {
  // Code for default gulp task goes here
});

gulp.task('run-tests', () => {
  gulp.src('tests/inverted-index-test.js')
   .pipe(jasmineNode());
});

gulp.task('serve', () => {
  switch (process.env.NODE_ENV) {
    case 'TEST': process.env.PORT = process.env.PORT_TEST; break;
    case 'PROD': process.env.PORT = process.env.PORT_PROD; break;
    case 'DEV': process.env.PORT = process.env.PORT_DEV; break;
    default: break;
  }
  const server = gls.new('app.js');
  server.start();

  gulp.watch(['routes/*.js', 'src/*.js'], () => {
    server.start.bind(server)();
  });
  gulp.watch('app.js', () => {
    server.start.bind(server)();
  });
});

gulp.task('pre-test', () => {
  return gulp.src(['src/*.js', 'routes/*.js'])
    // Covering files
    .pipe(istanbul())
    // Force 'require' to return covered files
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], () => {
  return gulp.src(['tests/inverted-index-test.js'])
    .pipe(jasmineNode())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enfore a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('coverage', ['test'], () => {
  return gulp.src('coverage/**/lcov.info')
    .pipe(coveralls());
})