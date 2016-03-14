import Ember from 'ember'
import layout from '../templates/components/filter-facet'
import _ from 'lodash'

const defaultFilters = [
  {
    label: 'First Filter',
    type: 'select',
    name: 'first-filter',
    data: [{
      label: 'Test1',
      value: 'poasdfkljqpoiasdfjae'
    }, {
      label: 'Test2',
      value: 'asdfasdfkljqpoihaasf'
    }, {
      label: 'Test3',
      value: 'poasSfaFFsacaejktdfe'
    }, {
      label: 'Test4',
      value: 'asdfasdffeacrhASHASD'
    }]
  },
  {
    label: 'Second filter',
    type: 'checkbox',
    name: 'second-filter',
    data: [{
      
    }]
  }
]

function callIfDefined (context, functionName, ...args) {
  let func = context.get(functionName)

  if (_.isFunction(func)) {
    func(...args)
  }
}

export default Ember.Component.extend({
  layout,
  classNames: ['facets'],

  filters: defaultFilters,
  actions: {
    'filter-change' (filterName, value) {
      console.log(filterName)
      let filterState = this.get('activeFilters')
      filterState[filterName] = value
      callIfDefined(this, 'on-filter', filterState)
    }
  },
  init () {
    this._super(...arguments)
    let filters = this.get('activeFilters')

    if (filters === undefined || filters === null) {
      this.set('activeFilters', {})
    }
  }
})
