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
       // {name: 'ember-block-slots', target: '>=1.1.1 <2.0.0'},
       // {name: 'ember-frost-core', target: '>=0.24.0 <2.0.0'},
        // {name: 'ember-frost-bunsen', target: '^6.0.0'},
        //{name: 'ember-frost-info-bar', target: '^3.0.0'},
       // {name: 'ember-frost-list', target: '>=0.7.0 <2.0.0'},
        {name: 'ember-hook', target: '^1.3.1'},
        {name: 'ember-prop-types', target: '^2.5.0'},
        {name: 'liquid-fire', target: '>=0.24.0 <1.0.0'}
      ]
    })
  }
}
