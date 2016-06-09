import Ember from 'ember'
import FrostLink from 'ember-frost-core/components/frost-link'

const {
  computed
} = Ember

export default FrostLink.extend({
  disabled: computed('selections.[]', function () {
    const length = this.get('selections.length')
    if (this.get('multiSelect')) {
      return length < 1
    } else {
      return length !== 1
    }
  })
})
