import Ember from 'ember'
import FrostButton from 'ember-frost-core/components/frost-button'
import _ from 'lodash'

const {
  computed,
  ViewUtils
} = Ember

/**
 * @module
 * @augments module:ember-frost-core/components/frost-button
 */
export default FrostButton.extend({

  /**
   * Sets the properties with their default values
   *
   * @function
   * @return {Object} The properties with their default values
   */
  getDefaultProps () {
    const defaults = this._super()
    delete defaults.disabled
    return defaults
  },

  /**
   * Determines whether the button is disabled based on the user having items selected in the view slot.
   * If multiSelect is NOT set then only one item can be selected or the button will be disabled.
   *
   * @function
   * @return {Boolean} Should this button be disabled
   */
  disabled: computed('selections.[]', function () {
    const length = this.get('selections.length')
    if (this.get('multiSelect')) {
      return length < 1
    } else {
      return length !== 1
    }
  }),

  /**
   * Sets up behavior for onClick event
   *
   * @function
   * @param  {Object} event The mouse click event
   * @return {Boolean} If user does Shift|Ctrl|Alt|Meta|Secondary + click, then exit the function
   * without doing the logic to execute the closure action
   */
  onclick: Ember.on('click', function (event) {
    if (!ViewUtils.isSimpleClick(event)) {
      return true
    }

    if (!this.get('disabled') && _.isFunction(this.attrs['onClick'])) {
      this.attrs['onClick'](this.get('selections'))
    }
  })
})
