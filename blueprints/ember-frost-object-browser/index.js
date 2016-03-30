module.exports = {
  description: '',
  normalizeEntityName: function () {},

  /**
    Installs specified packages at the root level of the application.
    Triggered by 'ember install <addon name>'.

    @returns {Promise} package names and versions
  */
  afterInstall: function () {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-frost-core', target: '>=0.0.14 <2.0.0'},
        {name: 'ember-frost-bunsen', target: '^3.0.0'},
        {name: 'ember-frost-info-bar', target: '^2.0.0'},
        {name: 'ember-frost-list', target: '>=0.5.0 <2.0.0'}
      ]
    })
  }
}
