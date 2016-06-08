/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'frost-object-browser-slots',
  'Integration: FrostObjectBrowserSlotsComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-object-browser-slots}}
      //     template content
      //   {{/frost-object-browser-slots}}
      // `);

      this.render(hbs`{{frost-object-browser-slots}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
