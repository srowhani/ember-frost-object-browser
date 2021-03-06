module.exports = function (environment) {
  var ENV = {
    contentSecurityPolicy: {
      'img-src': "'self' data: w3.org"
    },
    modulePrefix: 'dummy',
    podModulePrefix: 'dummy/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
      // TODO Do we want to disable prototype extension?
      // EXTEND_PROTOTYPES: {
      //   Date: false
      // }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.factoryGuy = true
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.rootURL = '/'
    ENV.locationType = 'none'

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'
  }

  if (environment === 'e2e-test') {
    ENV.rootURL = '/'
    ENV['ember-cli-mirage'] = {
      enabled: true
    }
    ENV.mirageUrlPrefix = 'origin'
  }

  if (environment === 'production') {
    ENV.rootURL = '/ember-frost-object-browser'
    ENV.factoryGuy = true
  }

  return ENV
}
