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
      component: 'users/user-list-item', // the custom component you want to render for each single list item.
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
        disable: function (items) {
          return false
        },
        multiSelect: true,
        options: {
          id: '1234',
          text: 'Delete',
          priority: 'secondary',
          size: 'medium',
          onClick: 'actions.triggerDelete'
        }
      },
      {
        component: 'frost-button',
        options: {
          text: 'edit',
          priority: 'secondary',
          size: 'medium',
          onClick: 'actions.triggerEdit'
        }
      },
      {
        component: 'frost-link',
        options: {
          text: 'Detail',
          route: 'user',
          routeModels: 'cp.dynamicModel',
          priority: 'secondary',
          size: 'medium'
        }
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

  selectedItems: Ember.computed.filterBy('objectBrowserMixinConfig.listMixinConfig.items', 'isSelected', true),

  dynamicModel: Ember.computed('selectedItems', function () {
    let selectedItems = this.get('selectedItems')
    if (selectedItems.length > 1) {
      return [selectedItems.objectAt(0)]
    } else {
      return selectedItems
    }
  }),

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
