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
  classNameBindings: ['_isActionsVisible:actions-visible'],
  propTypes: {
    // Options
    content: PropTypes.EmberObject.isRequired,
    controls: PropTypes.EmberObject.isRequired,
    hook: PropTypes.string.isRequired,
    filters: PropTypes.EmberObject.isRequired,
    selectedItems: PropTypes.EmberObject.isRequired

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

  @readOnly
  @computed('controls.[]', 'items.@each.isSelected')
  _isActionsVisible (controls, items) {
    return !isEmpty(controls) && !isEmpty(items) && items.isAny('isSelected', true)
  }

  // == Functions =============================================================

  // == Ember Lifecycle Hooks =================================================

  // == DOM Events ============================================================

  // == Actions ===============================================================
})
