import Ember from 'ember'
import layout from '../templates/components/frost-object-browser'
import { PropTypes } from 'ember-prop-types'
import BlockSlotMixin from 'ember-block-slots'

const {
  A,
  Component
} = Ember

/**
 * @module
 * @augments ember/Component
 * @augments module:ember-prop-types
 */
export default Component.extend(BlockSlotMixin, {

  /** @type {String[]} */
  classNames: ['frost-object-browser'],

  /** @type {Object} */
  layout,

  /** @type {Object} */
  propTypes: {
    selections: PropTypes.array
  },

  /**
   * Sets the properties with their default values
   *
   * @function
   * @return {Object} The properties with their default values
   */
  getDefaultProps () {
    return {
      selections: A([])
    }
  },

  /**
   * @type {Object}
   */
  actions: {
    // TODO Decide on an interface for selection data

    /**
     * Handles setting/clearing the user's selections in the view
     *
     * @function actions:onSelect
     * @param {ember/Array} viewSelections record that was just selected/deselected
     * @returns {undefined}
     */
    onSelect (viewSelections) {
      const selections = this.get('selections')
      selections.clear()
      if (viewSelections.length > 0) {
        selections.addObjects(viewSelections)
      }
    }
  }
})
