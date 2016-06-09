import Ember from 'ember'
import FrostButton from 'ember-frost-core/components/frost-button'
import _ from 'lodash'

const {
  computed,
  ViewUtils
} = Ember

export default FrostButton.extend({
  getDefaultProps () {
    const defaults = this._super()
    delete defaults.disabled
    return defaults
  },

  disabled: computed('selections.[]', function () {
    const length = this.get('selections.length')
    if (this.get('multiSelect')) {
      return length < 1
    } else {
      return length !== 1
    }
  }),

  onclick: Ember.on('click', function (event) {
    if (!ViewUtils.isSimpleClick(event)) {
      return true
    }

    if (!this.get('disabled') && _.isFunction(this.attrs['onClick'])) {
      this.attrs['onClick'](this.get('selections'))
    }
  })
})
