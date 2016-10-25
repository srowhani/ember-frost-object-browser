import Ember from 'ember';
import layout from '../templates/components/frost-object-browser';

export default Ember.Component.extend({
  layout,
  classNames: ['frost-object-browser'],

  _items: Ember.computed('items', 'config', function () {
    return this.get('config') ? this.get('config.listMixinConfig.items') : this.get('items')
  }),

  _selectedItems: Ember.computed.filterBy('_items', 'isSelected', true)
});
