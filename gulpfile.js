var gulp = require('gulp');
var del = require('del');
// var rename = require('gulp-rename');

var babel = require('gulp-babel');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// var less = require('gulp-less');
// var cleanCSS = require('gulp-clean-css');

var paths = {
//   styles: {
//     src: 'src/styles/**/*.less',
//     dest: 'dist/styles/'
//   },
  scripts: {
    src: 'src/*.js',
    dest: 'dist/scripts/'
  }
};

function clean() {
    return del([ 'dist' ]);
}

// function styles() {
//     return gulp.src(paths.styles.src)
//       .pipe(less())
//       .pipe(cleanCSS())
//       // pass in options to the stream
//       .pipe(rename({
//         basename: 'main',
//         suffix: '.min'
//       }))
//       .pipe(gulp.dest(paths.styles.dest));
//   }
  

function scripts() {
    return gulp.src(paths.scripts.src, { sourcemaps: true })
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat('mvvm.min.js'))
        .pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
    gulp.watch(paths.scripts.src, scripts);
    // gulp.watch(paths.styles.src, styles);
}

var build = gulp.series(clean, gulp.parallel(scripts));

exports.clean = clean;
// exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
/*
 * Define default task that can be called by just running `gulp` from cli
 */
exports.default = build;