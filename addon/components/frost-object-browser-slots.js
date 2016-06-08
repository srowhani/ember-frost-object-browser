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
    // TODO Decide on an interface for selection data
    onSelect(viewSelections) {
      const selections = this.get('selections')
      selections.clear()
      if (viewSelections.length > 0) {
        selections.addObjects(viewSelections)
      }
    }
  }
})
