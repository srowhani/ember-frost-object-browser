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
    let controller = this.controllerFor(this.get('routeName'))
    const serializer = controller.get('objectBrowserConfig.serializerConfig.serializer').create({
      config: controller.get('objectBrowserConfig.serializerConfig'),
      context: controller
    })
    return serializer.query(params)
  },

  setupController: function (controller, model) {
    this._super(controller, model)

    const serializer = controller.get('objectBrowserConfig.serializerConfig.serializer').create({
      config: controller.get('objectBrowserConfig.serializerConfig'),
      context: controller
    })
    // set filter based on qp
    serializer.setFilterPropertyFromQueryParam(controller)
    // set filter based on qp
    serializer.setSortPropertyFromQueryParam(controller)
  }
})
