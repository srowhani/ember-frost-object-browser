import Ember from 'ember'
import {ObjectBrowserMixin} from 'ember-frost-object-browser'

export default Ember.Controller.extend(ObjectBrowserMixin, {
  objectBrowserConfig: {
    listConfig: {
      items: 'model',  // the data model which will pass to list. In this scenario, actual data set is located in model: {resources: data}
      component: 'test/user-list-item', // the custom component you want to render for each single list item.
      // sort setup based on ember frost-sort API
      sorting: {
        active: [{value: 'alias', direction: ':desc'}],
        properties: [
          {
            value: 'employeeNumber',
            label: 'Employee Number'
          },
          {
            value: 'id',
            label: 'Id'
          }
        ]
      }
    }
  }
})
