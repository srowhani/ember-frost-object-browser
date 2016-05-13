# 9.0

## Breaking Changes
* **Removed** support for `app-actions` (create at the app level)
* **Added** for `app-actions` as a named block slot
  This was done to increase the flexibilty of what can be set as the `app-actions`.
  The new usage allows for these actions to be passed into the component's block
  section:

  ```handlebars
  {#frost-object-browser
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
    {{#block-slot slot 'app-level-actions' as |onCreate|}}
      {{frost-button
        icon='frost/infobar-create'
        onClick=(action onCreate)
        priority='tertiary'
        size='medium'
        text='Create'
        vertical=true
      }}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 8.0

## Breaking Changes
* **Removed** support for `button-bar` (level of detail controls)
* **Added** for `button-bar` level of detail controls as a named block slot
  This was done to increase the flexibilty of what can be used as the `button-bar`
  level of detail controls. The new usage allows for these controls to be passed into
  the component's block section:

  ```handlebars
  {#frost-object-browser
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

# 7.0

## Breaking Changes
* **Removed** support for `info-bar` content (title and subtitle information)
* **Added** for `info-bar` content as a named block slot
  This was done to increase the flexibilty of what can be used as the `info-bar`
  content. The new usage allows for these content to be passed into
  the component's block section:

  ```handlebars
  {#frost-object-browser
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
    {{#block-slot slot 'info-bar' as |infoBar|}}
      <div class="primary-title">
        {{infoBar.title}}
      </div>
      <div class="sub-title">
        {{infoBar.summary}}
      </div>
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 6.0

## Breaking Changes
* **Removed** support for `filter-pane` content (filters)
* **Added** for `filter-pane` content as a named block slot
  This was done to increase the flexibilty of what can be used as the `filter-pane`
  content. The new usage allows for these content to be passed into
  the component's block section:

  ```handlebars
  {#frost-object-browser
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
    {{#block-slot slot 'filter-pane' as |filters onFilter|}}
      {{frost-object-browser-filter filters=filters onFilter=onFilter}}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

#5.1.1

## Non-Breaking Changes

* **Fixed** Added `ember-prop-types` to catch a bug where multiple instances were sharing memory

#5.1.0

## Non-Breaking Changes

* **Added** Created a property to allow for showing/not showing the counts in the subtitle of the `info-bar` section.

# 5.0

## Breaking Changes
* **Removed** support for `row-actions` content (actions on records: edit, delete, details)
* **Added** for `row-actions` content as a named block slot
  This was done to increase the flexibilty of what can be used as the `row-actions`
  content. The new usage allows for these content to be passed into
  the component's block section:

  ```handlebars
  {#frost-object-browser
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
    {{#block-slot slot 'row-actions'}}
      {{#each actionBarItems as |actionBarItem|}}
        {{#frost-button
          disabled=(not actionBarItem.enabled)
          onClick=(action 'onActionClick' actionBarItem.id)
          priority='secondary'
          size='large'
        }}
          <div class="text">{{actionBarItem.label}}</div>
        {{/frost-button}}
      {{/each}}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```
