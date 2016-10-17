import Ember from 'ember'
const {
  Mixin,
  } = Ember
import ObjectBrowserSerializer from 'ember-frost-object-browser/modules/object-browser-serializer'


export default Mixin.create({
  queryParams: {
    sortQueryParam: {
      refreshModel: true,
      as: 'sort'
    },
    filterQueryParam: {
      refreshModel: true,
      as: 'filter'
    }
  },

  model: function (params) {
    let controller = this.controllerFor(this.get('routeName'))

    const serializer = ObjectBrowserSerializer.create({
      config: controller.get('objectBrowserConfig.serializerConfig'),
      context: controller
    })

    return serializer.query(params).then(
      (response) => {
        controller.clearListState()
        return controller.didReceiveResponse(response)

      },
      (error) => {
        controller.queryErrorHandler(error)
      }
    )
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    const filterQueryParam = controller.get('filterQueryParam')
    controller.set('objectBrowserConfig.facetsConfig.value', filterQueryParam)
  }
})
