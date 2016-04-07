var gulp = require('gulp');
var gulpif = require('gulp-if');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var production = process.env.NODE_ENV === 'production';

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

