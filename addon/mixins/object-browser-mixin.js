import Ember from 'ember'
const {
  Mixin,
  on
} = Ember
import computed from 'ember-computed-decorators'
import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'
import createActionClosure from 'ember-frost-object-browser/utils/action-closure'
import JsonApiObjectBrowserSerializer from 'ember-frost-object-browser/modules/json-api-object-browser-serializer'

export default Mixin.create(FrostListMixin, {

  initObjectBrowserMixin: on('init', function () {
    Ember.defineProperty(this, '__meta_mixin_object_browser', undefined, {})
    Ember.defineProperty(this.get('__meta_mixin_object_browser'), '_state', undefined, 'before_query')

    let controlsConfig = this.get('objectBrowserConfig.controlsConfig')
    controlsConfig.forEach(controlItem => {
      let action = this.get(controlItem.action)
      Ember.set(controlItem, 'action', createActionClosure.call(this, action))
    })

    Ember.defineProperty(this, 'listConfig', undefined, Ember.computed.alias('objectBrowserConfig.listConfig'));
    Ember.defineProperty(this, 'objectBrowserMixinConfig', undefined, Ember.computed(
      'listMixinConfig',
      'objectBrowserConfig.controlsConfig.[]',
      'objectBrowserConfig.facetsConfig',
      'selectedItemsCount', function () {
        return {
          listMixinConfig: this.get('listMixinConfig'),
          controlsConfig: this.get('objectBrowserConfig.controlsConfig'),
          facetsConfig: this.get('objectBrowserConfig.facetsConfig'),
          selectedItemsCount: this.get('selectedItemsCount'),
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

  // cp: count for currently selected items
  selectedItemsCount: Ember.computed('selectedItems', function () {
    return Object.keys(this.get('selectedItems')).length
  }),

  // remove list selection state by setting selectedItems to []
  clearListState: function() {
    if(this.get('selectedItems')) {
      this.set('selectedItems', Ember.A())
    }
  },

  // default filter method for object browser
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

  // default sort method for object browser
  objectBrowserDefaultSort: function (items, sortProperties) {
    if (!Ember.isPresent(sortProperties)) {
      return
    }

    let normalizedSortProperties = sortProperties.map(sortProperty => {
      let resultArray = []
      if (sortProperty.startsWith('-')) {
        resultArray.pushObject(sortProperty.slice(1))
        resultArray.pushObject('desc')
      } else {
        resultArray.pushObject(sortProperty)
        resultArray.pushObject('asc')
      }
      return resultArray
    })

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

  queryErrorHandler: function (e) {
   Ember.Logger.error('response error: ' + e)
  },


  actions: {
    sortItems (sortItems) {
      // create serializer
      const serializer = this.get('objectBrowserConfig.serializerConfig.serializer').create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })

      // TODO remove:  get rid of junks in ember object
      let activeSorting = sortItems.map(function (item) {
        return {value: item.value, direction: item.direction}
      })

      // set state prop which will feed back to component
      this.set('activeSorting', activeSorting)

      const normalizedSorting = serializer.normalizeSort(activeSorting)

      // set qp
      //this.set('sortQueryParam', normalizedSorting)
      this.setProperties({
        sortQueryParam: normalizedSorting,
        pageQueryParam: []
      })
    },

    filterHandler (formValue) {
      this.set('objectBrowserConfig.facetsConfig.value', formValue)
      // create serializer
      const serializer = this.get('objectBrowserConfig.serializerConfig.serializer').create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })

      // normalize component output to qp
      const filter = serializer.normalizeFilter(formValue)

      // set qp
      //this.set('filterQueryParam', filter)
      this.setProperties({
        filterQueryParam: filter,
        pageQueryParam: []
      })
    },

    loadNext() {
      const serializer = this.get('objectBrowserConfig.serializerConfig.serializer').create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })
      let paginationHelper = serializer.get('pagination')

      // TODO better implementation.
      // serializer will be the set as the context of setPageQueryParam in order to use the normalizePage function inside it.
      // this will be the first argument passed into the setPageQueryParam so we get access to controller
      paginationHelper.setPageQueryParam.call(serializer, this)
    }
  }
})
