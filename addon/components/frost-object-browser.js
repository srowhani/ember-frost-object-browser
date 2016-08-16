import Ember from 'ember'
import layout from '../templates/components/frost-object-browser'
import SlotsMixin from 'ember-block-slots'

const {
  Component
} = Ember

export default Component.extend(SlotsMixin, {

  actionsAnimation () {
    this.transition(
      this.toValue(true),
      this.use('to-up'),
      this.reverse('to-down')
    )
  },
  classNames: ['frost-object-browser'],
  layout

})
