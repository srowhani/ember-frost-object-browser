import Ember from 'ember'
import layout from '../templates/components/frost-object-browser'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
const {get, isPresent} = Ember

export default Ember.Component.extend(PropTypeMixin, {
  layout,
  classNames: ['frost-object-browser'],
  _items: Ember.computed('items', 'config', function () {
    return this.get('config') ? this.get('config.listMixinConfig.items') : this.get('items')
  }),

  propTypes: {
    items: PropTypes.EmberObject,
    facets: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.EmberObject
    ]),
    content: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.EmberObject
    ]),
    controls: PropTypes.oneOfType([
      PropTypes.null,
      PropTypes.EmberObject
    ]),
    objectBrowserMixinConfig: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.EmberObject
    ])
  },

  selectedItems: Ember.computed.filterBy('_items', 'isSelected', true),

  /* eslint-disable complexity */
  isActionShow: Ember.computed('selectedItems.[]', function () {
    let selectedItems = this.get('selectedItems')
    let selectedItemsCount = selectedItems.length || 0
    let controls = this.get('config.controls')
    let isShow = false

    for (let i = 0; i < controls.length; i++) {
      const control = controls[i]
      const disabled = get(control, 'disabled')
      const multiSelect = get(control, 'multiSelect') || false

      if (isPresent(disabled)) {
        isShow = disabled
        if (isShow === true) {
          return true
        }
      }

      if (multiSelect === true) {
        isShow = selectedItemsCount !== 0
        if (isShow === true) {
          return true
        }
      }
    }
  })
  /* eslint-enable complexity */
})
