import _ from 'lodash'
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import wait from 'ember-test-helpers/wait'
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

const resources = _.map(dummyData.resources, (resource) => {
  return Ember.Object.create(resource)
})

const model = {resources: Ember.A(resources), model: dummyData.model}

describeComponent(
  'frost-object-browser-inline',
  'Integration | Component | frost object browser inline',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      Ember.run(() => {
        this.setProperties({
          model,
          viewSchema
        })
      })
    })

    it('renders', function () {
      this.timeout(8000)
      this.render(hbs`{{frost-object-browser-inline
        values=model.resources
        model=model.model
      }}`)
      expect(this.$()).to.have.length(1)
    })

    it('renders 6 items per page', function () {
      this.timeout(8000)
      this.render(hbs`{{frost-object-browser-inline
        itemsPerPage=6
        values=model.resources
        model=model.model
      }}`)
      expect(this.$().find('.frost-list-item')).to.have.length(6)
    })

    it('it changes page when we click to next change button', function () {
      this.timeout(8000)
      this.render(hbs`{{frost-object-browser-inline
        itemsPerPage=6
        values=model.resources
        model=model.model
      }}`)

      this.$().find('.pagination .button-bar.right button').eq(0).click()

      return wait()
        .then(() => {
          expect(this.$().find('.pagination').text().trim()).to.equal('7 to 12 of 20')
        })
    })
  }
)
