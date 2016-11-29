import Ember from 'ember'
const {
  get,
  isPresent,
  typeOf,
  Mixin,
  on
  } = Ember
import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'
import createActionClosure from 'ember-frost-object-browser/utils/action-closure'
import {typeAssert} from 'ember-frost-object-browser/utils/error-handle'

export default Mixin.create(FrostListMixin, {
  sortQueryParam: [],
  filterQueryParam: [],
  pageQueryParam: [],
  queryParams: ['filterQueryParam', 'sortQueryParam', 'pageQueryParam'],

  initObjectBrowserMixin: on('init', function () {
    const objectBrowserConfig = this.get('objectBrowserConfig')
    typeAssert(`Expected 'objectBrowserConfig' to be object or Ember.Object, received ${typeOf(objectBrowserConfig)}`,
      objectBrowserConfig, ['instance', 'object'])

    const listConfig = get(objectBrowserConfig, 'listConfig')
    const facetsConfig = get(objectBrowserConfig, 'facetsConfig')
    const controlsConfig = get(objectBrowserConfig, 'controlsConfig')
    const serializerConfig = get(objectBrowserConfig, 'serializerConfig')

    typeAssert(`Expected 'listConfig' to be object or Ember.Object, received ${typeOf(listConfig)}`,
      listConfig, ['instance', 'object'])
    typeAssert(`Expected 'facetsConfig' to be object or Ember.Object, received ${typeOf(facetsConfig)}`,
      facetsConfig, ['instance', 'object'])
    typeAssert(`Expected 'controlsConfig' to be array or Ember.Array, received ${typeOf(controlsConfig)}`,
      controlsConfig, ['instance', 'array'])
    typeAssert(`Expected 'serializerConfig' to be object or Ember.Object, received ${typeOf(serializerConfig)}`,
      serializerConfig, ['instance', 'object'])

    // closure any function related to controls section
    controlsConfig.forEach(controlItem => {
      typeAssert(`Expected each item in 'controlsConfig' to be object or Ember.Object, received ${typeOf(controlItem)}`,
        controlItem, ['instance', 'object'])

      if (get(controlItem, 'action')) {
        // get(controlItem, 'action') will return the path of action if exists.
        let action = this.get(get(controlItem, 'action'))
        Ember.set(controlItem, 'action', createActionClosure.call(this, action))
      } else {
        // no-op when action not provided
        Ember.set(controlItem, 'action', createActionClosure.call(this, function () {
        }))
      }

      const disableControl = Ember.get(controlItem, 'options.disableControl')
      if (disableControl) {
        typeAssert(`Expected 'disabledControl' to be function, received ${typeOf(disableControl)}`,
          disableControl, 'function')
        Ember.set(controlItem, 'options.disableControl', createActionClosure.call(this, disableControl))
      }
    })

    Ember.defineProperty(this, 'listConfig', undefined, Ember.computed.alias('objectBrowserConfig.listConfig'))
    Ember.defineProperty(this, '_onFilterFormChange', undefined,
      createActionClosure.call(this, this.actions.filterItems)
    )
    Ember.defineProperty(this, 'objectBrowserMixinConfig', undefined, Ember.computed(
      'listMixinConfig',
      'objectBrowserConfig.controlsConfig.[]',
      'objectBrowserConfig.facetsConfig',
      'selectedItemsCount', function () {
        return {
          listMixinConfig: this.get('listMixinConfig'),
          controlsConfig: controlsConfig,
          facetsConfig: facetsConfig,
          selectedItemsCount: this.get('selectedItemsCount'),
          onFilterFormChange: this.get('_onFilterFormChange')
        }
      }))
  }),

  // cp: count for currently selected items
  selectedItemsCount: Ember.computed('selectedItems', function () {
    return Object.keys(this.get('selectedItems')).length
  }),

  // remove list selection state by setting selectedItems to Ember.A()
  clearListState: function () {
    if (this.get('selectedItems')) {
      this.set('selectedItems', Ember.A())
    }
  },

  // default filter method for object browser
  objectBrowserDefaultFilter: function (data, filter) {
    if (!isPresent(filter)) {
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
    if (!isPresent(sortProperties)) {
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
        let [prop, direction] = normalizedSortProperties[i]
        let result = Ember.compare(Ember.get(itemA, prop), Ember.get(itemB, prop))
        if (result !== 0) {
          return (direction === 'desc') ? (-1 * result) : result
        }
      }
      return 0
    }))
  },

  actions: {
    sortItems (sortItems) {
      // create serializer
      const serializer = this.get('objectBrowserConfig.serializerConfig.serializer').create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })

      // TODO This is used to get rid of extra properties coming from ember object. Remove this when sort component improved.
      let activeSorting = sortItems.map(function (item) {
        return {value: item.value, direction: item.direction}
      })

      // set state prop which will feed back to component
      // this.set('activeSorting', activeSorting)

      const normalizedSorting = serializer.normalizeSort(activeSorting)

      this.setProperties({
        sortQueryParam: normalizedSorting,
        pageQueryParam: []
      })
    },

    filterItems (formValue) {
      this.set('objectBrowserConfig.facetsConfig.value', formValue)
      // create serializer
      const serializer = this.get('objectBrowserConfig.serializerConfig.serializer').create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })

      // normalize component output to qp
      const filter = serializer.normalizeFilter(formValue)

      this.setProperties({
        filterQueryParam: filter,
        pageQueryParam: []
      })
    },

    loadNext () {
      const serializer = this.get('objectBrowserConfig.serializerConfig.serializer').create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })
      const paginationHelper = serializer.get('pagination')
      let queryObject = paginationHelper.prepareQueryObject.call(this)

      // TODO better implementation
      // serializer will be the set as the context of requestNext in order to use the normalizePage function inside it.
      // this will be the first argument passed into the requestNext so we get access to controller
      paginationHelper.requestNext.call(this, queryObject, serializer)
    }
  }
})
