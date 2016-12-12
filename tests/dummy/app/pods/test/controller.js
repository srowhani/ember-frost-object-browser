import Ember from 'ember'
import {
  JSONAPISerializer,
  ObjectBrowserMixin,
  DefaultSort,
  DefaultFilter
} from 'ember-frost-object-browser'
import {generateFacetView} from 'ember-frost-bunsen/utils'

const facetsDefinition = [
  {model: 'id', label: 'Id'},
  {model: 'email', label: 'Email'}
]

export default Ember.Controller.extend(ObjectBrowserMixin, {
  sortQueryParam: ['id'],
  filterQueryParam: [],

  // don't provide if you don't need page
  pageQueryParam: [],

  queryParams: ['filterQueryParam', 'sortQueryParam', 'pageQueryParam'],

  bunsenConfig: {
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
    bunsenView: generateFacetView(facetsDefinition),
    value: {}
  },

  objectBrowserConfig: Ember.computed('buttonText', 'selectedItems', function () {
    return {
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
      facets: this.get('bunsenConfig'),

      controls: [
        {
          component: 'frost-button',
          multiSelect: true,
          options: {
            text: this.get('buttonText'),
            priority: 'secondary',
            size: 'medium',
            onClick: this.get('actions.triggerDelete')
          }
        },
        {
          component: 'frost-button',
          options: {
            disabled: true,
            text: 'Edit',
            priority: 'secondary',
            size: 'medium',
            onClick: this.get('actions.triggerEdit')
          }
        },
        {
          component: 'frost-link',
          options: {
            text: 'Detail',
            route: 'user',
            routeModels: this.get('dynamicModel'),
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
    }
  }),

  buttonText: 'hello button',

  //selectedItems: Ember.computed.filterBy('objectBrowserMixinConfig.listMixinConfig.items', 'isSelected', true),

  selectedItems: Ember.computed.filterBy('statefulListItems', 'isSelected', true),


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
      this.set('buttonText', 'world hello')
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
    }
  }
})
