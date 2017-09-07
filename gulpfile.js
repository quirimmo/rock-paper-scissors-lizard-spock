(function() {
    'use strict';

    // List of all the modules
    // ============================================================

    const gulp = require('gulp');
    const inject = require('gulp-inject');
    const clean = require('gulp-clean');
    const gls = require('gulp-live-server');
    const runSequence = require('run-sequence');

    // List of all the static paths 
    // ============================================================

    const PATHS = {
        NODE_MODULES_COMPONENTS: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/angular/angular.min.js',
            './node_modules/angular-messages/angular-messages.min.js',
            './node_modules/angular-aria/angular-aria.min.js',
            './node_modules/angular-animate/angular-animate.min.js',
            './node_modules/angular-material/angular-material.min.js',
            './node_modules/angular-ui-router/release/angular-ui-router.min.js'
        ],
        APP_STYLES: './src/**/*.less',
        EXTERNAL_STYLES: [
            './node_modules/angular-material/angular-material.min.css'
        ],
        TMP_APP: './tmp',
        DIST_APP: './dist',
        ROOT_APP: '/',
        KARMA_CONFIG_FILE: `${__dirname}/karma.conf.js`,
        PROTRACTOR_CONFIG_FILE: `${__dirname}/protractor.conf.js`,
        E2E_TESTS: './test/e2e/**/*.spec.js',
        ALL_IMAGES: [
            './assets/images/*.*'
        ],
        IMAGES_PATH: './assets/images',
        MAIN_INDEX: './src/index.html',
        SOURCE_FILES: './src/**/*.*',
        ANGULAR_SOURCE_ORDER: [
            'src/app.js'
        ]
    };

    // List of all the available tasks
    // ============================================================

    gulp.task('clean-tmp', cleanFolder.bind(null, PATHS.TMP_APP));
    gulp.task('inject-dependencies', injectDependencies);
    gulp.task('serve', ['clean-tmp'], serve);

    // Private functions
    // ============================================================

    function cleanFolder(folderToClean) {
        return gulp.src(folderToClean, { read: false })
            .pipe(clean());
    }

    function injectDependencies() {
        let target = gulp.src(PATHS.MAIN_INDEX);
        let nodeSources = gulp.src(PATHS.NODE_MODULES_COMPONENTS, { read: false });
        let angularSources = gulp.src(PATHS.ANGULAR_SOURCE_ORDER);

        return target
            .pipe(inject(nodeSources, { name: 'node' }))
            .pipe(inject(angularSources, { name: 'angular' }))
            .pipe(gulp.dest(PATHS.TMP_APP));
    }

    function serve(done) {
        runSequence('inject-dependencies', afterSequence);

        function afterSequence() {
            let server = gls.static([PATHS.ROOT_APP, PATHS.TMP_APP]);
            server.start();
            gulp.watch(PATHS.SOURCE_FILES, function(file) {
                server.notify.apply(server, [file]);
            });
            done();
        }
    }

})();