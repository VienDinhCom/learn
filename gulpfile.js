const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const insert = require('gulp-insert');
const inject = require('gulp-inject-string');
const indent = require("gulp-indent");
const eslint = require('gulp-eslint');
const tap = require("gulp-tap");
const bufferReplace = require('buffer-replace');
const gulpStylelint = require('gulp-stylelint');
const autoprefixer = require('gulp-autoprefixer');
const handlebars = require('gulp-hb');
var layouts = require('handlebars-layouts');
var rename = require("gulp-rename");
var prettify = require('gulp-jsbeautifier');
var htmlmin = require('gulp-htmlmin');

const blocksDir = 'src/blocks';

gulp.task('scripts', function () {

    const blocks = fs.readdirSync(blocksDir)
        .filter(item => fs.lstatSync(path.join(blocksDir, item)).isDirectory())
        .map(block => path.join(blocksDir, block, `${block}.js`));

    return gulp.src(blocks)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(indent({
            tabs: false,
            amount: 2
        }))
        .pipe(insert.prepend('$( ${#block} ).exists( function() {\n'))
        .pipe(insert.append('\n});'))
        .pipe(tap(function (file, t) {

            const block = `'.${path.basename(file.path).replace(path.extname(file.path), '')}'`;

            file.contents = bufferReplace(Buffer(file.contents), '${#block}', block);
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('blocks.js', { newLine: '\n\n' }))
        .pipe(eslint({ fix: true }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets'));
});

gulp.task('styles', function () {

    const blocks = fs.readdirSync(blocksDir)
        .filter(item => fs.lstatSync(path.join(blocksDir, item)).isDirectory())
        .map(block => path.join(blocksDir, block, `${block}.scss`));


    return gulp.src(blocks)
        .pipe(sourcemaps.init())
        // .pipe(gulpStylelint({
        //     failAfterError: false,
        //     reporters: [
        //         { formatter: 'string', console: true },
        //     ],
        // }))
        .pipe(tap(function (file, t) {

            const block = `.${path.basename(file.path).replace(path.extname(file.path), '')}`;

            file.contents = bufferReplace(Buffer(file.contents), ':root', block);
        }))
        .pipe(sass({ outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                "Android 2.3",
                "Android >= 4",
                "Chrome >= 20",
                "Firefox >= 24",
                "Explorer >= 8",
                "iOS >= 6",
                "Opera >= 12",
                "Safari >= 6"
            ],
            cascade: false
        }))
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
                { formatter: 'string', console: true },
            ],
        }))
        .pipe(concat('blocks.css', { newLine: '\n' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets'));
        
});


gulp.task('templates', function () {

    const blocks = fs.readdirSync(blocksDir)
        .filter(item => fs.lstatSync(path.join(blocksDir, item)).isDirectory())
        .map(block => path.join(blocksDir, block, `${block}.scss`));


    return gulp.src('src/*.hbs')
        .pipe(handlebars().partials('src/*.hbs').helpers(layouts))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(prettify({
            html: {
                file_types: ['.hbs']
            },
            indent_size: 2,
            indent_char: ' '
        }))
        .pipe(rename((path) => {
            path.extname = ".html"
        }))
        .pipe(gulp.dest('dist'));

});