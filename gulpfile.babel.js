import gulp from 'gulp';
import jasmineNode from 'gulp-jasmine-node';
import gls from 'gulp-live-server';
import istanbul from 'gulp-istanbul';
import babel from 'gulp-babel';
import injectModules from 'gulp-inject-modules';
import gulpBabelIstanbul from 'gulp-babel-istanbul';


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



gulp.task('coverage', (cb) =>{
  gulp.src(['src/*.js', 'routes/*.js'])
    .pipe(gulpBabelIstanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', () =>{
      gulp.src('tests/inverted-index-test.js')
      .pipe(babel())
      .pipe(injectModules())
      .pipe(jasmineNode())
      .pipe(istanbul.writeReports())
      .pipe(istanbul.enforceThresholds({ thresholds: { global: 30 } }))
      .on('end', cb);
    });
});
