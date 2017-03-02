/**
 * TODO
 */

import Ember from 'ember'
const {isEmpty} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-object-browser'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Properties ============================================================
  propTypes: {
    // Options
    content: PropTypes.EmberObject.isRequired,
    controls: PropTypes.EmberObject.isRequired,
    hook: PropTypes.string.isRequired,
    filters: PropTypes.EmberObject.isRequired
    // State
  },

  getDefaultProps () {
    return {
      // Keywords
      layout

      // Options
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == Ember Lifecycle Hooks =================================================

  // == DOM Events ============================================================

  // == Actions ===============================================================
})
