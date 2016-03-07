import _ from 'lodash'
import config from '../config/environment'

export default function () {
  if (config && config.isDemo) {
    this.namespace = 'https://bitbucket.ciena.com'
  }

  if (config && config.mirageUrlPrefix) {
    if (config.mirageUrlPrefix === 'origin') {
      this.urlPrefix = window.location.origin
    } else {
      this.urlPrefix = config.mirageUrlPrefix
    }
  }

  this.get('resources', function (db) {
    return {
      resources: db.resources
    }
  })

  this.get('resources/:id', function (db, request) {
    return {
      resources: _.find(db.resources, {
        id: request.params.id
      })
    }
  })

  this.delete('resources/:id', function (db, request) {
    db.resources.remove(request.params.id)
  })
}
