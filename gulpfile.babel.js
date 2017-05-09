import gulp from 'gulp';
import jasmineNode from 'gulp-jasmine-node';
import gulpLiveServer from 'gulp-live-server';
import babel from 'gulp-babel';
import injectModules from 'gulp-inject-modules';
import gulpBabelIstanbul from 'gulp-babel-istanbul';
import gulpCoveralls from 'gulp-coveralls';
import env from 'gulp-env';
import dotenv from 'dotenv';

dotenv.config();

// This task starts the server
gulp.task('serve', () => {
  env.set({ 'proces.env.NODE_ENV': 'PROD' });
  const server = gulpLiveServer.new('index.js');
  server.start();

  gulp.watch(['routes/*.js', 'src/*.js', 'app.js'], () => {
    server.start.bind(server)();
  });
});
// This task runs jasmine tests and outputs the result to the cli.
gulp.task('run-tests', () => {
  gulp.src('tests/inverted-index-test.js')
    .pipe(babel())
    .pipe(injectModules())
    .pipe(jasmineNode());
});
// Gulp coverage implicitly depends on run-tests.
gulp.task('coverage', () => {
  gulp.src(['src/*.js', 'routes/*.js'])
    .pipe(gulpBabelIstanbul())
    .pipe(gulpBabelIstanbul.hookRequire())
    .on('finish', () => {
      gulp.src('tests/inverted-index-test.js')
      .pipe(babel())
      .pipe(injectModules())
      .pipe(jasmineNode())
      .pipe(gulpBabelIstanbul.writeReports())
      .pipe(gulpBabelIstanbul.enforceThresholds({ thresholds: { global: 30 } }))
      .on('end', () => {
        gulp.src('coverage/lcov.info')
        .pipe(gulpCoveralls());
      });
    });
});
