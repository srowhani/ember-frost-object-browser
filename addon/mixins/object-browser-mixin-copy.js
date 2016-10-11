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

export default Mixin.create(FrostListMixin, {

  initObjectBrowserMixin: on('init', function () {
    let userConfig = this.get('objectBrowserConfig')
    let namespace = typeof userConfig === 'object' ? this.get('objectBrowserConfig.namespace') :
      userConfig.map((config) => {
        return Ember.get(config, 'namespace')
      })

    console.log(namespace)

    let prefixedNamespace  = `${namespace}_`

    Ember.defineProperty(this, namespace, undefined, {})


    Ember.defineProperty(this, 'listConfig', undefined, Ember.computed.alias('objectBrowserConfig.listConfig'));
    Ember.defineProperty(this, 'objectBrowserMixinConfig', undefined, Ember.computed(
      'listMixinConfig',
      'objectBrowserConfig.controlsConfig.[]',
      'objectBrowserConfig.facetsConfig',
      'selectedItemsNumber', function () {
        return {
          listMixinConfig: this.get('listMixinConfig'),
          controlsConfig: this.get('objectBrowserConfig.controlsConfig'),
          selectedItemsNumber: this.get('selectedItemsNumber'),
          facetsConfig: this.get('objectBrowserConfig.facetsConfig'),
          onFilterFormChange: this.get('_onFilterFormChange')
        }
      }))

    Ember.defineProperty(this.get(namespace), 'onFilterFormChange', undefined, filterHandler);
    Ember.defineProperty(this.get(namespace), 'sortItems', undefined, sortHandler)

    Ember.defineProperty(this, '_onFilterFormChange', undefined,
      createActionClosure.call(this, getFromNamespace.call(this, namespace, 'onFilterFormChange'))
    )
    Ember.defineProperty(this, '_sortItems', undefined,
      createActionClosure.call(this, getFromNamespace.call(this, namespace, 'sortItems'))
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
    let activeFacets = filter
    if (!Ember.isPresent(activeFacets)) {
      return data
    }
    return data.filter((data) => {
      let key = true
      activeFacets.forEach((facet) => {
        if (data.get(facet.id).indexOf(facet.value) === -1) {
          key = false
        }
      })
      return key
    })
  },

  //TODO default sort steal from ember. Need rework
  objectBrowserDefaultSort: function (items, sortProperties) {
    function normalizeSortProperties(properties) {
      return properties.map(p => {
        let [prop, direction] = p.split(':')
        direction = direction || 'asc'

        return [prop, direction]
      })
    }

    let normalizedSortProperties = normalizeSortProperties(sortProperties)
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


  //@computed('_listItems.[]', 'activeFacets')
  //filteredItems (listItems, activeFacets) {
  //  const config = this.get('objectBrowserConfig.serializerConfig.filter.clientFilter')
  //  if (config) {
  //    if(config && typeof config === 'function') {
  //      console.log('run custom client filter')
  //      return config(listItems, activeFacets)
  //    } else {
  //      console.log('run default client filter')
  //      return this.objectBrowserDefaultFilter(listItems, activeFacets)
  //    }
  //  }
  //  return listItems
  //},
  //
  //@computed('filteredItems.[]', 'activeSortingString')
  //sortedItems (items, sortProperties) {
  //  const config = this.get('objectBrowserConfig.serializerConfig.sort.clientSort')
  //  if (config) {
  //    if(config && typeof config === 'function') {
  //      console.log('run custom client sort')
  //      return config(items, sortProperties)
  //    } else {
  //      console.log('run default client sort')
  //      return this.objectBrowserDefaultSort(items, sortProperties)
  //    }
  //  }
  //  return items
  //},

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

    loadNext() {
      const serializer = JsonApiObjectBrowserSerializer.create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })

      let pageSize = this.get('pageSize')
      let offset = this.get('offset')

      let modelKey = this.get('objectBrowserConfig.listConfig.items')
      serializer.query().then(
        (response) => {
          this.set(modelKey, this.didReceiveResponse(response))
        },
        (error) => {
          this.queryErrorHandler(error)
        }
      )
    }
  }
})
