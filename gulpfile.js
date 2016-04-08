var gulp = require('gulp');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');

var production = process.env.NODE_ENV === 'production';

var dependencies = [
	'alt',
	'react',
	'react-router',
	'underscore'
];

// 打包第三方js库
gulp.task('vendor', function(){
	return gulp.src([
	    'bower_components/jquery/dist/jquery.js',
	    'bower_components/bootstrap/dist/js/bootstrap.js',
	    'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
	    'bower_components/toastr/toastr.js'	
	    ]).pipe(concat('vendor.js'))
		  .pipe(gulpif(production, uglify({mangle: false})))
		  .pipe(gulp.dest('public/js'));
});

// 打包依赖第三方库的文件
gulp.task('browserify-vendor', function(){
	return browserify()
		.require(dependencies)
		.bundle()
		.pipe(source('vendor.bundle.js'))
		.pipe(gulpif(production, streamify(uglify({mangle: false}))))
		.pipe(gulp.dest('public/js'));
})