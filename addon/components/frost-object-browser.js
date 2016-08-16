import Ember from 'ember'
import layout from '../templates/components/frost-object-browser'
import { PropTypes } from 'ember-prop-types'
import SlotsMixin from 'ember-block-slots'

const {
  A,
  Component
} = Ember

export default Component.extend(SlotsMixin, {

  actionsAnimation() {
    this.transition(
      this.toValue(true),
      this.use('to-up'),
      this.reverse('to-down')
    )
  },
  classNames: ['frost-object-browser'],
  layout,

})
