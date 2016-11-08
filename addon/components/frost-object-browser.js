import Ember from 'ember';
import layout from '../templates/components/frost-object-browser';

export default Ember.Component.extend({
  layout,
  classNames: ['frost-object-browser'],

  items: Ember.computed('items', 'config', function () {
    return this.get('config') ? this.get('config.listMixinConfig.items') : this.get('items')
  }),

  selectedItems: Ember.computed.filterBy('items', 'isSelected', true)
});
