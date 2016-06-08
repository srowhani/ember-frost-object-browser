import Ember from 'ember'
import FrostButton from 'ember-frost-core/components/frost-button'

const {
  computed
} = Ember

export default FrostButton.extend({
  disabled: computed('selections.[]', function() {
    const length = this.get('selections.length')
    if (this.get('multiSelect')) {
    	return length < 1
    } else {
    	return length !== 1
    }
  })
})
