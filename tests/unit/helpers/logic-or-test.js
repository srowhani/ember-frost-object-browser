/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  logicOr
} from 'ember-frost-object-browser/helpers/logic-or';

describe('LogicOrHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = logicOr(42);
    expect(result).to.be.ok;
  });
});
