import Ember from 'ember'
import layout from './template'
const {
  Component,
  String: {
    htmlSafe
  }
} = Ember
export default Component.extend({
  layout,
  formModel: {
    type: 'object',
    properties: {
      username: {
        type: 'string'
      },
      firstName: {
        type: 'string'
      }
    }
  },

  formView: {
    version: '1.0',
    type: 'form',
    rootContainers: [{
      label: 'Main',
      container: 'main'
    }],
    containers: [{
      id: 'main',
      rows: [[{
        model: 'username'
      }], [{
        model: 'firstName'
      }]
      ]
    }]
  },

  actions: {
    onFilterFormChange() {
    }
  }



})
