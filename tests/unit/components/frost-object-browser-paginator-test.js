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
    component.set('page', 1)
    expect(component.get('computedOffset')).to.equal(6)
  })

  it('computedOffset should be computed properly when no records', function () {
    component.set('total', 0)
    expect(component.get('computedOffset')).to.equal(0)
  })

  it('computedEnd should be computed properly', function () {
    component.set('page', 1)
    expect(component.get('computedEnd')).to.equal(10)

    component.set('page', 2)
    expect(component.get('computedEnd')).to.equal(13)
  })

  it('leftButtonsDisabled should be true when page is 0', function () {
    component.set('page', 0)
    expect(component.get('leftButtonsDisabled')).to.equal(true)
  })

  it('rightButtonsDisabled should be true when page is last', function () {
    component.set('page', 2)
    expect(component.get('rightButtonsDisabled')).to.equal(true)
  })

  it('rightButtonsDisabled should be true when no records', function () {
    component.set('total', 0)
    expect(component.get('rightButtonsDisabled')).to.equal(true)
  })

  it('action: onPageChanged sends onPageChangedd action', function () {
    const sendAction = sandbox.stub()
    component.set('sendAction', sendAction)

    component['onPageChangedd']('back')
    expect(sendAction.firstCall.args[0]).to.equal('onPageChangedd')
    expect(sendAction.firstCall.args[1]).to.equal('back')
  })
})
