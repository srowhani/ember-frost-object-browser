import Ember from 'ember'
import layout from '../templates/components/frost-object-browser'
import {PropTypes} from 'ember-prop-types'

export default Ember.Component.extend({
  layout,
  classNames: ['frost-object-browser'],

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

  selectedItems: Ember.computed.filterBy('items', 'isSelected', true)
})
