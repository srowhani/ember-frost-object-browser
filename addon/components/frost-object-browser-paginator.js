import Ember from 'ember'
import layout from '../templates/components/frost-object-browser-paginator'
import computed, {readOnly} from 'ember-computed-decorators'

export default Ember.Component.extend({
  layout: layout,

  @readOnly
  @computed('page', 'itemsPerPage', 'total')
  computedOffset: function (page, itemsPerPage, total) {
    if (total === 0) {
      return 0
    }

    return page * itemsPerPage + 1
  },

  @readOnly
  @computed('page', 'itemsPerPage', 'total')
  computedEnd: function (page, itemsPerPage, total) {
    const pageMax = (page + 1) * itemsPerPage
    return (total < pageMax) ? total : pageMax
  },

  @readOnly
  @computed('computedOffset', 'computedEnd', 'total')
  paginationText (computedOffset, computedEnd, total) {
    if (total === 0) {
      return '0 results found'
    }

    return `${computedOffset} to ${computedEnd} of ${total}`
  },

  @readOnly
  @computed('page')
  leftButtonsDisabled: function (page) {
    return page === 0
  },

  @readOnly
  @computed('page', 'itemsPerPage', 'total')
  rightButtonsDisabled: function (page, itemsPerPage, total) {
    if (total === 0) {
      return true
    }

    return page === Math.floor((total - 1) / itemsPerPage)
  },

  /**
   * Handle command buttons for changing pagination
   * @param {String} where - one of begin|back|forward|end
   */
  onPageChanged (where) {
    this.sendAction('onPageChanged', where)
  }

})
