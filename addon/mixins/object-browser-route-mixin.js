import Ember from 'ember'
const {Mixin} = Ember
export default Mixin.create({
  queryParams: {
    sortQueryParam: {
      refreshModel: true,
      as: 'sort'
    },
    filterQueryParam: {
      refreshModel: true,
      as: 'filter'
    },
    pageQueryParam: {
      refreshModel: false,
      as: 'page'
    }
  },

  model: function (params) {
    const controller = this.controllerFor(this.get('routeName'))
    const serializer = controller.get('serializer')
    return serializer.query(params, controller)
  },

  setupController: function (controller, model) {
    this._super(controller, model)

    const serializer = controller.get('serializer')

    // set filter based on qp
    serializer.setFilterPropertyFromQueryParam(controller)
    // set sort based on qp
    serializer.setSortPropertyFromQueryParam(controller)
  }
})
