import Ember from 'ember'
import FrostLink from 'ember-frost-core/components/frost-link'

const {
  computed
} = Ember

/**
 * @module
 * @augments module:ember-frost-core/components/frost-link
 */
export default FrostLink.extend({

  /**
   * Determines whether the link button is disabled based on the user having items selected in the view slot.
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
  })
})
