import Ember from 'ember'
const {
  Mixin,
  on
} = Ember
import FrostListMixin from 'ember-frost-list/mixins/frost-list-mixin'
import createActionClosure from 'ember-frost-object-browser/utils/action-closure'


export default Mixin.create(FrostListMixin, {

  initObjectBrowserMixin: on('init', function () {
    Ember.defineProperty(this, 'listConfig', undefined, Ember.computed.alias('objectBrowserConfig.listConfig'));

    // probably don't need this
    Ember.defineProperty(this, '_onFilterFormChange', undefined,
      createActionClosure.call(this, this.actions.onFilterFormChange)
    )
  }),

  selectedItemsNumber: Ember.computed('selectedItems', function () {
    return Object.keys(this.get('selectedItems')).length
  }),



  objectBrowserMixinConfig: Ember.computed(
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
  }),

  actions: {
    onFilterFormChange: function (formValue) {
      let activeFacets = []
      const keys = Object.keys(formValue)
      keys.forEach((key) => {
        activeFacets.pushObject({
          id: key,
          value: formValue[key]
        })
      })
      console.log(activeFacets)
      this.set('activeFacets', activeFacets)
    }
  }

})
