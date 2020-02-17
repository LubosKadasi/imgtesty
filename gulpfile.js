var gulp = require('gulp');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  css: {
    src: './_src/css/**/*',
    dest: './build/'
  },
  js: {
    src: './_src/js/**/*',
    dest: './build/'
  }
};

/*
 * Define our tasks using plain functions
 */
function styles() {
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init({
      largeFile: true
    }))
    .pipe(sass())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      basename: 'app',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(paths.css.dest));
}

function scripts() {
  return gulp.src(paths.js.src, { sourcemaps: true })
    .pipe(sourcemaps.init({
      largeFile: true
    }))
    .pipe(babel())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(paths.js.dest));
}

function watch() {
  gulp.watch(paths.js.src, scripts);
  gulp.watch(paths.css.src, styles);
}

/*
 * Specify if tasks run in series or parallel using `gulp.series` and `gulp.parallel`
 */
var build = gulp.parallel(styles, scripts);

/*
 * You can use CommonJS `exports` module notation to declare tasks
 */
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;