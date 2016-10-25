import Ember from 'ember'
import ObjectBrowserMixin from 'ember-frost-object-browser/mixins/object-browser-mixin'
import JsonApiObjectBrowserSerializer from 'ember-frost-object-browser/modules/json-api-object-browser-serializer'

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

  // TODO when qp is initialized off a cp, a full path must be provided
  queryParams: ['activeFacets', 'objectBrowserConfig.listConfig.sorting.active'],

  // TODO pass namespace from ob to list
  objectBrowserConfig: {
    listConfig: {
      namespace: 'hello',
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
        client: true
      },
      filter: {
        client: false
      },
      options: {
        serializer: JsonApiObjectBrowserSerializer //default
      }
    }
  },

  activeFacets: [],

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
    },

    sortItems(sortItems) {
      debugger;
      const serializer = JsonApiObjectBrowserSerializer.create({
        config: this.get('objectBrowserConfig.serializerConfig'),
        context: this
      })

      // normalize component output
      const sort = serializer.normalizeSort(sortItems)

      // cache normalized result
      this.set('cachedNormalizedSort', sort)

      // TODO need to change sortItems to normalized sort
      // set qp
      let activeSorting = sortItems.map(function (item) {
        return {value: item.value, direction: item.direction}
      })
      this.set('activeSorting', activeSorting)

      // issue query if necessary
        console.log('run server sort')
        let modelPath = this.get('objectBrowserConfig.listConfig.items')
        serializer.query().then(
          (response) => {
            this.clearListState()
            this.set(modelPath, this.didReceiveResponse(response))
          },
          (error) => {
            this.queryErrorHandler(error)
          }
        )
    }
  }

})
