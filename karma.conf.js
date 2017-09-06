module.exports = function(config) {
    config.set({
        browsers: ['Chrome'],
        frameworks: ['jasmine'],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-ng-html2js-preprocessor'
        ],
        ngHtml2JsPreprocessor: {
            moduleName: 'templates',
            stripPrefix: 'src/'
        },
        preprocessors: {
            'src/**/*.html': ['ng-html2js']
        },
        files: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './node_modules/angular-messages/angular-messages.js',
            './node_modules/angular-ui-router/release/angular-ui-router.js',
            './node_modules/angular-material/angular-material.js',
            './node_modules/angular-aria/angular-aria.js',
            './node_modules/angular-animate/angular-animate.js',

            './test/unit/**/*.spec.js',

            './src/**/*.html'
        ]
    });
};