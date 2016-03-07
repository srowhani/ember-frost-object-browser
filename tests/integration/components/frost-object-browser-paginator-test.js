import { moduleForComponent } from 'ember-qunit'
import test from 'dummy/tests/ember-sinon-qunit/test'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('frost-object-browser-paginator', 'Integration | Component | frost object browser paginator', {
  integration: true
})

test('it renders', function (assert) {
  this.render(hbs`
    {{frost-object-browser-paginator
      itemsPerPage=5
      page=1
      total=20
    }}
  `)

  assert.equal(this.$().text().trim(), '6 to 10 of 20')
})

