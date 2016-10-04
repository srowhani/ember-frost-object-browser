/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import {
  disableHelper
} from 'ember-frost-object-browser/helpers/disable-helper';

describe('DisableHelperHelper', function() {
  // Replace this with your real tests.
  it('works', function() {
    let result = disableHelper(42);
    expect(result).to.be.ok;
  });
});
