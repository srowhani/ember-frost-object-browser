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
        {name: 'ember-frost-core', target: '^0.0.13'},
        {name: 'ember-frost-bunsen', target: '^2.2.0'},
        {name: 'ember-frost-info-bar', target: '^1.0.0'},
        {name: 'ember-frost-list', target: '^0.4.2'}
      ]
    })
  }
}
