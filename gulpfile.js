const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const px2rem = require('postcss-px2rem');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const processors = [px2rem({ remUnit: 75 })];

function clean(cb) {
  return del(['dist', 'src/css'], cb);
}

function copy() {
  src('src/img/**').pipe(dest('dist/img'));
  return src('src/font/**')
    .pipe(dest('dist/font'))
    .pipe(reload({ stream: true }));
}

function scss() {
  return (
    src('src/scss/*.scss')
      .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) //outputStyle: expanded,compact,compressed
      .pipe(postcss(processors))
      .pipe(dest('src/css')) //输出未压缩的css
      .pipe(cleanCSS({ compatibility: 'ie9' })) //压缩代码，兼容浏览器，优化代码
      // .pipe(rename({ suffix: '.min' }))
      .pipe(dest('dist'))
      .pipe(reload({ stream: true }))
  );
}

function devJs() {
  return (
    src('src/js/**/*.js')
      // .pipe(
      //   babel({
      //     sourceMap: 'inline',
      //     // presets: ['@babel/env'],
      //     // plugins: ['@babel/transform-runtime']
      //   }),
      // )
      // .pipe(concat('index.js'))
      .pipe(dest('dist'))
      .pipe(reload({ stream: true }))
  );
}

function distJs() {
  return src('src/js/**/*.js')
    .pipe(
      babel({
        minified: true, //压缩
        comments: false,
        sourceType: 'script', //No import/export statements allowed, and files are not in strict mode.
        // presets: ['@babel/env'],
        // plugins: ['@babel/transform-runtime']
      }),
    )
    // .pipe(concat('index.js')) //合并
    .pipe(dest('dist'));
}

function html() {
  return src('src/*.pug')
    .pipe(pug({ pretty: true, locals: { title: 'wallet' } }))
    .pipe(dest('dist'))
    .pipe(reload({ stream: true }));
}

// series   从左至右依次串行执行任务
// parallel 并行执行任务
const devTask = parallel(copy, scss, devJs, html);
const productionTask = parallel(copy, scss, distJs, html);
const dev = series(clean, devTask);

exports.build = series(clean, productionTask);
exports.default = function () {
  dev();
  browserSync({
    //hot-reload
    server: {
      baseDir: 'dist',
    },
  });
  watch('src/scss/**/*.scss', scss);
  watch('src/js/**/*.js', devJs);
  watch('src/**/*.pug', html);
  watch('src/img/**', copy);
  watch('src/font/**', copy);
};
