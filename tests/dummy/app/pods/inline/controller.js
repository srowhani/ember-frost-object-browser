import Ember from 'ember'

export default Ember.Controller.extend({
  selected: {},
  selectedItems: [],
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
    },
    medium: {
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
              {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'},
              {'model': 'value', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
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
    },
    high: {
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
              {'model': 'alias', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'},
              {'model': 'value', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
            ],
            [
              {
                'model': 'updatedAt',
                'label': 'Last Updated',
                'labelClassName': 'ob-label',
                'inputClassName': 'ob-input'
              },
              {'model': 'id', 'labelClassName': 'ob-label', 'inputClassName': 'ob-input'}
            ]
          ]
        }
      ]
    }
  },

  filters: [
    {
      label: 'First Filter',
      type: 'select',
      name: 'first-filter',
      clearable: true,
      data: [{
        label: 'Test1',
        value: 'poasdfkljqpoiasdfjae'
      }, {
        label: 'Test2',
        value: 'asdfasdfkljqpoihaasf'
      }, {
        label: 'Test3',
        value: 'poasSfaFFsacaejktdfe'
      }, {
        label: 'Test4',
        value: 'asdfasdffeacrhASHASD'
      }]
    },
    {
      label: 'Second filter',
      type: 'select',
      name: 'second-filter',
      data: [{
        label: 'Test1',
        value: 'poasdfkljqpoiasdfjae'
      }, {
        label: 'Test2',
        value: 'asdfasdfkljqpoihaasf'
      }, {
        label: 'Test3',
        value: 'poasSfaFFsacaejktdfe'
      }, {
        label: 'Test4',
        value: 'asdfasdffeacrhASHASD'
      }]
    }
  ],

  sortData: {
    sortAttributes: [{label: 'Label', value: 'label'}],
    sortOrder: []
  },

  actions: {
    onCreate () {
      window.alert('One does not merely create things')
    },

    onOptionSelected () {
      let selected = this.get('selected')
      console.log('Facet changed')
      const facet = arguments[0]
      if (facet.value.length === 0) {
        delete selected[facet.id]
      } else {
        selected[facet.id] = facet.value
      }
      this.set('selected', selected)
    },

    onRowSelect (allSelected, newSelected, deSelected) {
      let actionBarItems

      if (allSelected.length === 1) {
        actionBarItems = [
          {label: 'Details', id: 'details', enabled: true},
          {label: 'Delete', id: 'delete', enabled: true},
          {label: 'Edit', id: 'edit', enabled: true}
        ]
      } else if (allSelected.length > 1) {
        actionBarItems = [
          {label: 'Details', id: 'details', enabled: false},
          {label: 'Delete', id: 'delete', enabled: true},
          {label: 'Edit', id: 'edit', enabled: false}
        ]
      } else {
        actionBarItems = [
          {label: 'Details', id: 'details', enabled: false},
          {label: 'Delete', id: 'delete', enabled: false},
          {label: 'Edit', id: 'edit', enabled: false}
        ]
      }

      this.setProperties({
        actionBarItems,
        selectedItems: allSelected
      })
    },

    onActionClick (buttonId) {
      const selectedItems = this.get('selectedItems')

      if (buttonId === 'delete') {
        selectedItems.forEach((item) => {
          item.destroyRecord()
        })
      } else {
        const ids = selectedItems.map((si) => si.get('id')).join(', ')
        window.alert(`clicked ${buttonId} for ${ids}`)
      }
    },

    onDetailChange (level) {
      Ember.Logger.log(`Level of detail changed to ${level}`)
    },

    onSortSelect ([sortData]) {
      if (sortData) {
        let sortedList = this.get('model.resources').sortBy(sortData.get('value'))

        if (this.get('direction') === ':desc') {
          sortedList = sortedList.reverse()
        }

        this.set('model.resources', sortedList)
      }
    }
  }
})
