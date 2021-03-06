var gulp = require("gulp");
var watch = require("gulp-watch");
var browserSync = require("browser-sync").create();

gulp.task("watch", function() {
	// automatically opens the .html file in app folder on browser on gulp watch
	browserSync.init({
		// stop browserSync from notifying inject message on injecting css
		notify: false,
		server: {
			baseDir: "app"
		}
	});

	watch("./app/index.html", function() {
		browserSync.reload();
	});

	watch("./app/assets/styles/**/*.css", function() {
		gulp.start("cssInject");
	});

	watch("./app/assets/scripts/**/*.js", function() {
		gulp.start("scriptRefresh");
	});
});

//cssInject dependancy of styles.css task before running itself
gulp.task("cssInject", ["styles"], function() {
	return gulp.src("./app/temp/styles/styles.css").pipe(browserSync.stream());
});

// changes done in the script file should now be visible without refresh
gulp.task("scriptRefresh", ["scripts"], function() {
	browserSync.reload();
});
