import Ember from 'ember'
import { moduleFor } from 'ember-qunit'
import test from 'dummy/tests/ember-sinon-qunit/test'

let component
let viewSchema

moduleFor('component:frost-object-browser', 'Unit | frost-object-browser', {
  unit: true,
  beforeEach: function () {
    viewSchema = {
      low: {foo: 1},
      medium: {foo: 2},
      high: {foo: 3}
    }

    component = this.subject({viewSchema})
  }
})

test('computedStyle is computed properly', function (assert) {
  component.set('contentHeight', 123)
  assert.equal(component.get('computedStyle'), 'height: 123px;')
})

test('computedViewLevel is computed properly (with a viewSchema)', function (assert) {
  component.set('detailLevel', 'high')
  assert.deepEqual(component.get('computedViewLevel'), {foo: 3})
})

test('computedViewLevel is computed properly (without a view schema)', function (assert) {
  component.set('viewSchema', null)
  assert.deepEqual(component.get('computedViewLevel'), {})
})

test('computedPageNumber is computed properly with internal pagination logic', function (assert) {
  component.set('_pageNumber', 4)
  assert.equal(component.get('computedPageNumber'), 4)
})

test('computedPageNumber is computed properly when internal pagination is assigned', function (assert) {
  component.set('valuesTotal', 20)
  component.set('pageNumber', 7)
  component.set('_pageNumber', 4)
  assert.equal(component.get('computedPageNumber'), 7)
})

test('computedValues should slice properly values', function (assert) {
  const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  component.set('values', values)
  component.set('itemsPerPage', 4)
  assert.deepEqual(component.get('computedValues'), values.slice(0, 4))
})

test('computedValues should be computed properly when page is set internally', function (assert) {
  const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  component.set('values', values)
  component.set('itemsPerPage', 3)
  component.set('_pageNumber', 1)
  assert.deepEqual(component.get('computedValues'), values.slice(3, 6))
})

test('computedValues should slice properly values when page is set externally', function (assert) {
  const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  component.set('values', values)
  component.set('itemsPerPage', 5)
  component.set('pageNumber', 2)
  assert.deepEqual(component.get('computedValues'), values.slice(0, 5))
})

test('computedValuesTotal should be computed properly', function (assert) {
  const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  component.set('values', values)
  assert.equal(component.get('computedValuesTotal'), 8)
})

test('action: on-select handles new selection', function (assert) {
  // setup stub for on-row-select callback
  const onRowSelect = this.stub()
  component.set('on-row-select', onRowSelect)

  // setup existing selectedItems
  component.set('selectedItems', Ember.A([]))

  const attr = {
    isSelected: true,
    record: {foo: 'bar'}
  }

  component.actions['on-select'].call(component, attr)
  const expectedArgs = [
    [
      {
        foo: 'bar'
      }
    ],
    {
      foo: 'bar'
    },
    {}
  ]

  assert.deepEqual(onRowSelect.firstCall.args, expectedArgs)
})

test('action: on-select handles de-selection', function (assert) {
  // setup stub for on-row-select callback
  const onRowSelect = this.stub()
  component.set('on-row-select', onRowSelect)

  // setup existing selectedItems
  const record1 = {foo: 'bar'}
  const record2 = {bar: 'baz'}
  component.set('selectedItems', Ember.A([]))
  component.get('selectedItems').addObject(record1)
  component.get('selectedItems').addObject(record2)

  const attr = {
    isSelected: false,
    record: record1
  }

  // trigger the action
  component.actions['on-select'].call(component, attr)

  const expectedArgs = [
    [
      {
        bar: 'baz'
      }
    ],
    {},
    {
      foo: 'bar'
    }
  ]

  assert.deepEqual(onRowSelect.firstCall.args, expectedArgs)
})

test('action: on-button-click calls on-action-click with selectedItems', function (assert) {
  // setup stub for on-action-click callback
  const onActionClick = this.stub()
  component.set('on-action-click', onActionClick)
  const selectedItems = [{foo: 'bar'}, {bar: 'baz'}]
  component.set('selectedItems', selectedItems)

  // trigger the action
  component.actions['on-button-click'].call(component, 'button-1')

  assert.deepEqual(onActionClick.firstCall.args, ['button-1', selectedItems])
})

test('action: on-detail-change sets detailLevel', function (assert) {
  component.set('detailLevel', 'high')

  // trigger the action
  component.actions['on-detail-change'].call(component, 'low')

  assert.equal(component.get('detailLevel'), 'low')
})

test('action: on-page-changed sets _pageNumber properly', function (assert) {
  const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  component.set('values', values)
  component.set('itemsPerPage', 3)

  component.actions['on-page-changed'].call(component, 'forward')
  assert.equal(component.get('computedPageNumber'), 1)

  component.actions['on-page-changed'].call(component, 'back')
  assert.equal(component.get('computedPageNumber'), 0)

  component.actions['on-page-changed'].call(component, 'end')
  assert.equal(component.get('computedPageNumber'), 2)

  component.actions['on-page-changed'].call(component, 'begin')
  assert.equal(component.get('computedPageNumber'), 0)
})

test('action: on-page-changed sends action about page has been changed', function (assert) {
  const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  component.set('values', values)
  component.set('itemsPerPage', 8)
  component.set('pageNumber', 2)
  component.set('valuesTotal', 32)

  const sendAction = this.stub()
  component.set('sendAction', sendAction)

  component.actions['on-page-changed'].call(component, 'forward')
  assert.deepEqual(sendAction.firstCall.args, ['pageChanged', 3])

  component.actions['on-page-changed'].call(component, 'back')
  assert.deepEqual(sendAction.args[1], ['pageChanged', 1])

  component.actions['on-page-changed'].call(component, 'end')
  assert.deepEqual(sendAction.args[2], ['pageChanged', 3])

  component.actions['on-page-changed'].call(component, 'begin')
  assert.deepEqual(sendAction.args[3], ['pageChanged', 0])
})
