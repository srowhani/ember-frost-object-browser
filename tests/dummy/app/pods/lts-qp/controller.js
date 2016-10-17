import Ember from 'ember'
import ObjectBrowserMixin from 'ember-frost-object-browser/mixins/object-browser-mixin'
import ObjectBrowserSerializer from 'ember-frost-object-browser/modules/object-browser-serializer'

function localObjectBrowserDefaultFilter(data, filter) {
  let activeFacets = filter

  if (!Ember.isPresent(activeFacets)) {
    return data
  }

  return data.filter((data) => {
    let key = true
    activeFacets.forEach((facet) => {
      if (data.get(facet.id).indexOf(facet.value) === -1) {
        key = false
      }
    })
    return key
  })
}


export default Ember.Controller.extend(ObjectBrowserMixin, {

  sortQueryParam: [{value: 'alias', direction: ':desc'}],

  filterQueryParam: [],

  // TODO when qp is initialized off a cp, a full path must be provided
  queryParams: ['filterQueryParam', 'sortQueryParam'],


  // TODO pass namespace from ob to list
  objectBrowserConfig: {
    listConfig: {
      items: 'model.resources',
      component: 'lts/user-list-item',
      sorting: {
        active: [{value: 'alias', direction: ':desc'}],

        properties: [
          {
            value: 'alias',
            label: 'Alias'
          },
          {
            value: 'id',
            label: 'Id'
          }
        ]
      }
    },

    facetsConfig: {
      bunsenModel: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          alias: {
            type: 'string'
          }
        }
      },
      bunsenView: {
        "cellDefinitions": {
          "main": {
            "children": [
              {"model": "id"},
              {"model": "alias"}
            ]
          }
        },
        "cells": [
          {
            "extends": "main"
          }
        ],
        "type": "form",
        "version": "2.0"
      },
      value: {
      }
    },

    controlsConfig: [
      {
        component: 'frost-button',
        text: 'Delete',
        disable: 'type1',
        description: {
          priority: 'secondary',
          size: 'medium'
        }
      },
      {
        component: 'frost-button',
        text: 'Edit',
        disable: 'type2',
        description: {
          priority: 'secondary',
          size: 'medium'
        }
      },
      {
        component: 'frost-button',
        text: 'Detail',
        disable: 'type2',
        description: {
          priority: 'secondary',
          size: 'medium'
        }
      }
    ],

    serializerConfig: {
      model: 'resource',
      sort: {
        clientSort: true
      },
      filter: {
        clientFilter: true
      },
      options: {
        serializer: ObjectBrowserSerializer //default
      }
    }
  },

  actions: {
    triggerAction () {
      this.notifications.addNotification({
        message: 'Action sent',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    triggerDelete () {
      this.notifications.addNotification({
        message: 'Delete Action fired',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    triggerEdit () {
      this.notifications.addNotification({
        message: 'Edit Action fired',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    },

    triggerDetail () {
      this.notifications.addNotification({
        message: 'Detail Action fired',
        type: 'success',
        autoClear: true,
        clearDuration: 2000
      })
    }
  }

})
