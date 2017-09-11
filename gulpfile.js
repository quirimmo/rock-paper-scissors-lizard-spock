(function() {
    'use strict';

    // List of all the modules
    // ============================================================

    const gulp = require('gulp');
    const inject = require('gulp-inject');
    const clean = require('gulp-clean');
    const gls = require('gulp-live-server');
    const runSequence = require('run-sequence');
    const KarmaServer = require('karma').Server;
    const protractor = require('gulp-protractor').protractor;
    const less = require('gulp-less');
    const concat = require('gulp-concat');
    const cleanCSS = require('gulp-clean-css');
    const htmlMinify = require('gulp-htmlmin');
    const ngHtml2Js = require('gulp-ng-html2js');
    const minify = require('gulp-minify');

    // List of all the static paths 
    // These constant variables could be considered "useless", but I love to define constant variables at the beginning in order to improve the readability, to improve 
    // the maintenance of the code, so you can easily change the values from the beginning of the file, and because actually I hate hardcoded strings in the code when avoidable
    // ============================================================

    const PATHS = {
        NODE_MODULES_COMPONENTS: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/angular/angular.min.js',
            './node_modules/angular-messages/angular-messages.min.js',
            './node_modules/angular-aria/angular-aria.min.js',
            './node_modules/angular-animate/angular-animate.min.js',
            './node_modules/angular-material/angular-material.min.js',
            './node_modules/angular-ui-router/release/angular-ui-router.min.js',
            './node_modules/ngstorage/ngStorage.min.js'
        ],
        STYLES_FOLDER: './assets/styles',
        APP_STYLES: './assets/styles/*.less',
        APP_STYLES_EXTENSION: '.less',
        GENERATED_STYLES: './assets/styles/*.css',
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
        SOURCE_FILES: ['./src/**/*.*', './assets/styles/*.less'],
        SOURCE_JS_FILES: './src/**/*.js',
        ANGULAR_SOURCE_ORDER: [
            'src/app.js',
            'src/constants/**/*.js',
            'src/services/**/*.js',
            'src/components/**/*.js',
            'src/controllers/**/*.js',
            'src/config.js'
        ],
        OUTPUT_STYLES_FOLDER: '/assets/styles',
        GLOBAL_OUTPUT_STYLE: 'global-style.css',
        GLOBAL_OUTPUT_EXTERNAL_STYLE: 'global-external-style.css',
        PARTIALS_HTML_SOURCES: [
            'src/**/*.html',
            '!src/index.html'
        ],
        SRC_PREFIX: 'src/'
    };

    // List of all the available tasks
    // ============================================================

    gulp.task('clean-tmp', cleanFolder.bind(null, PATHS.TMP_APP));
    gulp.task('clean-dist', cleanFolder.bind(null, PATHS.DIST_APP));
    gulp.task('inject-dependencies', injectDependencies);
    gulp.task('serve', ['clean-tmp'], serve);
    gulp.task('serve-no-watch', ['clean-tmp'], serveNoWatch);
    gulp.task('serve-dist', serveDist);
    gulp.task('unit-test', ['compile-templates'], startKarmaServer);
    gulp.task('unit-test-watch', ['compile-templates'], startKarmaServer.bind(null, true));
    gulp.task('protractor-test', ['serve-no-watch'], runProtractorTests);
    gulp.task('less', compileLess);
    gulp.task('publish-styles', ['less'], publishStyles.bind(null, PATHS.TMP_APP));
    gulp.task('publish-styles-dist', ['less'], publishStyles.bind(null, PATHS.DIST_APP));
    gulp.task('publish-external-styles', publishExternalStyles.bind(null, PATHS.TMP_APP));
    gulp.task('publish-external-styles-dist', publishExternalStyles.bind(null, PATHS.DIST_APP));
    gulp.task('publish-images', publishImages);
    gulp.task('compile-templates', compileTemplates.bind(null, PATHS.TMP_APP));
    gulp.task('compile-templates-dist', compileTemplates.bind(null, PATHS.DIST_APP));
    gulp.task('publish-node-modules', publishNodeModules);
    gulp.task('build-js-source-files', buildJSSourceFiles);
    gulp.task('publish', ['clean-dist'], publish);
    gulp.task('default', ['serve']);

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
        let templatesSources = gulp.src(`${PATHS.TMP_APP}/partials.min.js`, { read: false });

        return target
            .pipe(inject(templatesSources, { name: 'templates', ignorePath: 'tmp/' }))
            .pipe(inject(nodeSources, { name: 'node' }))
            .pipe(inject(gulp.src(`${PATHS.TMP_APP}${PATHS.OUTPUT_STYLES_FOLDER}/${PATHS.GLOBAL_OUTPUT_EXTERNAL_STYLE}`, { read: false }), { name: 'external', ignorePath: 'tmp/', addRootSlash: false }))
            .pipe(inject(gulp.src(`${PATHS.TMP_APP}${PATHS.OUTPUT_STYLES_FOLDER}/${PATHS.GLOBAL_OUTPUT_STYLE}`, { read: false }), { ignorePath: 'tmp/', addRootSlash: false }))
            .pipe(inject(angularSources, { name: 'angular' }))
            .pipe(gulp.dest(PATHS.TMP_APP));
    }

    function serve(done) {
        runSequence('compile-templates', 'publish-external-styles', 'publish-styles', 'inject-dependencies', afterSequence);

        function afterSequence() {
            let server = gls.static([PATHS.ROOT_APP, PATHS.TMP_APP]);
            server.start();
            gulp.watch(PATHS.SOURCE_FILES, onFileChanged);
            done();

            function onFileChanged(file) {
                if (file.path.endsWith(PATHS.APP_STYLES_EXTENSION)) {
                    gulp.start('publish-styles', reloadServer.bind(null, file));
                } else if (file.path.endsWith('.html')) {
                    gulp.start('compile-templates', reloadServer.bind(null, file));
                } else {
                    reloadServer(file);
                }

                function reloadServer(file) {
                    server.notify.apply(server, [file]);
                }
            }
        }
    }

    let serverNoWatch;

    function serveNoWatch(done) {
        runSequence('compile-templates', 'publish-external-styles', 'publish-styles', 'inject-dependencies', afterSequence);

        function afterSequence() {
            serverNoWatch = gls.static([PATHS.ROOT_APP, PATHS.TMP_APP]);
            serverNoWatch.start();
            done();
        }
    }

    function runProtractorTests() {
        return gulp.src(PATHS.E2E_TESTS)
            .pipe(protractor({
                configFile: PATHS.PROTRACTOR_CONFIG_FILE
            }))
            .on('close', function() {
                serverNoWatch.stop();
            })
            .on('error', function(e) { throw e; });
    }

    function startKarmaServer(done, watch = false) {
        new KarmaServer({
            configFile: PATHS.KARMA_CONFIG_FILE,
            singleRun: !watch,
            autoWatch: watch
        }, onKarmaFinished).start();

        function onKarmaFinished(exitCode) {
            done();
            process.exit(exitCode);
        }
    }

    function compileLess() {
        return gulp.src(PATHS.APP_STYLES)
            .pipe(less())
            .pipe(gulp.dest(PATHS.STYLES_FOLDER));
    }

    function publishStyles(outputFolder) {
        let stylesSource = gulp.src(PATHS.GENERATED_STYLES);

        return stylesSource
            .pipe(concat(PATHS.GLOBAL_OUTPUT_STYLE))
            .pipe(cleanCSS())
            .pipe(gulp.dest(`${outputFolder}${PATHS.OUTPUT_STYLES_FOLDER}`));
    }

    function publishExternalStyles(outputFolder) {
        let stylesSource = gulp.src(PATHS.EXTERNAL_STYLES);

        return stylesSource
            .pipe(concat(PATHS.GLOBAL_OUTPUT_EXTERNAL_STYLE))
            .pipe(gulp.dest(`${outputFolder}${PATHS.OUTPUT_STYLES_FOLDER}`));
    }

    function compileTemplates(destinationPath) {
        return gulp.src(PATHS.PARTIALS_HTML_SOURCES)
            .pipe(htmlMinify({ removeComments: true, collapseWhitespace: true }))
            .pipe(ngHtml2Js({ moduleName: 'partials', prefix: PATHS.SRC_PREFIX }))
            .pipe(concat('partials.js'))
            .pipe(minify({ ext: { min: '.min.js' }, noSource: true }))
            .pipe(gulp.dest(destinationPath));
    }

    function publish() {
        runSequence(
            'compile-templates-dist', [
                'build-js-source-files',
                'publish-node-modules',
                'publish-external-styles-dist',
                'publish-styles-dist',
                'publish-images'
            ], afterSequence);

        function afterSequence() {
            // after getting everything ready, inject every thing needed inside the main index
            let target = gulp.src('src/index.html');

            return target
                .pipe(inject(gulp.src('dist/node-components.js', { read: false }), { name: 'node', ignorePath: 'dist/', addRootSlash: false }))
                .pipe(inject(gulp.src('dist/assets/styles/global-external-style.css', { read: false }), { ignorePath: 'dist/', addRootSlash: false, name: 'external' }))
                .pipe(inject(gulp.src('dist/assets/styles/global-style.css', { read: false }), { ignorePath: 'dist/', addRootSlash: false }))
                .pipe(inject(gulp.src('dist/partials.min.js', { read: false }), { name: 'templates', ignorePath: 'dist/', addRootSlash: false }))
                .pipe(inject(gulp.src('dist/all.min.js', { read: false }), { name: 'all', ignorePath: 'dist/', addRootSlash: false }))
                .pipe(gulp.dest(PATHS.DIST_APP));
        }
    }

    function buildJSSourceFiles() {
        return gulp.src(PATHS.SOURCE_JS_FILES)
            .pipe(concat('all.js'))
            .pipe(minify({ ext: { min: '.min.js' }, noSource: true }))
            .pipe(gulp.dest(PATHS.DIST_APP));
    }

    function publishNodeModules() {
        return gulp.src(PATHS.NODE_MODULES_COMPONENTS)
            .pipe(concat('node-components.js'))
            .pipe(gulp.dest(PATHS.DIST_APP));
    }

    function publishImages() {
        let imagesSource = gulp.src(PATHS.ALL_IMAGES);

        return imagesSource
            .pipe(gulp.dest(`${PATHS.DIST_APP}/${PATHS.IMAGES_PATH}`));
    }

    function serveDist() {
        let server = gls.static(PATHS.DIST_APP, 8000);
        server.start();
    }

})();