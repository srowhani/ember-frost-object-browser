import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import sinon from 'sinon'
import Ember from 'ember'
import {registryHelper} from 'ember-test-utils'
import resolver from '../../helpers/resolver'

const FrostButtonComponent = Ember.Component.extend({
  classNames: ['frost-button'],
  click () {
    if (this.attrs['on-click']) {
      this.attrs['on-click']()
    }
  }
})

describeComponent('frost-object-browser', 'Unit | frost-object-browser', {
  unit: true,

  needs: [
    'component:frost-button',
    'component:frost-object-browser-paginator',
    'component:frost-list',
    'component:frost-object-browser-list-item',
    'component:frost-bunsen-detail',
    'helper:eq'
  ],

  beforeSetup () {
    registryHelper.setup(resolver, {
      'component:frost-button': FrostButtonComponent,
      'component:frost-object-browser-paginator': Ember.Component.extend(),
      'component:frost-list': Ember.Component.extend(),
      'component:frost-object-browser-list-item': Ember.Component.extend(),
      'component:frost-bunsen-detail': Ember.Component.extend()
    })
  },

  teardown () {
    registryHelper.teardown()
  }
}, function () {
  let component, viewSchema, sandbox
  beforeEach(function () {
    sandbox = sinon.sandbox.create()

    viewSchema = {
      low: {foo: 1},
      medium: {foo: 2},
      high: {foo: 3}
    }

    component = this.subject({viewSchema})
  })

  afterEach(function () {
    sandbox.reset()
  })

  it('computedStyle is computed properly', function () {
    component.set('contentHeight', 123)
    expect(component.get('computedStyle')).to.equal('height: 123px;')
  })

  it('computedViewLevel is computed properly (with a viewSchema)', function () {
    component.set('detailLevel', 'high')
    expect(component.get('computedViewLevel')).to.deep.equal({foo: 3})
  })

  it('computedViewLevel is computed properly (without a view schema)', function () {
    component.set('viewSchema', null)
    expect(component.get('computedViewLevel')).to.deep.equal({})
  })

  it('computedPageNumber is computed properly with internal pagination logic', function () {
    component.set('_pageNumber', 4)
    expect(component.get('computedPageNumber')).to.equal(4)
  })

  it('computedPageNumber is computed properly when internal pagination is assigned', function () {
    Ember.run(() => {
      component.setProperties({
        valuesTotal: 20,
        pageNumber: 7,
        _pageNumber: 4
      })
    })
    expect(component.get('computedPageNumber')).to.equal(7)
  })

  it('computedValues should slice properly values', function () {
    const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    Ember.run(() => {
      component.setProperties({
        values,
        itemsPerPage: 4
      })
    })
    expect(component.get('computedValues')).to.deep.equal(values.slice(0, 4))
  })

  it('computedValues should be computed properly when page is set internally', function () {
    const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    Ember.run(() => {
      component.setProperties({
        values,
        itemsPerPage: 3,
        _pageNumber: 1
      })
    })
    expect(component.get('computedValues')).to.deep.equal(values.slice(3, 6))
  })

  it('computedValues should slice properly values when page is set externally', function () {
    const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    Ember.run(() => {
      component.setProperties({
        values,
        itemsPerPage: 5,
        pageNumber: 2
      })
    })
    expect(component.get('computedValues')).to.deep.equal(values.slice(0, 5))
  })

  it('computedValuesTotal should be computed properly', function () {
    const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    component.set('values', values)
    expect(component.get('computedValuesTotal')).to.equal(8)
  })

  it('action: on-select handles new selection', function () {
    // setup stub for on-row-select callback
    const onRowSelect = sandbox.stub()
    component.set('on-row-select', onRowSelect)

    // setup existing selectedItems
    component.set('selectedItems', Ember.A([]))

    const attr = {
      isSelected: true,
      record: {foo: 'bar'}
    }

    component.actions['on-select'].call(component, attr)
    expect(onRowSelect.firstCall.args[0]).to.have.length(1)
    expect(onRowSelect.firstCall.args[0][0]).to.eql({foo: 'bar'})
    expect(onRowSelect.firstCall.args[1]).to.eql({foo: 'bar'})
    expect(onRowSelect.firstCall.args[2]).to.eql({})
  })

  it('action: on-select handles de-selection', function () {
    // setup stub for on-row-select callback
    const onRowSelect = sandbox.stub()
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

    expect(onRowSelect.firstCall.args[0]).to.have.length(1)
    expect(onRowSelect.firstCall.args[0][0]).to.eql({bar: 'baz'})
    expect(onRowSelect.firstCall.args[1]).to.eql({})
    expect(onRowSelect.firstCall.args[2]).to.eql({foo: 'bar'})
  })

  it('action: on-button-click calls on-action-click with selectedItems', function () {
    // setup stub for on-action-click callback
    const onActionClick = sandbox.stub()
    component.set('on-action-click', onActionClick)

    const selectedItems = [{foo: 'bar'}, {bar: 'baz'}]
    component.set('selectedItems', selectedItems)

    // trigger the action
    component.actions['on-button-click'].call(component, 'button-1')

    expect(onActionClick.firstCall).to.have.been.calledWith('button-1', selectedItems)
  })

  it('action: onDetailChange sets detailLevel', function () {
    component.set('detailLevel', 'high')

    // trigger the action
    component.actions.onDetailChange.call(component, 'low')

    expect(component.get('detailLevel')).to.equal('low')
  })

  it('action: onPageChanged sets _pageNumber properly', function () {
    const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    Ember.run(() => {
      component.setProperties({
        values,
        itemsPerPage: 3
      })
    })

    component.actions['onPageChanged'].call(component, 'forward')
    expect(component.get('computedPageNumber')).to.equal(1)

    component.actions['onPageChanged'].call(component, 'back')
    expect(component.get('computedPageNumber')).to.equal(0)

    component.actions['onPageChanged'].call(component, 'end')
    expect(component.get('computedPageNumber')).to.equal(2)

    component.actions['onPageChanged'].call(component, 'begin')
    expect(component.get('computedPageNumber')).to.equal(0)
  })

  it('action: onPageChanged sends action about page has been changed', function () {
    const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    Ember.run(() => {
      component.setProperties({
        values,
        itemsPerPage: 8,
        pageNumber: 2,
        valuesTotal: 32
      })
    })

    const sendAction = sandbox.stub()
    component.set('sendAction', sendAction)

    component.actions['onPageChanged'].call(component, 'forward')
    expect(sendAction.firstCall).to.have.been.calledWith('onPageChanged', 3)

    component.actions['onPageChanged'].call(component, 'back')
    expect(sendAction).to.have.been.calledWith('onPageChanged', 1)

    component.actions['onPageChanged'].call(component, 'end')
    expect(sendAction).to.have.been.calledWith('onPageChanged', 3)

    component.actions['onPageChanged'].call(component, 'begin')
    expect(sendAction).to.have.been.calledWith('onPageChanged', 0)
  })

  it('sets detailLevel when LOD buttons are clicked', function () {
    const values = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    component.set('values', values)

    this.render()

    ;['low', 'medium', 'high'].forEach(function (detailLevel, idx) {
      this.$('.button-bar .frost-button').eq(idx).click()
      expect(component.get('detailLevel')).to.equal(detailLevel)
    })
  })
})
