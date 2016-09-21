import Ember from 'ember'
import layout from './template'
import computed, {readOnly} from 'ember-computed-decorators'
import { PropTypes } from 'ember-prop-types'
import _ from 'lodash'
import FrostListItem from 'ember-frost-list/components/frost-list-item'

export default FrostListItem.extend({
  classNames: ['user-list-item'],
  record: Ember.computed.alias('model.record')

})
