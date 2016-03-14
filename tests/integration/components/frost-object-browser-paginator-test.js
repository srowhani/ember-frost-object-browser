import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent('frost-object-browser-paginator', 'Integration | Component | frost object browser paginator', {
  integration: true
}, function () {
  it('it renders', function () {
    this.render(hbs`
      {{frost-object-browser-paginator
        itemsPerPage=5
        page=1
        total=20
      }}
    `)

    expect(this.$().text().trim()).to.be.equal('6 to 10 of 20')
  })
})
