import Mirage, {
  faker
}
from 'ember-cli-mirage'

export default Mirage.Factory.extend({
  'first-name': function () {
    return faker.name.firstName()
  },
  'last-name': function () {
    return faker.name.lastName()
  },
  email () {
    return faker.internet.email()
  },
  'employee-number': function () {
    return faker.random.number()
  },
  'last-update': function () {
    return faker.date.past()
  }
})
