/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'

describeComponent(
  'selection-action-link',
  'Unit: SelectionActionLinkComponent',
  {
    unit: true
  },
  function () {
    it('sets dependent keys correctly', function () {
      const component = this.subject()

      const disabledDependentKeys = [
        'selections.[]'
      ]

      expect(
        component.disabled._dependentKeys,
        'Dependent keys are correct for disabled()'
      ).to.eql(disabledDependentKeys)
    })
  }
)
