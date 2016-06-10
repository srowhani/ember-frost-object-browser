/* jshint expr:true */
import Ember from 'ember'
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import sinon from 'sinon'

const itemObject = Ember.Object.create()
const selections = Ember.A([])

describeComponent(
  'selection-action-button',
  'Integration: SelectionActionButtonComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.render(hbs`
        {{selection-action-button}}
      `)

      expect(this.$()).to.have.length(1)

      expect(
        this.$('button').prop('disabled'),
        '"disabled" property has the correct value'
      ).to.be.true
    })

    it('removes disabled property when one item exists in selections array', function () {
      selections.addObject(itemObject)

      this.set('selections', selections)

      this.render(hbs`
        {{selection-action-button
          selections=selections
        }}
      `)

      expect(
        this.get('selections.length'),
        '"selections" property has the correct length'
      ).to.be.eql(1)

      expect(
        this.$('button').prop('disabled'),
        '"disabled" property has the correct value'
      ).to.be.false

      selections.removeObject(itemObject)
    })

    it('disabled property set when no item exists in selections array and "multiSelect=true"', function () {
      this.set('selections', selections)

      this.render(hbs`
        {{selection-action-button
          selections=selections
          multiSelect=true
        }}
      `)

      expect(
        this.get('selections.length'),
        '"selections" property has the correct length'
      ).to.be.eql(0)

      expect(
        this.$('button').prop('disabled'),
        '"disabled" property has the correct value'
      ).to.be.true
    })

    it('removes disabled property when one item exists in selections array and "multiSelect=true"', function () {
      selections.addObject(itemObject)

      this.set('selections', selections)

      this.render(hbs`
        {{selection-action-button
          selections=selections
          multiSelect=true
        }}
      `)

      expect(
        this.get('selections.length'),
        '"selections" property has the correct length'
      ).to.be.eql(1)

      expect(
        this.$('button').prop('disabled'),
        '"disabled" property has the correct value'
      ).to.be.false

      selections.removeObject(itemObject)
    })

    it('calls test-action closure action with correct parameter', function () {
      selections.addObject(itemObject)

      this.set('selections', selections)

      const spy = sinon.spy()

      this.on('test-action', spy)

      this.render(hbs`
        {{selection-action-button
          priority='secondary'
          selections=selections
          size='large'
          text='Edit'
          onClick=(action 'test-action')
        }}
      `)

      this.$('button').click()

      expect(
        spy.called,
        'passed closure action was called'
      ).to.be.true

      expect(
        spy.calledWith(selections),
        'passed closure action was called with the correct parameter'
      ).to.be.true

      selections.removeObject(itemObject)
    })

    it('test-action closure action not called when disabled set to true', function () {
      const spy = sinon.spy()

      this.on('test-action', spy)

      this.render(hbs`
        {{selection-action-button
          priority='secondary'

          disabled=true
          size='large'
          text='Edit'
          onClick=(action 'test-action')
        }}
      `)

      this.$('button').click()

      expect(
        spy.called,
        'passed closure action should not be called'
      ).to.be.false
    })
  }
)
