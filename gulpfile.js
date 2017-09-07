(function() {
    'use strict';

    // List of all the modules
    // ============================================================

    const gulp = require('gulp');
    const clean = require('gulp-clean');

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
        IMAGES_PATH: './assets/images'
    };

    // List of all the available tasks
    // ============================================================

    gulp.task('clean-tmp', cleanFolder.bind(null, PATHS.TMP_APP));

    // Private functions
    // ============================================================

    function cleanFolder(folderToClean) {
        return gulp.src(folderToClean, { read: false })
            .pipe(clean());
    }

})();