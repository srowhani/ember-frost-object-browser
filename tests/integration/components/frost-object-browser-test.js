import _ from 'lodash'
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
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

describeComponent('frost-object-browser', 'Integration | Component | frost object browser', {
  integration: true
}, function () {
  beforeEach(function () {
    this.setProperties({
      actionBarItems,
      model,
      viewSchema
    })
  })

  it('renders', function () {
    // takes too long to render the list
    this.timeout(5000)
    this.render(hbs`{{frost-object-browser
      actionBarItems=actionBarItems
      values=model.resources
      model=model.model
    }}`)
    expect(this.$()).to.have.length(1)
  })

  it('renders 6 items per page', function () {
    this.render(hbs`{{frost-object-browser
      actionBarItems=actionBarItems
      itemsPerPage=6
      values=model.resources
      model=model.model
    }}`)
    expect(this.$().find('.frost-list-item')).to.have.length(6)
  })

  it('it changes page when we click to next change button', function (done) {
    this.render(hbs`{{frost-object-browser
      actionBarItems=actionBarItems
      itemsPerPage=6
      values=model.resources
      model=model.model
    }}`)

    this.$().find('.pagination .button-bar.right button').eq(0).click()

    Ember.run.next(this, () => {
      expect(this.$().find('.pagination').text().trim()).to.equal('7 to 12 of 20')
      done()
    })
  })
})
