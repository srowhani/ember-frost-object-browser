import Ember from 'ember'
import {
  ObjectBrowserSerializer,
  ObjectBrowserMixin
} from 'ember-frost-object-browser'

export default Ember.Controller.extend(ObjectBrowserMixin, {
  sortQueryParam: ['-id'],
  filterQueryParam: [],

  // don't provide if you don't need page
  pageQueryParam: [],

  queryParams: ['filterQueryParam', 'sortQueryParam', 'pageQueryParam'],

  objectBrowserConfig: {
    listConfig: {
      items: 'model',  // the data model which will pass to list. In this scenario, actual data set is located in model: {resources: data}
      component: 'test/user-list-item', // the custom component you want to render for each single list item.
      // sort setup based on ember frost-sort API
      sorting: {
        active: [{value: 'id', direction: ':desc'}],
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
    facetsConfig: {
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

    controlsConfig: [
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

    // Config the data layer to tell object-browser how to communicate with server
    serializerConfig: {
      // here is the place you can change the data layer. Currently there're two built in options, default(MCP) and json API.
      // data layer contains function
      // 1. serialize the component output to corresponding query params
      // 2. improved query() who's responsible for talking to server
      // 3. hooks that you can interact with the data layer
      // general object browser work flow
      // actions fired/sort/filter/page--> component output --> serialize output --> set query parmas --> trigger model re-render
      //  --> fire query with qp --> receive response --> update component attrs --> component re-render
      // if you need more customization, you can write your own data layer by simply extend the existing ones and overwrite these hooks.
      serializer: ObjectBrowserSerializer,

      // the name of the model to retrieve. In this scenario, Ember.store.query('resource') would be called
      model: 'user',
      // configure sort behavior when talking to server,
      // client: true  ----- run a default sort build in object browser on the client side
      // client: <custom-function> --- run a custom sort function on the client side
      // client: false ---- sort will be handled on server
      sort: {
        client: true
      },
      // See explanation for sort.
      filter: {
        client: false
      }
      // page: false

      //  page: {
      //    strategy: <factory>
      //  }
    }
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
