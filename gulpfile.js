const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
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
  console.log('In gulpfile ' + process.env.NODE_ENV);
  switch(process.env.NODE_ENV){
    case 'TEST': process.env.PORT = process.env.PORT_TEST; console.log(process.env.PORT); break;
    case 'PROD': process.env.PORT = process.env.PORT_PROD; console.log(process.env.PORT); break;
    case 'DEV': process.env.PORT = process.env.PORT_DEV; break;
  }
  const server = gls.new('app.js');
  server.start();
});

gulp.task('coverage', () => {

});
