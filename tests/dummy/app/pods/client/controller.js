/**
 * TODO
 */

import Ember from 'ember'
const {A, Controller, get, inject, isEmpty} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {generateFacetView} from 'ember-frost-bunsen/utils'
import {sort} from 'ember-frost-sort'
import _ from 'lodash'

export default Controller.extend({

  // == Dependencies ==========================================================

  notifications: inject.service('notification-messages'),

  // == Keyword Properties

  queryParams: ['filters', 'sortOrder'],

  // == Properties ============================================================

  filters: {},
  filterModel: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      label: { type: 'string' }
    }
  },
  filterView: generateFacetView([
    {label: 'Id', model: 'id'},
    {label: 'Label', model: 'label'}
  ]),
  itemsPerPage: 100,
  lastPage: 0,
  selectedItems: [],
  sortOrder: ['id'],
  sortingProperties: [
    { label: 'Id', value: 'id' },
    { label: 'Label', value: 'label' }
  ],

  // == Computed Properties ===================================================

  @readOnly
  @computed('selectedItems.@each.id')
  detailLinkRouteNames (selectedItems) {
    return selectedItems.map((selectedItem) => {
      return `${window.location.origin}/#/user/${selectedItem.get('id')}`
    })
  },

  @readOnly
  @computed('filters', 'model.[]', 'sortOrder.[]')
  items (filters, model, sortOrder) {
    if (isEmpty(model)) {
      return []
    }

    // Client side filtering
    let filteredItems = model
    if (!isEmpty(filters)) {
      filteredItems = model.filter((item) => {
        return A(Object.keys(filters)).every(key => {
          return get(item, key).indexOf(get(filters, key)) >= 0
        })
      })
    }

    // Client side sorting
    return sort(filteredItems, sortOrder)
  },

  @readOnly
  @computed('selectedItems.@each.label')
  labelIncludesF (selectedItems) {
    return selectedItems.find((selectedItem) => {
      return selectedItem.get('label').toLowerCase().includes('f')
    })
  },

  // == Functions =============================================================

  fetchPage (page) {
    // serializer.setFilterPropertyFromQueryParam(controller)
    // serializer.setSortPropertyFromQueryParam(controller)
    // return serializer.query(params, controller)

    // Optional
    // this.get('selectedItems').clear()
    // this.get('expandedItems').clear()

    this.get('notifications').success(`Fetching page ${page}`, {
      autoClear: true,
      clearDuration: 2000
    })
    // TODO Use extracted pagination for the request
    // let queryObject = {
    //   filter: this.get('filters'),
    //   sort: this.get('sortOrder'),
    //   page
    // }
    this.store.query('list-item', {
      pageSize: this.get('itemsPerPage'),
      start: (page * this.get('itemsPerPage'))
    }).then((response) => {
      // TODO Extract pagination from meta
      // let meta = response.get('meta')
      // this.get('pagination').processPageResponse(response, context, queryObject) : response
      this.set('model', this.store.peekAll('list-item'))
    })
  },

  // == Ember Lifecycle Hooks =================================================

  // == Actions ===============================================================

  actions: {
    onFilteringChange (filters) {
      // this.set('page', 0)
      this.set('filters', _.cloneDeep(filters))
    },

    onGenericAction (selectedItems, message) {
      this.get('notifications').success('Generic action', {
        autoClear: true,
        clearDuration: 2000
      })
    },

    onLoadNext (page) {
      this.set('lastPage', this.get('lastPage') + 1)
      this.fetchPage(this.get('lastPage'))
    },

    onSelectionChange (selectedItems) {
      this.get('selectedItems').setObjects(selectedItems)
    },

    onSortingChange (sortOrder) {
      // this.set('page', 0)
      this.get('sortOrder').setObjects(sortOrder)
    }
  }
})
