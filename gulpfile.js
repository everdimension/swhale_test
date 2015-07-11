var gulp            = require('gulp');
var runSequence     = require('run-sequence');
var plumber         = require('gulp-plumber');
var jshint          = require('gulp-jshint');
var inject          = require('gulp-inject');
var changed         = require('gulp-changed');
var autoprefixer    = require('gulp-autoprefixer');
var less            = require('gulp-less');
var minifycss       = require('gulp-minify-css');
var uglify          = require('gulp-uglify');
var sourcemaps      = require('gulp-sourcemaps');
var ngAnnotate      = require('gulp-ng-annotate');
var angularFileSort = require('gulp-angular-filesort');

var root = 'site/';

var paths = {
	page     : root + 'index.html',

	less     : root + 'less',
	cssDist  : root + 'dist/css',

	appJS    : root + 'js',
	appJSDist: root + 'dist/js'
};

gulp.task('build:css', function () {
	var cssFiles = gulp.src(paths.cssDist + '/**/*.css', { read: false });

	return gulp.src(paths.page)
		.pipe(inject(cssFiles, { ignorePath: root }))
		.pipe(gulp.dest(root));
});

gulp.task('build:js', function () {
	var jsFiles = gulp.src(paths.appJSDist + '/**/*.js').pipe(angularFileSort());

	return gulp.src(paths.page)
		.pipe(inject(jsFiles, { ignorePath: root }))
		.pipe(gulp.dest(root));
});


gulp.task('minifyApp', function () {
	return gulp.src(paths.appJS + '/**/*.js')
		.pipe(changed(paths.appJSDist))
		.pipe(plumber())
		.pipe(sourcemaps.init())
			.pipe(ngAnnotate())
			.pipe(uglify())
		.pipe(sourcemaps.write('../../sourcemaps'))
		.pipe(gulp.dest(paths.appJSDist));
});

gulp.task('less', function () {
	return gulp.src(paths.less + '/main.less')
		.pipe(changed(paths.cssDist))
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(less())
		.pipe(minifycss())
		.pipe(gulp.dest(paths.cssDist));
});

gulp.task('jshint', function () {
	gulp.src(paths.appJS + '/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('watch', function () {
	gulp.watch(paths.cssDist + '/**/*.css', ['build:css']);
	gulp.watch(paths.appJSDist + '/**/*.js', ['build:js']);

	gulp.watch(paths.appJS + '/**/*.js', ['minifyApp', 'jshint']);
	gulp.watch(paths.less + '/**/*.less', ['less']);
});

gulp.task('minifyAndBuild', function () {
	runSequence('minifyApp', 'build:js');
	runSequence('less', 'build:css');
});

gulp.task('default', [
	'minifyAndBuild',
	'jshint',
	'watch'
]);
