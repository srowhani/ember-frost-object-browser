import {ObjectBrowserMixin} from 'ember-frost-object-browser'

export default Ember.Controller.extend(ObjectBrowserMixin, {
  objectBrowserConfig: {
    listConfig: {},
    facetsConfig: {},
    controlsConfig: [],
    serializerConfig: {}
  }
})
