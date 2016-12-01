import Ember from 'ember'
import {
  JSONAPISerializer,
  ObjectBrowserMixin,
  DefaultSort,
  DefaultFilter
} from 'ember-frost-object-browser'

export default Ember.Controller.extend(ObjectBrowserMixin, {
  sortQueryParam: ['id'],
  filterQueryParam: [],

  // don't provide if you don't need page
  pageQueryParam: [],

  queryParams: ['filterQueryParam', 'sortQueryParam', 'pageQueryParam'],

  objectBrowserConfig: {
    list: {
      items: 'model.resources',  // the data model which will pass to list. In this scenario, actual data set is located in model: {resources: data}
      component: 'test/user-list-item', // the custom component you want to render for each single list item.
      // sort setup based on ember frost-sort API
      sorting: {
        properties: [
          {
            value: 'email',
            label: 'email'
          },
          {
            value: 'id',
            label: 'Id'
          }
        ]
      }
    },
    // facets setup based on ember-frost-bunsen API
    facets: {
      bunsenModel: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          email: {
            type: 'string'
          }
        }
      },
      bunsenView: {
        'cellDefinitions': {
          'main': {
            'children': [
              {'model': 'id'},
              {'model': 'email'}
            ]
          }
        },
        'cells': [
          {
            'extends': 'main'
          }
        ],
        'type': 'form',
        'version': '2.0'
      },
      value: {
      }
    },

    controls: [
      {
        component: 'frost-button',
        action: 'actions.triggerDelete',  // method key related to this/context/controller
        text: 'Delete',
        priority: 'secondary',
        size: 'medium',
        options: {
          multiSelect: true,
          disableControl: function () {
            return false
          }
        }
      },
      {
        component: 'frost-link',
        action: 'actions.triggerEdit',  // method key related to this/context/controller
        text: 'Edit',
        link: 'lts-qp',
        priority: 'primary',
        size: 'medium'
      },
      {
        component: 'frost-button',
        text: 'Detail',
        priority: 'secondary',
        size: 'medium'
      }
    ],

    serializer: JSONAPISerializer.create({
      model: 'user',
      client: {
        sort: DefaultSort,
        filer: DefaultFilter
      }

    })

  },

  actions: {
    triggerDelete (items) {
      this.notifications.addNotification({
        message: 'Delete Action fired',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    triggerEdit (items) {
      this.notifications.addNotification({
        message: 'Edit Action fired',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    triggerDetail (items) {
      this.notifications.addNotification({
        message: 'Detail Action fired',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }
})
