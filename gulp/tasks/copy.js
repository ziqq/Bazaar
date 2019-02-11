var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var newer = require('gulp-newer');
var runSequence = require('run-sequence');
var config = require('../config.js');

gulp.task('copy:fonts', function() {
    return gulp
        .src(config.src.fonts + '/**/*.*')
        .pipe(gulp.dest(config.dest.fonts));
});

gulp.task('copy:data', function() {
    return gulp
        .src(config.src.data + '/**/*.*')
        .pipe(gulp.dest(config.dest.data));
});

gulp.task('copy:lib', function() {
    return gulp
        .src(config.src.lib + '/**/*.*')
        .pipe(gulp.dest(config.dest.lib));
});

gulp.task('copy:rootfiles', function() {
    return gulp.src(config.src.root + '/*.*').pipe(gulp.dest(config.dest.root));
});

gulp.task('copy:img', function() {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,7z,mp4}',
            '!' + config.src.img + '/svgo/**/*.*'
        ])
        .pipe(newer(config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,7z}'))
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy:img:production', function() {
    return gulp
        .src([
            config.src.img + '/**/*.{jpg,png,jpeg,svg,gif,mp4}',
            '!' + config.src.img + '/svgo/**/*.*'
        ])
        .pipe(
            imagemin({
                optimizationLevel: 3
            })
        )
        .pipe(gulp.dest(config.dest.img));
});

gulp.task('copy', [
    'copy:img',
    // 'copy:rootfiles',
    // 'copy:lib',
    // 'copy:data',
    'copy:fonts'
]);

gulp.task('copy:production', function(cp) {
    runSequence(
        'copy:libs',
        'copy:fonts',
        'copy:img:production',
        'copy:rootfiles',
        'copy:files',
        cp
    );
});

gulp.task('copy:watch', function() {
    gulp.watch(config.src.img + '/*', ['copy']);
});
