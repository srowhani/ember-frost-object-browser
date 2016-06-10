/* jshint expr:true */
import Ember from 'ember'
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

const itemObject = Ember.Object.create()
const selections = Ember.A([])

describeComponent(
  'selection-action-link',
  'Integration: SelectionActionLinkComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.set('selections', selections)

      this.render(hbs`
        {{#selection-action-link 'details'
          selections=selections
          size='large'
          multiSelect=true
          priority='primary'
        }}
          Details
        {{/selection-action-link}}
      `)

      expect(this.$()).to.have.length(1)

      expect(
        this.$('a').hasClass('disabled'),
        '"disabled" property has the correct value'
      ).to.be.true
    })

    it('removes disabled property when one item exists in selections array', function () {
      selections.addObject(itemObject)

      this.set('selections', selections)

      this.render(hbs`
        {{#selection-action-link 'details'
          selections=selections
          size='large'
          multiSelect=true
          priority='primary'
        }}
          Details
        {{/selection-action-link}}
      `)

      expect(
        this.get('selections.length'),
        '"selections" property has the correct length'
      ).to.be.eql(1)

      expect(
        this.$('a').hasClass('disabled'),
        '"disabled" property has the correct value'
      ).to.be.false

      selections.removeObject(itemObject)
    })

    it('disabled property set when no item exists in selections array and "multiSelect=true"', function () {
      this.set('selections', selections)

      this.render(hbs`
        {{#selection-action-link 'details'
          selections=selections
          size='large'
          multiSelect=true
          priority='primary'
        }}
          Details
        {{/selection-action-link}}
      `)

      expect(
        this.get('selections.length'),
        '"selections" property has the correct length'
      ).to.be.eql(0)

      expect(
        this.$('a').hasClass('disabled'),
        '"disabled" property has the correct value'
      ).to.be.true
    })

    it('removes disabled property when one item exists in selections array and "multiSelect=true"', function () {
      selections.addObject(itemObject)

      this.set('selections', selections)

      this.render(hbs`
        {{#selection-action-link 'details'
          selections=selections
          size='large'
          multiSelect=true
          priority='primary'
        }}
          Details
        {{/selection-action-link}}
      `)

      expect(
        this.get('selections.length'),
        '"selections" property has the correct length'
      ).to.be.eql(1)

      expect(
        this.$('a').hasClass('disabled'),
        '"disabled" property has the correct value'
      ).to.be.false

      selections.removeObject(itemObject)
    })
  }
)
