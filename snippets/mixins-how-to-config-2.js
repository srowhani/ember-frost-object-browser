// frost-button and frost-link are the two supported frost components currently.
// Any valid API for each component can be specified on the root of each config object.
controlsConfig: [
  {
    component: 'frost-button',
    action: 'actions.triggerDelete',  // method path related to control layer//controller
    text: 'Delete',
    priority: 'secondary',
    size: 'medium',
    options: {
      multiSelect: true,
      // button will be set to disable when function returns true
      disableControl: function (selection) {
        // selection --> current selected items
        // this --> control layer/controller
        return false
      }
    }
  },
  {
    component: 'frost-link',
    action: 'actions.triggerEdit',  // method path related to control layer//controller
    text: 'Edit',
    link: 'detail',
    priority: 'primary',
    size: 'medium'
  }
]
