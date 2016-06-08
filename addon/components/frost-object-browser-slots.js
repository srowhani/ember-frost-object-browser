import Ember from 'ember'
import layout from '../templates/components/frost-object-browser-slots'
import { PropTypes } from 'ember-prop-types'

const {
  A,
  Component
} = Ember

export default Ember.Component.extend({
  classNames: ['frost-object-browser-slots'],
  layout,
  propTypes: {
    selections: PropTypes.array
  },

  getDefaultProps () {
    return {
      selections: A([])
    }
  },

  actions: {
    onSelect(item) {
      const selections = this.get('selections')
      if (item.isSelected) {
        selections.addObject(item.record)
      } else {
        selections.removeObject(item.record)
      }
    }
  }
})
