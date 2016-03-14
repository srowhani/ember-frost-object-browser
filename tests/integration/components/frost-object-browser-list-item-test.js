import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent('frost-object-browser-list-item', 'Integration | Component | object browser list item', {
  integration: true
}, function () {
  it('list item renders', function () {
    Ember.run(() => {
      this.set('foo', () => {})
    })
    this.render(hbs`{{frost-object-browser-list-item on-select=foo}}`)
    expect(this.$()).to.have.length(1)
  })

  ;['small', 'medium', 'large'].forEach((level) => {
    it(`list item sets appropriate class name for detailLevel = ${level}`, function () {
      Ember.run(() => {
        this.set('level', level)
      })
      this.render(hbs`{{frost-object-browser-list-item detailLevel=level}}`)
      const $el = this.$('.frost-list-item')
      expect($el.hasClass(level)).to.equal(true)
    })
  })
})
