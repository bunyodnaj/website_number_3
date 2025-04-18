

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


gulp.task('sassC', function() {
  return gulp.src('./sass/*.scss')
    .pipe(sass({style: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./src'))
      .pipe(browserSync.stream())
});


gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './src'
    }
  });

  gulp.watch('./sass/**/*.scss', gulp.parallel('sassC'));
  gulp.watch('src/*html').on('change', browserSync.reload);
  gulp.watch('src/*css').on('change', browserSync.reload);

});


gulp.task('default', gulp.parallel('sassC', 'serve'));
