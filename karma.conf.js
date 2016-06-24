// Karma configuration
// Generated on Thu Sep 26 2013 10:51:28 GMT+0100 (GMT Daylight Time)

module.exports = function(config) {
  config.set({

  // base path, that will be used to resolve files and exclude
  basePath: '',


  // frameworks to use
  frameworks: ['requirejs', 'mocha', 'sinon-chai'],


  // list of files / patterns to load in the browser
  files: [
      'test/test-main.js'
    , {
        pattern: 'node_modules/sinon/pkg/sinon.js'
      , included: false
      , watched: false
    }
    , {
        pattern: 'node_modules/underscore/underscore.js'
      , included: false
      , watched: false
    }
    , {
        pattern: 'node_modules/@websdk/nap/lib/*'
      , included: false
      , watched: false
    }
    , {
        pattern: 'node_modules/@websdk/rhumb/lib/rhumb.js'
      , included: false
      , watched: false
    }
    , {
        pattern: 'node_modules/d3-dispatch/build/d3-dispatch.js'
      , included: false
      , watched: false
    }
    , {
        pattern: 'node_modules/squirejs/src/Squire.js'
      , included: false
      , watched: false
    }
    , {
        pattern: 'test/**/*.js'
      , included: false
    }
    , {
        pattern: '*.js'
      , included: false
    }
  ],

  // list of files to exclude
  exclude: [

  ],

  // test results reporter to use
  // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
  reporters: ['mocha'],// 'coverage'],
  preprocessors: {
    '*.js': ['coverage']
  },
  coverageReporter: {
    type: 'text'
  },

  // web server port
  port: 9876,


  // enable / disable colors in the output (reporters and logs)
  colors: true,


  // level of logging
  // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
  logLevel: config.LOG_INFO,


  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,


  // Start these browsers, currently available:
  // - Chrome
  // - ChromeCanary
  // - Firefox
  // - Opera
  // - Safari (only Mac)
  // - PhantomJS
  // - IE (only Windows)
  browsers: ['Chrome'],


  // If browser does not capture in given timeout [ms], kill it
  captureTimeout: 60000,


  // Continuous Integration mode
  // if true, it capture browsers, run tests and exit
  singleRun: false
  });
};
