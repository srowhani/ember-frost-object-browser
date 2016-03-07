import DS from 'ember-data'

export default DS.Model.extend({
  alias: DS.attr('string'),
  'facet_type': DS.attr('string'),
  updatedAt: DS.attr('date'),
  value: DS.attr('string')
})
