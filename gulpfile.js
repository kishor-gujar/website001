var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

var sourcemaps = require('gulp-sourcemaps');
var gulpFlatmap = require('gulp-flatmap');

var pkg = require('./package.json');

// Copy third party libraries from /node_modules into /vendor
gulp.task('vendor', function() {
    // Bootstrap
    gulp.src([
        './node_modules/bootstrap/dist/**/*',
        '!./node_modules/bootstrap/dist/css/bootstrap-grid*',
        '!./node_modules/bootstrap/dist/css/bootstrap-reboot*'
    ])
    .pipe(gulp.dest('app/vendor/bootstrap'))

    // jQuery
    gulp.src([
        './node_modules/jquery/dist/*',
        '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('app/vendor/jquery'))

    // Font Awesome
    gulp.src([
            './node_modules/font-awesome/**/*',
        ])
        .pipe(gulp.dest('app/vendor/font-awesome'))

    // nivo-slider
    gulp.src([
            './node_modules/nivo-slider/**/*',
        ])
        .pipe(gulp.dest('app/vendor/nivo-slider'))
})


gulp.task('sass', function () {
    return gulp.src("app/scss/*.scss")
     .pipe(gulpFlatmap(function (stream) {  // the stream contains a single file 
        return stream
           .pipe(sourcemaps.init())
           .pipe(sass())
           .on('error', sass.logError)
           .pipe(sourcemaps.write('./maps'))
     }))
    //  .pipe(gulp.dest('app/css'))
     .pipe(gulp.dest('public/css'))
     .pipe(browserSync.stream());
   });


// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "server.js"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    // gulp.watch("app/css/*.css").on('change', browserSync.reload);
    gulp.watch("app/*.html");
    gulp.watch("views/*.handlebars").
    on('change', browserSync.reload);
});

gulp.task('default', ['serve', 'vendor']);