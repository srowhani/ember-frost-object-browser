import DS from 'ember-data';

export default DS.RESTSerializer.extend({

  normalizeArrayResponse (store, primaryModelClass, payload, id, requestType) {
    return this._super(...arguments)
  }
});
