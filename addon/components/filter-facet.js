import Ember from 'ember'
import layout from '../templates/components/filter-facet'
import _ from 'lodash'

function callIfDefined (context, functionName, ...args) {
  let func = context.get(functionName)

  if (_.isFunction(func)) {
    func(...args)
  }
}

export default Ember.Component.extend({
  layout,
  classNames: ['facets'],
  actions: {
    'filter-change' (filterName, value) {
      let filterState = this.get('activeFilters')
      // Create a new filter state object, this helps with observers
      filterState = _.extend({}, filterState)
      filterState[filterName] = value
      this.set('activeFilters', filterState)
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
