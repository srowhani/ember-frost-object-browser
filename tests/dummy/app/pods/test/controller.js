import Ember from 'ember'

export default Ember.Controller.extend({

  queryParams: ['activeSorting'],

  activeSorting: null,

  actions: {
    clickHandler() {
      let result =
        [
          {name: 'q'},
          {value: 'a'}
        ]
      this.set('activeSorting', result)
    }

  }
})

//  route
//import Ember from 'ember'
//
//export default Ember.Route.extend({
//  model: function (params) {
//    debugger;
//  },
//})



// template
// <div {{action (action 'clickHandler')}}>button</div>
