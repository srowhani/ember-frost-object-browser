/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'selection-action-link',
  'Integration: SelectionActionLinkComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#selection-action-link}}
      //     template content
      //   {{/selection-action-link}}
      // `);

      this.render(hbs`{{selection-action-link 'details'}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
