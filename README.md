# ember-frost-object-browser

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

* [Installation](#installation)
* [API](#api)
* [Examples](#examples)
* [Contributing](#contributing)

## Installation

```bash
ember install ember-frost-object-browser
```

## API

| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| ` `       | ` `  | ` `   | Coming soon |

## Examples

### Template

```handlebars
{{#frost-object-browser
  facets=model.facets
  filters=filters
  model=model.model
  onCreate=(action 'onCreate')
  onDetailChange=(action 'onDetailChange')
  onFacetChange=(action 'onOptionSelected')
  onFilter=onFilter
  onRowSelect=(action 'onRowSelect')
  title='Resources'
  values=model.visibleResources
  viewSchema=viewSchema
as |slot|}}
  {{#block-slot slot 'app-actions' as |onCreate|}}
    {{frost-button
      icon='frost/infobar-create'
      onClick=(action onCreate)
      priority='tertiary'
      size='medium'
      text='Create'
      vertical=true
    }}
  {{/block-slot}}
  {{#block-slot slot 'filters' as |filters onFilter|}}
    {{frost-object-browser-filter filters=filters onFilter=onFilter}}
  {{/block-slot}}
  {{#block-slot slot 'info-bar' as |infoBar|}}
    <div class="primary-title">
      {{infoBar.title}}
    </div>
    <div class="sub-title">
      {{infoBar.summary}}
    </div>
  {{/block-slot}}
  {{#block-slot slot 'objects' as |object onSelect|}}
    {{#frost-list onSelect=(action onSelect) selections=object.selectedItems records=object.computedValues as |record|}}
      {{#frost-object-browser-list-item model=record as |value|}}
        {{frost-bunsen-detail
          bunsenModel=object.model
          bunsenView=object.computedViewLevel
          renderers=object.renderers
          value=value
        }}
      {{/frost-object-browser-list-item}}
    {{/frost-list}}
  {{/block-slot}}
  {{#block-slot slot 'object-actions'}}
    <!-- actions go here -->
  {{/block-slot}}
  {{#block-slot slot 'pagination' as |paginator onPageChanged|}}
    {{paginator.control
      onPageChanged=(action onPageChanged)
    }}
  {{/block-slot}}
  {{#block-slot slot 'view-controls' as |viewControl viewLevel onDetailChange|}}
    <div class="button-bar {{ viewControl.detailLevel }}">
    {{#if viewLevel.low}}
      {{frost-button
        disabled=(eq viewControl.detailLevel 'low')
        onClick=(action onDetailChange 'low')
        priority='tertiary'
        size='small'
        icon='frost/list-small'
      }}
    {{/if}}
    {{#if viewLevel.medium}}
      {{frost-button
        disabled=(eq viewControl.detailLevel 'medium')
        onClick=(action onDetailChange 'medium')
        priority='tertiary'
        size='small'
        icon='frost/list-medium'
      }}
    {{/if}}
    {{#if viewLevel.high}}
      {{frost-button
        disabled=(eq viewControl.detailLevel 'high')
        onClick=(action onDetailChange 'high')
        priority='tertiary'
        size='small'
        icon='frost/list-large'
      }}
    {{/if}}
    </div>
  {{/block-slot}}
{{/frost-object-browser}}
```

### Controller

```js
  viewSchema: {
    low: {
      'version': '1.0',
      'type': 'form',
      'rootContainers': [
        {'label': 'Main', 'container': 'main'}
      ],
      'containers': [
        {
          'id': 'main',
          'className': 'flex-row',
          'rows': [
            [
              {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
            ],
            [
              {
                'model': 'updatedAt',
                'label': 'Last Updated',
                'labelClassName': 'ob-label',
                'inputClassName': 'ob-input'
              }
            ]
          ]
        }
      ]
    }
  }
```

Your controller will also need to implement the following callbacks:

`onCreate () {…}`
`onDetailChange (level) {…}`
`onFilter (filterState) {...} //Optional, used with filters`
`onRowSelect (allSelected, newSelected, deSelected) {…}`

You can also check out the demo app bundled with this addon to see an example of using this addon.

###Adding filters

An optional `filters` attribute can be passed to the component. `filters` should be an array of objects

```javascript
    filters: [{
      label: 'A label for the filter',
      name: '', // Key for filter state hash
      type: 'select', // Currently only 'select' type is supported
      clearable: true, // Whether or not the value can be cleared
      showing: true,  // True for expanded and false for collapsed, optional
      selectedValue: 'value', // Value in the list to set as selected, should match
                              // the value attribute of an item in the 'data' list

      // List of values
      data: [{
        label: 'Label for an item',
        value: 'value'
      }]
    }]

```

Currently `frost-select` style filters are supported.

When a filter is changed or cleared, the `onFilter` callback is called with the argument
`filterState`, which is a hash where the keys correspond to the filter names and the value is
the value currently reported by the filter.

## Development

### Setup

```bash
git clone git@github.com:ciena-frost/ember-frost-object-browser.git
cd ember-frost-object-browser
npm install && bower install
```

### Development Server

A dummy application for development is available under `ember-frost-object-browser/tests/dummy`.
To run the server run `ember server` (or `npm start`) from the root of the repository and
visit the app at http://localhost:4200.

### Testing

Run `npm test` from the root of the project to run linting checks as well as execute the test suite
and output code coverage.

[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-object-browser.svg "CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-object-browser

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-object-browser.svg "Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-object-browser

[npm-img]: https://img.shields.io/npm/v/ember-frost-object-browser.svg "Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-object-browser
