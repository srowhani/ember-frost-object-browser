import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import sinon from 'sinon'

describeComponent('frost-object-browser-paginator', 'Unit | frost-object-browser-paginator', {
  unit: true
}, function () {
  let component, sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    component = this.subject()

    Ember.run(() => {
      component.setProperties({
        itemsPerPage: 5,
        total: 13
      })
    })
  })

  afterEach(function () {
    sandbox.reset()
  })

  it('computedOffset should be computed properly', function () {
    Ember.run(() => {
      component.set('page', 1)
    })
    expect(component.get('computedOffset')).to.equal(6)
  })

  it('computedOffset should be computed properly when no records', function () {
    Ember.run(() => {
      component.set('total', 0)
    })
    expect(component.get('computedOffset')).to.equal(0)
  })

  it('computedEnd should be computed properly', function () {
    Ember.run(() => {
      component.set('page', 1)
    })
    expect(component.get('computedEnd')).to.equal(10)

    Ember.run(() => {
      component.set('page', 2)
    })
    expect(component.get('computedEnd')).to.equal(13)
  })

  it('leftButtonsDisabled should be true when page is 0', function () {
    Ember.run(() => {
      component.set('page', 0)
    })
    expect(component.get('leftButtonsDisabled')).to.equal(true)
  })

  it('rightButtonsDisabled should be true when page is last', function () {
    Ember.run(() => {
      component.set('page', 2)
    })
    expect(component.get('rightButtonsDisabled')).to.equal(true)
  })

  it('rightButtonsDisabled should be true when no records', function () {
    Ember.run(() => {
      component.set('total', 0)
    })
    expect(component.get('rightButtonsDisabled')).to.equal(true)
  })

  it('action: on-page-change sends on-page-changed action', function () {
    const sendAction = sandbox.stub()
    Ember.run(() => {
      component.set('sendAction', sendAction)
    })

    component['on-page-changed']('back')
    expect(sendAction.firstCall.args[0]).to.equal('on-page-changed')
    expect(sendAction.firstCall.args[1]).to.equal('back')
  })
})
