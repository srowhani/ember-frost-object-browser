/* jshint expr:true */
import Ember from 'ember'
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'

describeComponent(
  'frost-object-browser',
  'Unit: FrostObjectBrowserComponent',
  {
    unit: true
  },
  function () {
    it('runs onSelect and updates selections', function () {
      const selections = Ember.A([])
      const component = this.subject({
        selections: selections
      })

      const itemRecord = Ember.A([
        Ember.Object.create({
          isSelected: true,
          record: {}
        })
      ])

      expect(
        component.get('selections.length'),
        '"selections" property has the correct length'
      ).to.be.eql(0)

      Ember.run(() => {
        component.send('onSelect', itemRecord)
      })

      expect(
        component.get('selections.length'),
        '"selections" property has the correct length'
      ).to.be.eql(1)
    })
  }
)
