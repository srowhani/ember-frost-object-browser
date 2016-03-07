import _ from 'lodash'
import Ember from 'ember'
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'
import dummyData from './dummyInput'

const viewSchema = {
  low: {
    'version': '1.0',
    'type': 'form',
    'rootContainers': [
      {'label': 'Main', 'container': 'main'}
    ],
    'containers': [
      {
        'id': 'main',
        'className': 'flex-row',
        'rows': [
          [
            {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
          ],
          [
            {
              'model': 'updatedAt',
              'label': 'Last Updated',
              'labelClassName': 'ob-label',
              'inputClassName': 'ob-input'
            }
          ]
        ]
      }
    ]
  },
  medium: {
    'version': '1.0',
    'type': 'form',
    'rootContainers': [
      {'label': 'Main', 'container': 'main'}
    ],
    'containers': [
      {
        'id': 'main',
        'className': 'flex-row',
        'rows': [
          [
            {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'},
            {'model': 'value', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
          ],
          [
            {
              'model': 'updatedAt',
              'label': 'Last Updated',
              'labelClassName': 'ob-label',
              'inputClassName': 'ob-input'
            }
          ]
        ]
      }
    ]
  },
  high: {
    'version': '1.0',
    'type': 'form',
    'rootContainers': [
      {'label': 'Main', 'container': 'main'}
    ],
    'containers': [
      {
        'id': 'main',
        'className': 'flex-row',
        'rows': [
          [
            {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'},
            {'model': 'value', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
          ],
          [
            {
              'model': 'updatedAt',
              'label': 'Last Updated',
              'labelClassName': 'ob-label',
              'inputClassName': 'ob-input'
            },
            {'model': 'id', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
          ]
        ]
      }
    ]
  }
}

const actionBarItems = [
  {label: 'Details', id: 'details', enabled: false},
  {label: 'Delete', id: 'delete', enabled: false},
  {label: 'Edit', id: 'edit', enabled: false}
]

const resources = _.map(dummyData.resources, (resource) => {
  return Ember.Object.create(resource)
})

const model = {resources: Ember.A(resources), model: dummyData.model}

moduleForComponent('frost-object-browser', 'Integration | Component | frost object browser', {
  integration: true,
  beforeEach: function () {
    this.set('model', model)
    this.set('viewSchema', viewSchema)
    this.set('actionBarItems', actionBarItems)
  }
})

test('it renders', function (assert) {
  this.render(hbs`{{frost-object-browser
    actionBarItems=actionBarItems
    values=model.resources
    model=model.model
  }}`)
  assert.equal(this.$().length, 1)
})

test('it renders 6 items per page', function (assert) {
  this.render(hbs`{{frost-object-browser
    actionBarItems=actionBarItems
    itemsPerPage=6
    values=model.resources
    model=model.model
  }}`)
  assert.equal(this.$().find('.frost-list-item').length, 6)
})

test('it changes page when we click to next change button', function (assert) {
  this.render(hbs`{{frost-object-browser
    actionBarItems=actionBarItems
    itemsPerPage=6
    values=model.resources
    model=model.model
  }}`)
  this.$().find('.pagination .button-bar.right button').eq(0).click()
  assert.equal(this.$().find('.pagination').text().trim(), '7 to 12 of 20')
})

