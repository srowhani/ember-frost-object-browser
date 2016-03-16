import computed, {readOnly} from 'ember-computed-decorators'
import FrostListItem from 'ember-frost-list/pods/components/frost-list-item/component'
import layout from '../templates/components/frost-object-browser-list-item'

export default FrostListItem.extend({
  layout: layout,

  classNames: ['frost-list-item'],
  classNameBindings: ['isSmall:small', 'isMedium:medium', 'isLarge:large'],

  @readOnly
  @computed('detailLevel')
  isSmall: function (detailLevel) {
    return detailLevel === 'small'
  },

  @readOnly
  @computed('detailLevel')
  isMedium: function (detailLevel) {
    return detailLevel === 'medium'
  },

  @readOnly
  @computed('detailLevel')
  isLarge: function (detailLevel) {
    return detailLevel === 'large'
  },

  @readOnly
  @computed('model._hash', 'model.hasDirtyAttributes') // This forces bunsen to re-render when editing starts or save completes
  record () {
    return this.get('model')
  }
})
