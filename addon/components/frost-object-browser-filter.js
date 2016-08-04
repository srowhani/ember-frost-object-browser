import Ember from 'ember'
import layout from '../templates/components/frost-object-browser-filter'
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
  updateFilterState (filterState) {
    this.set('activeFilters', filterState)
    callIfDefined(this, 'onFilter', filterState)
  },
  actions: {
    'filter-change' (filterName, value) {
      let filterState = this.get('activeFilters')
      // Create a new filter state object, this helps with observers
      filterState = _.clone(filterState)
      filterState[filterName] = value

      let filterData = this.get('filters')
      let filterIndex = _.findIndex(filterData, function (item) {
        return item.name === filterName
      })

      this.set(`filters.${filterIndex}.selectedValue`, value)

      this.updateFilterState(filterState)
    },
    'clear-filter' (filterName) {
      let filterState = this.get('activeFilters')
      filterState = _.extend({}, filterState)
      filterState[filterName] = [null]

      let filterData = this.get('filters')
      let filterIndex = _.findIndex(filterData, function (item) {
        return item.name === filterName
      })

      this.set(`filters.${filterIndex}.selectedValue`, null)

      this.updateFilterState(filterState)
    },
    'toggle-hidden' (index) {
      const filterIsShowing = `filters.${index}.showing`

      const newVal = !this.get(filterIsShowing)
      this.set(filterIsShowing, newVal)
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
