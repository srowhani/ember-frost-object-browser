import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import sinon from 'sinon'
import $ from 'jquery'

let filters = [
  {
    label: 'First Filter',
    type: 'select',
    name: 'first-filter',
    clearable: true,
    showing: true,
    data: [{
      label: 'Test1',
      value: 'TestValue1'
    }, {
      label: 'Test2',
      value: 'TestValue2'
    }, {
      label: 'Test3',
      value: 'TestValue3'
    }, {
      label: 'Test4',
      value: 'TestValue4'
    }]
  },
  {
    label: 'Second filter',
    type: 'select',
    name: 'second-filter',
    data: [{
      label: 'Test1',
      value: 'OtherTestValue1'
    }, {
      label: 'Test2',
      value: 'OtherTestValue2'
    }, {
      label: 'Test3',
      value: 'OtherTestValue3'
    }, {
      label: 'Test4',
      value: 'OtherTestValue4'
    }]
  }
]

describeComponent(
  'frost-object-browser-filter',
  'Integration | Component | object browser filter',
  {
    integration: true
  },
  function () {
    let props
    beforeEach(function () {
      props = {
        filters,
        onFilter: sinon.spy()
      }
      this.setProperties(props)
      this.setProperties(filters)
      this.render(hbs`{{frost-object-browser-filter filters=filters onFilter=onFilter}}`)
    })

    it('displays a list of filters', function () {
      expect(this.$('.frost-select')).to.have.length(2)
    })

    it('takes a function that is called when the filter changes', function (done) {
      this.$('.frost-select li:first-child').click()

      Ember.run.later(() => {
        expect(props.onFilter.called).to.be.true
        done()
      })
    })

    it('filters can be collapsed', function (done) {
      $(this.$('.filter-header .down-arrow')[0]).click()
      Ember.run.later(() => {
        let firstFilter = $(this.$('.frost-select')[0])
        expect(firstFilter.is(':visible')).to.be.false
        done()
      })
    })

    it('filters can be expanded', function (done) {
      $(this.$('.filter-header .down-arrow')[1]).click()
      Ember.run.later(() => {
        let secondFilter = $(this.$('.frost-select')[1])
        expect(secondFilter.is(':visible')).to.be.true
        done()
      })
    })

    it('filter values can be set externally', function (done) {
      this.set('filters.0.selectedValue', 'TestValue3')

      Ember.run.later(() => {
        let firstFilterInput = this.$('.frost-select input')
        expect(firstFilterInput.val()).to.eql('Test3')
        done()
      })
    })

    it('filters can be cleared', function (done) {
      this.$('.frost-select li:first-child').click()
      this.$('.filter-header .frost-button').click()

      Ember.run.later(() => {
        expect(props.filters[0].selectedValue).to.be.null

        done()
      })
    })
  }
)
