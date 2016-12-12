import Ember from 'ember'
import layout from './template'
// BEGIN-SNIPPET mixin
import SpreadMixin from 'ember-spread'

export default Ember.Component.extend(SpreadMixin, {
  layout
})
