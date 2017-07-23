var gulp = require('gulp');
var watch = require('gulp-watch');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var cssImport = require('postcss-import');
var browserSync = require('browser-sync').create();

gulp.task('default', function(){
	console.log('Hooray - we created a gulp task');
});

gulp.task('html', function(){
	console.log('Imagine something useful being done with HTML');
});

gulp.task('styles', function(){
	return gulp.src('./app/assets/styles/styles.css')
		.pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
		.pipe(gulp.dest('./app/temp/styles'));
});

gulp.task('watch', function(){

	// automatically opens the .html file in app folder on browser on gulp watch
	browserSync.init({
		// stop browserSync from notifying inject message on injecting css
		notify:false,
		server: {
			baseDir:"app"
		}
	});

	watch('./app/index.html', function(){
		browserSync.reload();
	});

	watch('./app/assets/styles/**/*.css', function(){
		gulp.start('cssInject');
	});
})

//cssInject dependancy of styles.css task before running itself
gulp.task('cssInject', ['styles'], function(){
	return gulp.src('./app/temp/styles/styles.css')
	.pipe(browserSync.stream());
});
