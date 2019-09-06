const { src, dest, watch, series } = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

function clean(cb) {
    return del(['dist', 'src/css'], cb);
}

function scss() {
    return src('src/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))//outputStyle: expanded,compact,compressed
        .pipe(postcss())
        .pipe(dest('src/css'))//输出未压缩的css
        .pipe(cleanCSS({ compatibility: 'ie9' }))//压缩代码，兼容浏览器，优化代码
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest('dist'));
}

function devJs(){
    return src('src/js/**/*.js')
        // .pipe(sourcemaps.init())
        .pipe(babel({
            sourceMap: 'inline',
            // presets: ['@babel/env'],
            // plugins: ['@babel/transform-runtime']
        }))
        .pipe(concat('index.min.js'))
        // .pipe(sourcemaps.write('.'))
        .pipe(dest('dist'))
}

function distJs(){
    return src('src/js/**/*.js')
        .pipe(babel({
            minified: true,//压缩
            comments: false,
            sourceType: 'script',//No import/export statements allowed, and files are not in strict mode.
            // presets: ['@babel/env'],
            // plugins: ['@babel/transform-runtime']
        }))
        .pipe(concat('index.min.js'))//合并
        .pipe(dest('dist'))
}

function copy(){
    return src('src/img/**')
        .pipe(dest('dist/img'));
}

function view(){
    return src(['src/index.pug','src/index_en.pug'])
        .pipe(pug({ }))
        .pipe(dest('dist'))
}

// series   从左至右依次串行执行任务
// parallel 并行执行任务
const dev = series(clean, copy, scss, devJs, view);
exports.build = series(clean, copy, scss, distJs, view);
exports.default = function(){
    dev();
    watch('src/scss/**/*.scss', scss);
    watch('src/js/**/*.js', devJs);
    watch('src/**/*.pug', view);
};
