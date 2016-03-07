import { moduleForComponent } from 'ember-qunit'
import test from 'dummy/tests/ember-sinon-qunit/test'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('frost-object-browser-list-item', 'Integration | Component | object browser list item', {
  integration: true
})

test('list item renders', function (assert) {
  this.set('foo', () => {})
  this.render(hbs`{{frost-object-browser-list-item on-select=foo}}`)
  assert.equal(this.$().length, 1)
})

;['small', 'medium', 'large'].forEach((level) => {
  test(`list item sets appropriate class name for detailLevel = ${level}`, function (assert) {
    this.set('level', level)
    this.render(hbs`{{frost-object-browser-list-item detailLevel=level}}`)
    const $el = this.$('.frost-list-item')
    assert.ok($el.hasClass(level), `[${level}] not in [${$el.attr('class')}]`)
  })
})
