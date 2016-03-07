import { moduleFor } from 'ember-qunit'
import test from 'dummy/tests/ember-sinon-qunit/test'

let component

moduleFor('component:frost-object-browser-paginator', 'Unit | frost-object-browser-paginator', {
  unit: true,
  beforeEach: function () {
    component = this.subject()
    component.set('itemsPerPage', 5)
    component.set('total', 13)
  }
})

test('computedOffset should be computed properly', function (assert) {
  component.set('page', 1)
  assert.equal(component.get('computedOffset'), 6)
})

test('computedOffset should be computed properly when no records', function (assert) {
  component.set('total', 0)
  assert.equal(component.get('computedOffset'), 0)
})

test('computedEnd should be computed properly', function (assert) {
  component.set('page', 1)
  assert.equal(component.get('computedEnd'), 10)

  component.set('page', 2)
  assert.equal(component.get('computedEnd'), 13)
})

test('leftButtonsDisabled should be true when page is 0', function (assert) {
  component.set('page', 0)
  assert.equal(component.get('leftButtonsDisabled'), true)
})

test('rightButtonsDisabled should be true when page is last', function (assert) {
  component.set('page', 2)
  assert.equal(component.get('rightButtonsDisabled'), true)
})

test('rightButtonsDisabled should be true when no records', function (assert) {
  component.set('total', 0)
  assert.equal(component.get('rightButtonsDisabled'), true)
})

test('action: onPageChange sends onPageChanged action', function (assert) {
  const sendAction = this.stub()
  component.set('sendAction', sendAction)

  component.onPageChange('back')
  assert.deepEqual(sendAction.firstCall.args, ['onPageChanged', 'back'])
})
