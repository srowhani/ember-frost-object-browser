var webdriverio = require('webdriverio')
var webdrivercss = require('webdrivercss')
var testUtils = require('../../testUtils/utils').e2e
var testConfig = require('./test-config.json')

var url = testUtils.getUrl(testConfig)

var NORMAL_VIEWPORT_WIDTH = 1280
var NORMAL_VIEWPORT_HEIGHT = 800

/* eslint-disable no-undef */

describe('frost-object-browser e2e tests using ' + url, function () {
  var client, commonScreenshots
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 9999999

  beforeEach(() => {
    commonScreenshots = {
      name: 'content',
      elem: 'html'
    }

    client = testUtils.init(webdriverio, webdrivercss, testConfig)

    client
      .setViewportSize({width: NORMAL_VIEWPORT_WIDTH, height: NORMAL_VIEWPORT_HEIGHT})
      .url(url)
      .pause(5000)
  })

  afterEach((done) => {
    client.end(done)
  })

  it('main-page renders appropriately', (done) => {
    client
      .verifyScreenshots('main-page', [commonScreenshots])
      .call(done)
  })

  it('renders appropriately when a row is selected', (done) => {
    client
      .click('.frost-list-item:first-child')
      .verifyScreenshots('click-row', [commonScreenshots])
      .call(done)
  })

  it('has correct med LOD view', (done) => {
    client
      .click('.detail .button-bar.low .frost-button:nth-child(2)')
      .verifyScreenshots('medium-LOD', [commonScreenshots])
      .call(done)
  })

  it('has correct high LOD view', (done) => {
    client
      .click('.detail .button-bar.low .frost-button:nth-child(3)')
      .verifyScreenshots('high-LOD', [commonScreenshots])
      .call(done)
  })

  it('looks right when hovered', (done) => {
    client
      .moveToObject('.frost-list-item:first-child')
      .verifyScreenshots('hover-row', [commonScreenshots])
      .call(done)
  })

  it('renders correctly when no records', (done) => {
    for (var i = 20; i > 0; i--) { // Iterate pages
      client
        .click('.frost-list-item:first-child') // Select all records on page
        .click('.actions button:nth-child(2)') // Delete all selected records
        .pause(500)
    }

    client
      .verifyScreenshots('no-records', [commonScreenshots])
      .call(done)
  })
})
