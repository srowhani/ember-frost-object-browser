/* jshint expr:true */
import Ember from 'ember'
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import { initialize } from 'ember-block-slots/initializers/component-block-slots'

describeComponent(
  'frost-object-browser',
  'Integration: FrostObjectBrowserComponent',
  {
    integration: true
  },
  function () {
    let container, application

    beforeEach(function () {
      Ember.run(() => {
        application = Ember.Application.create()
        container = application.__container__
        application.deferReadiness()
      })
      initialize(container, application)
    })

    it('renders default values', function () {
      this.render(hbs`
        {{frost-object-browser}}
      `)

      expect(
        this.$('.frost-object-browser'),
        'Has class "frost-object-browser"'
      ).to.have.length(1)
    })

    it('it yields the "info-bar" slot', function () {
      this.render(hbs`
        {{#frost-object-browser as |slot|}}
          {{#block-slot slot 'info-bar'}}
            Some yielded text
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      expect(
        this.$().text().trim(),
        'Text shows in the "info-bar" yielded slot'
      ).to.eql('Some yielded text')
    })

    it('it yields the "facets" slot', function () {
      this.render(hbs`
        {{#frost-object-browser as |slot|}}
          {{#block-slot slot 'facets'}}
            Some yielded text
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      expect(
        this.$().text().trim(),
        'Text shows in the "facets" yielded slot'
      ).to.eql('Some yielded text')
    })

    it('it yields the "view" slot', function () {
      this.render(hbs`
        {{#frost-object-browser as |slot|}}
          {{#block-slot slot 'view'}}
            Some yielded text
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      expect(
        this.$().text().trim(),
        'Text shows in the "view" yielded slot'
      ).to.eql('Some yielded text')
    })

    it('it yields the "actions" slot', function () {
      this.render(hbs`
        {{#frost-object-browser as |slot|}}
          {{#block-slot slot 'actions'}}
            Some yielded text
          {{/block-slot}}
        {{/frost-object-browser}}
      `)
      expect(
        this.$().text().trim().replace(/ +/g, ' '),
        'Text shows in the "actions" yielded slot'
      ).to.eql('Items selected\n Some yielded text')
    })

    it('it yields a button contextual component in the "actions" slot', function () {
      this.on('test-action', function () {})

      this.render(hbs`
        {{#frost-object-browser as |slot|}}
          {{#block-slot slot 'actions' as |action|}}
            {{action.button onActionClick=(action 'test-action')}}
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      expect(this.$('button'),
        'button tag exists'
      ).to.have.length(1)
    })

    it('it yields a link button contextual component in the "actions" slot', function () {
      this.on('test-action', function () {})

      this.render(hbs`
        {{#frost-object-browser as |slot|}}
          {{#block-slot slot 'actions' as |controls|}}
            {{#controls.link 'details'
              multiSelect=true
              priority='primary'
            }}
              Details
            {{/controls.link}}
          {{/block-slot}}
        {{/frost-object-browser}}
      `)

      expect(this.$('a'),
        'anchor tag exists'
      ).to.have.length(1)
    })
  }
)
