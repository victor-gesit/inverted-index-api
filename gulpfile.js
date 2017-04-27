const gulp = require('gulp');
const jasmine = require('gulp-jasmine-node');
const gls = require('gulp-live-server');

require('dotenv').config();

gulp.task('default', () => {
  // Code for default gulp task goes here
});

gulp.task('run-tests', () => {
  gulp.src('tests/inverted-index-test.js')
   .pipe(jasmine());
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

gulp.task('coverage', () => {

});
