/**
 * Created by ariza on 5/2/17.
 */
var gulp   = require('gulp'),
	jshint = require('gulp-jshint');

gulp.task('hint', function() {
	gulp.src('./*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
	gulp.src('./process/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
	gulp.src('./cluster/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
	gulp.src('./security/http/config/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
	gulp.src('./security/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
	gulp.src('./security/http/lib/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
	gulp.src('./security/http/lib/logger/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
	gulp.src('./security/http/lib/middleware/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
	gulp.src('./test/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
	gulp.src('./security/http/test/passport/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('default', ['hint']);