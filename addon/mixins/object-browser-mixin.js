import Ember from 'ember'
const {
  Mixin,
  on
} = Ember
import computed from 'ember-computed-decorators'
import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'
import createActionClosure from 'ember-frost-object-browser/utils/action-closure'
import JsonApiObjectBrowserSerializer from 'ember-frost-object-browser/modules/json-api-object-browser-serializer'
import {
  filterHandler,
  sortHandler,
  getFromNamespace
} from 'ember-frost-object-browser/utils/object-browser-utils'



//
//let filterString ='filter[name]=quincy&filter[severity]=1,2,3'
//
//let query = {
//  filter: filterString1
//}
//
//store.query('model', query)

// result request url
// endpoint/model?filter=filter[name]=quincy&filter[severity]=1,2,3
// Json spec
// endpoint/model?filter[name]=quincy&filter[severity]=1,2,3



export default Mixin.create(FrostListMixin, {

  initObjectBrowserMixin: on('init', function () {
    Ember.defineProperty(this, '__meta_mixin_object_browser', undefined, {})
    Ember.defineProperty(this.get('__meta_mixin_object_browser'), '_state', undefined, 'before_query')

    Ember.defineProperty(this, 'listConfig', undefined, Ember.computed.alias('objectBrowserConfig.listConfig'));
    Ember.defineProperty(this, 'objectBrowserMixinConfig', undefined, Ember.computed(
      'listMixinConfig',
      'objectBrowserConfig.controlsConfig.[]',
      'objectBrowserConfig.facetsConfig',
      'selectedItemsNumber', function () {
        return {
          listMixinConfig: this.get('listMixinConfig'),
          controlsConfig: this.get('objectBrowserConfig.controlsConfig'),
          facetsConfig: this.get('objectBrowserConfig.facetsConfig'),
          selectedItemsNumber: this.get('selectedItemsNumber'),
          onFilterFormChange: this.get('_onFilterFormChange'),
          sortItems: this.get('_sortItems')
        }
    }))

    Ember.defineProperty(this, '_onFilterFormChange', undefined,
      createActionClosure.call(this, this.actions.filterHandler)
    )
    Ember.defineProperty(this, '_sortItems', undefined,
      createActionClosure.call(this, this.actions.sortHandler)
    )
  }),

  selectedItemsNumber: Ember.computed('selectedItems', function () {
    return Object.keys(this.get('selectedItems')).length
  }),

  clearListState: function() {
    if(this.get('selectedItems')) {
      this.set('selectedItems', Ember.A())
    }
  },

  // default filter method
  objectBrowserDefaultFilter: function (data, filter) {
    if (!Ember.isPresent(filter)) {
      return data
    }
    return data.filter((data) => {
      let qualified = true
      let keys = Object.keys(filter)

      keys.forEach(key => {
        if (data.get(key).indexOf(filter[key]) === -1) {
          qualified = false
        }
      })

      return qualified
    })
  },

  //TODO default sort steal from ember. Need rework
  objectBrowserDefaultSort: function (items, sortProperties) {
    function normalizeToString(activeSorting) {
      if (!activeSorting) return []
      return activeSorting.map((sortProperty) => {
        return `${sortProperty.value}${sortProperty.direction}`
      })
    }

    function normalizeSortProperties(properties) {
      return properties.map(p => {
        let [prop, direction] = p.split(':')
        direction = direction || 'asc'

        return [prop, direction]
      })
    }

    let activeSortingString = normalizeToString(sortProperties)
    let normalizedSortProperties = normalizeSortProperties(activeSortingString)
    return Ember.A(items.slice().sort((itemA, itemB) => {
      for (let i = 0; i < normalizedSortProperties.length; i++) {
        let [prop, direction] = normalizedSortProperties[i];
        let result = Ember.compare(Ember.get(itemA, prop), Ember.get(itemB, prop));
        if (result !== 0) {
          return (direction === 'desc') ? (-1 * result) : result;
        }
      }
      return 0;
    }));
  },

  // hooks
  didReceiveResponse: function (response) {
    return response
  },

  didReceivePaginationResponse: function (response) {
    return response
  },

  queryErrorHandler: function (e) {
   Ember.Logger.error('response error: ' + e)
  },

  actions: {
    sortItems (sortItems) {

      // create serializer
      const serializer = this.get('objectBrowserConfig.serializerConfig.options.serializer').create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })

      // TODO remove get rid of junks in ember object
      let activeSorting = sortItems.map(function (item) {
        return {value: item.value, direction: item.direction}
      })

      // set state prop which will feed back to component
      this.set('activeSorting', activeSorting)

      const normalizedSorting = serializer.normalizeSort(activeSorting)

      // set qp
      this.set('sortQueryParam', normalizedSorting)
    },

    filterHandler (formValue) {
      this.set('objectBrowserConfig.facetsConfig.value', formValue)
      // create serializer
      const serializer = this.get('objectBrowserConfig.serializerConfig.options.serializer').create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })

      // normalize component output to qp
      const filter = serializer.normalizeFilter(formValue)

      // set qp
      this.set('filterQueryParam', filter)
    },

    // TODO need further work
    loadNext() {
      this.set('page', Number(this.get('lastPage')) + 1)
      //const serializer = JsonApiObjectBrowserSerializer.create({
      //  config: this.get('objectBrowserConfig.serializerConfig'),
      //  context: this
      //})
      //
      //let pageSize = this.get('pageSize')
      //let offset = this.get('offset')
      //
      //let modelKey = this.get('objectBrowserConfig.listConfig.items')
      //serializer.query().then(
      //  (response) => {
      //    this.set(modelKey, this.didReceiveResponse(response))
      //  },
      //  (error) => {
      //    this.queryErrorHandler(error)
      //  }
      //)
    }
  }
})
