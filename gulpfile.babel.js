import gulp         from 'gulp';
import browserify   from 'browserify';
import vsource      from 'vinyl-source-stream';
import babelify     from 'babelify';
import tsify        from 'tsify';
import stringify    from 'stringify';
import browserSync  from 'browser-sync';
import stylus       from 'gulp-stylus';
import postStylus   from 'poststylus';
import sourcemaps   from 'gulp-sourcemaps';
import lost         from 'lost';
import autoprefixer from 'autoprefixer';

const reload = (done) => {
  browserSync.reload();
  done && done();
};

const onError = function (err) {
  console.log(err);
  this.emit('end');
};

gulp.task('stylus', () => {
  return gulp.src('./src/styl/app.styl')
    .pipe(sourcemaps.init())
    .pipe(stylus({
      use: [
        postStylus([lost, autoprefixer])
      ]
    }))
    .on('error', onError)
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

gulp.task('html', () => {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});

gulp.task('es6:angular', () => {
  return browserify({
    entries: './src/js/app.ts',
    debug: true
  }).plugin(tsify)
    .transform(babelify, {extensions: ['.tsx', '.ts']})
    .transform(stringify, {appliesTo: {includeExtensions: ['.html']}})
    .bundle()
    .on('error', onError)
    .pipe(vsource('app.js'))
    .pipe(gulp.dest('./dist/js'));

});

gulp.task('serve', (done) => {
  browserSync.init({
    server: './dist'
  }, done);
});

gulp.task('watch:stylus', () => {
  return gulp.watch('./src/styl/**/*.styl', gulp.series('stylus'));
});

gulp.task('watch:html', () => {
  return gulp.watch('./src/index.html', gulp.series('html', reload));
});

gulp.task('watch:es6', () => {
  return gulp.watch('./src/js/**/*.{js,ts,html}', gulp.series('es6:angular', reload));
});

gulp.task('watch', gulp.parallel('watch:html', 'watch:es6', 'watch:stylus'));

gulp.task('default', gulp.series('html', 'stylus', 'es6:angular', 'serve', 'watch'));
