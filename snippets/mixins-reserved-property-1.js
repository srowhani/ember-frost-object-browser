import Ember from 'ember'
import {ObjectBrowserMixin} from 'ember-frost-object-browser'

export default Ember.Controller.extend(ObjectBrowserMixin, {
  // input that feeds list Mixin, list Mixin is used under the hood for list configuration.
  listConfig: Ember.Object,
  // output from list Mixin
  listMixinConfig: Ember.Object,
  // output from object browser Mixin, which will be feed into object browser
  objectBrowserMixinConfig: Ember.Object,
  // the number of items currently being selected
  selectedItemsCount: Ember.computed(),
  // default client filter function
  objectBrowserDefaultFilter: function () {},
  // default client sort function
  objectBrowserDefaultSort: function () {}
})
