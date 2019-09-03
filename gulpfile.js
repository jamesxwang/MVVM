var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var paths = {
  scripts: {
    src: 'src/*.js',
    dest: 'dist/scripts/'
  }
};

function clean() {
    return del([ 'dist' ]);
}

function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('mvvm.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    gulp.watch(paths.scripts.src, scripts);
}

var build = gulp.series(clean, gulp.parallel(scripts));

exports.clean = clean;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;