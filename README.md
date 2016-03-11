[ci-img]: https://img.shields.io/travis/ciena-frost/ember-frost-object-browser.svg "CI Build Status"
[ci-url]: https://travis-ci.org/ciena-frost/ember-frost-object-browser

[cov-img]: https://img.shields.io/coveralls/ciena-frost/ember-frost-object-browser.svg "Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-frost/ember-frost-object-browser

[npm-img]: https://img.shields.io/npm/v/ember-frost-object-browser.svg "Version"
[npm-url]: https://www.npmjs.com/package/ember-frost-object-browser

[![Travis][ci-img]][ci-url] [![Coveralls][cov-img]][cov-url] [![NPM][npm-img]][npm-url]

# ember-frost-object-browser

 * [Installation](#installation)
 * [API](#api)
 * [Examples](#examples)
 * [Contributing](#contributing)

## Installation
```
ember install ember-frost-object-browser
```

## API

| Attribute | Type | Value | Description |
| --------- | ---- | ----- | ----------- |
| ` ` | ` ` | ` ` | Coming soon |

## Examples
### Template:
```handlebars
{frost-object-browser
  actionBarItems=actionBarItems
  facets=model.facets
  model=model.model
  actionBarItems=actionBarItems
  on-create=(action "on-create")
  on-detail-change=(action "on-detail-change")
  on-facet-change=(action "on-option-selected")
  on-row-select=(action "on-row-select")
  on-action-click=(action "on-action-click")
  title="Resources"
  values=model.visibleResources
  viewSchema=viewSchema
}}
```

### Controller:
```
  actionBarItems: [
    {label: 'Details', id: 'details', enabled: false},
    {label: 'Delete', id: 'delete', enabled: false},
    {label: 'Edit', id: 'edit', enabled: false}
  ],
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

`'on-create': function () {…}`
`'on-detail-change': function (level) {…}`
`'on-row-select': function (allSelected, newSelected, deSelected) {…}`
`'on-action-click': function (actionId, currentSelection) {…}`

You can also check out the demo app bundled with this addon to see an example of using this addon.


## Development
### Setup
```
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
