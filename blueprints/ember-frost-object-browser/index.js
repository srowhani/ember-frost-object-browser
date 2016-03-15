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
        {name: 'ember-frost-theme', target: '^1.3.2'},
        {name: 'ember-frost-bunsen', target: '^2.2.0'},
        {name: 'ember-frost-button', target: '^1.4.2'},
        {name: 'ember-frost-checkbox', target: '^1.2.0'},
        {name: 'ember-frost-list', target: '^0.4.2'}
      ]
    })
  }
}
