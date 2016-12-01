import {ObjectBrowserMixin} from 'ember-frost-object-browser'

export default Ember.Controller.extend(ObjectBrowserMixin, {
  objectBrowserConfig: {
    list: {},
    facets: {},
    controls: [],
    serializer: {}
  }
})
