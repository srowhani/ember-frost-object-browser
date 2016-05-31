# 13.0.1
No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 13.0.0

## Breaking

* **Upgraded** `ember-frost-bunsen` to version `6.0.0`.

  > `model` became `bunsenModel` and `view` became `bunsenView`.

* **Upgraded** `ember-prop-types` to version `2.0.0`. 

  > `oneOf` changed to `oneOfType` to better align with the React `propTypes` API.

# 12.0.0

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 11.0.0

No CHANGELOG section found in Pull Request description.
Use a `# CHANGELOG` section in your Pull Request description to auto-populate the `CHANGELOG.md`

# 11.0

## Breaking

* **Removed** support for pagination being built into the object-browser

* **Added** support for pagination as a named block slot
  This was done to increase the flexibilty of the object browser.
  The new usage allows for pagination to be passed into the component's block
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
    {{#block-slot slot 'pagination' as |paginator onPageChanged|}}
      {{paginator.control
        onPageChanged=(action onPageChanged)
      }}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```


# 10.0

## Breaking

* **Removed** support for the frost-list being built into the object-browser (what is showing the object data in list view)

* **Added** support for the object data as a named block slot
  This was done to increase the flexibilty of what can be set to handle the object data.
  The new usage allows for this object data to be passed into the component's block
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
    {{#block-slot slot 'objects' as |object onSelect|}}
      {{#frost-list onSelect=(action onSelect) selections=object.selectedItems records=object.computedValues as |record|}}
        {{#frost-object-browser-list-item model=record as |value|}}
          {{frost-bunsen-detail
            model=object.model
            renderers=object.renderers
            value=value
            view=object.computedViewLevel
          }}
        {{/frost-object-browser-list-item}}
      {{/frost-list}}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

# 9.0

## Breaking

* **Removed** support for application level actions (create at the app level)

* **Added** support for application level actions as a named block slot
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
  {{/frost-object-browser}}
  ```

# 8.0

## Breaking

* **Removed** support for the button bar (level of detail controls)

* **Added** support for the button bar level of detail controls as a named block slot
  This was done to increase the flexibilty of what can be used as the level of detail
  controls. The new usage allows for these controls to be passed into the component's
  block section:

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

## Breaking

* **Removed** support for the info bar content (title and subtitle information)

* **Added** support for the info bar content as a named block slot
  This was done to increase the flexibilty of what can be used as the info bar
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

## Breaking

* **Removed** support for the filter pane content (filters)

* **Added** support for the filter pane content as a named block slot
  This was done to increase the flexibilty of what can be used as the filter pane
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
    {{#block-slot slot 'filters' as |filters onFilter|}}
      {{frost-object-browser-filter filters=filters onFilter=onFilter}}
    {{/block-slot}}
  {{/frost-object-browser}}
  ```

#5.1.1

* **Fixed** Added `ember-prop-types` to catch a bug where multiple instances were sharing memory

#5.1.0

* **Added** Created a property to allow for showing/not showing the counts in the subtitle of the `info-bar` section.

# 5.0

## Breaking

* **Removed** support for the row actions content (actions on records: edit, delete, details)

* **Added** support for the row actions content as a named block slot
  This was done to increase the flexibilty of what can be used as the row actions
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
    {{#block-slot slot 'actions'}}
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
