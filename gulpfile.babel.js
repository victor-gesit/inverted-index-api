import gulp from 'gulp';
import jasmineNode from 'gulp-jasmine-node';
import gls from 'gulp-live-server';
import istanbul from 'gulp-istanbul';
import coveralls from 'gulp-coveralls';
import babel from 'gulp-babel';

// const gulp = require('gulp');
// const jasmineNode = require('gulp-jasmine-node');
// const gls = require('gulp-live-server');
// const istanbul = require('gulp-istanbul');
// const coveralls = require('gulp-coveralls');
// const babel = require('gulp-babel');

require('dotenv').config();

gulp.task('default', () => {
  // Code for default gulp task goes here
});

// Transpile to ES6

gulp.task('serve', () => {
  const server = gls.new('index.js');
  server.start();

  gulp.watch(['routes/*.js', 'src/*.js', 'app.js'], () => {
    server.start.bind(server)();
  });
});

gulp.task('run-tests', () => {
  gulp.src('tests/inverted-index-test.js')
    .pipe(babel())
    .pipe(jasmineNode());
});

gulp.task('pre-test', () =>
  gulp.src(['src/*.js', 'routes/*.js'])
    .pipe(babel())
    // Covering files
    .pipe(istanbul())
    // Force 'require' to return covered files
    .pipe(istanbul.hookRequire())
);

gulp.task('test', ['pre-test'], () =>
  gulp.src(['tests/inverted-index-test.js'])
    .pipe(babel())
    .pipe(jasmineNode())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enfore a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }))
);

gulp.task('coverage', ['test'], () =>
  gulp.src('coverage/**/lcov.info')
    .pipe(coveralls())
);
