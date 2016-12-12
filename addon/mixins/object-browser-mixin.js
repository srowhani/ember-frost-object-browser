import Ember from 'ember'
const {
  get,
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

    const listConfig = get(objectBrowserConfig, 'list')
    const facetsConfig = get(objectBrowserConfig, 'facets')
    const controlsConfig = get(objectBrowserConfig, 'controls')

    //const serializerConfig = get(objectBrowserConfig, 'serializerConfig')

    typeAssert(`Expected 'objectBrowserConfig.list' to be object or Ember.Object, received ${typeOf(listConfig)}`,
      listConfig, ['instance', 'object'])
    typeAssert(`Expected 'objectBrowserConfig.facets' to be object or Ember.Object, received ${typeOf(facetsConfig)}`,
      facetsConfig, ['instance', 'object'])
    typeAssert(`Expected 'objectBrowserConfig.controls' to be array or Ember.Array, received ${typeOf(controlsConfig)}`,
      controlsConfig, ['instance', 'array'])

    Ember.defineProperty(this, 'listConfig', undefined, Ember.computed.alias('objectBrowserConfig.list'))
    Ember.defineProperty(this, '_onFilterFormChange', undefined,
      createActionClosure.call(this, this.actions.filterItems)
    )
    Ember.defineProperty(this, 'objectBrowserMixinConfig', undefined, Ember.computed(
      'listMixinConfig',
      'objectBrowserConfig.controls.[]',
      'objectBrowserConfig.facets',
      'selectedItemsCount', function () {
        const objectBrowserConfig = this.get('objectBrowserConfig')
        typeAssert(`Expected 'objectBrowserConfig' to be object or Ember.Object, received ${typeOf(objectBrowserConfig)}`,
          objectBrowserConfig, ['instance', 'object'])

        const controlsConfig = get(objectBrowserConfig, 'controls')

        controlsConfig.forEach(controlItem => {
          typeAssert(`Expected each item in 'objectBrowserConfig.controls'
          to be object or Ember.Object, received ${typeOf(controlItem)}`,
            controlItem, ['instance', 'object'])

          // create closure actions when necessary
          const options = get(controlItem, 'options')

          typeAssert(`Expected 'control.options'
          to be object or Ember.Object, received ${typeOf(options)}`,
            options, ['instance', 'object'])

          Object.keys(options).forEach((key) => {
            let value = options[key]
            if (typeOf(value) === 'function' && key.startsWith('on')) {
              Ember.set(options, key, createActionClosure.call(this, value, (method, args = []) => {
                method.call(this)
              }))
            }
            // type check for disable property
            if (key === 'disabled') {
              typeAssert(`Expected 'disabled' to be boolean, received ${typeOf(options[key])}`,
                options[key], 'boolean')
            }
          })
        })

        return {
          listMixinConfig: this.get('listMixinConfig'),
          controls: this.get('objectBrowserConfig.controls'),
          facets: this.get('objectBrowserConfig.facets'),
          selectedItemsCount: this.get('selectedItemsCount'),
          onFilterFormChange: this.get('_onFilterFormChange')
        }
      }))
  }),

  // cp: count for currently selected items
  selectedItemsCount: Ember.computed('selectedItemDictionary', function () {
    return Object.keys(this.get('selectedItemDictionary')).length
  }),

  // remove list selection state by setting selectedItems to Ember.A()
  clearListState: function () {
    if (this.get('selectedItemDictionary')) {
      this.set('selectedItemDictionary', Ember.A())
    }
  },

  normalizeFilter (filter) {
    const keys = Object.keys(filter)
    if (!Ember.isPresent(keys)) {
      return []
    }
    // get rid of extra props from bunsen component output
    let processedFilter = {}
    keys.forEach((key) => {
      processedFilter[key] = filter[key]
    })
    return processedFilter
  },

  normalizeSort (sort) {
    if (!Ember.isPresent(sort)) {
      return []
    }
    return sort.map(function (item) {
      const key = item.value
      const direction = item.direction === ':desc' ? '-' : ''
      return `${direction}${key}`
    })
  },

  normalizePage (page) {
    return page
  },

  actions: {
    sortItems (sortItems) {
      // TODO This is used to get rid of extra properties coming from ember object. Remove this when sort component improved.
      let activeSorting = sortItems.map(function (item) {
        return {value: item.value, direction: item.direction}
      })

      // set state prop which will feed back to component
      // this.set('activeSorting', activeSorting)

      const normalizedSorting = this.normalizeSort(activeSorting)

      this.setProperties({
        sortQueryParam: normalizedSorting,
        pageQueryParam: []
      })
    },

    filterItems (formValue) {
      this.set('objectBrowserConfig.facets.value', formValue)
      const filter = this.normalizeFilter(formValue)
      this.setProperties({
        filterQueryParam: filter,
        pageQueryParam: []
      })
    },

    loadNext () {
      //const serializer = this.get('objectBrowserConfig.serializerConfig.serializer').create({
      //  config: this.get('objectBrowserConfig.serializerConfig'),
      //  context: this
      //})

      //paginationHelper.requestNext.call(this, queryObject, serializer)


      const serializer = this.get('objectBrowserConfig.serializer')
      const paginationHelper = serializer.get('pagination')
      let queryObject = paginationHelper.prepareQueryObject.call(this)

      let dataKey = this.get('objectBrowserConfig.list.items')
      serializer.query(queryObject, this).then((response) => {
        this.set(dataKey, response)
      })
    }
  }
})
