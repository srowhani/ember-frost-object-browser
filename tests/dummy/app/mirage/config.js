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

  this.get('resources', function (db, request) {
    let resultArray = db.resources
    let keys = Object.keys(request.queryParams)
    let maxIndex = 45

    let hash = {
      filter: {},
      page: {}
    }
    keys.forEach((key) => {
      let result = key.split('[')

      if(result[0] === 'filter') {
        hash['filter'][result[1].slice(0, -1)] = request.queryParams[key]
      }
      if(result[0] === 'page') {
        hash['page'][result[1].slice(0, -1)] = request.queryParams[key]
      }
    })

    if (Object.keys(hash.filter).length > 0) {
      resultArray = db.resources.filter((item) => {
        let resultKey = true
        Object.keys(hash.filter).forEach((key) => {
          if (item[key].indexOf(hash.filter[key]) === -1) {
            resultKey = false
          }
        })
        return resultKey
      })
    }

    let pageSize = 15
    let nextOffset = hash.page.nextOffset
    if(!nextOffset) {
      return {
        resources: resultArray.slice(0, pageSize),
        meta: {
          nextOffset: pageSize,
          size: pageSize
        }
      }
    } else {
      return {
        resources: resultArray.slice(Number(nextOffset), Number(nextOffset) + pageSize),
        meta: {
          nextOffset: (Number(nextOffset) + pageSize) <= maxIndex ? Number(nextOffset) + pageSize : maxIndex,
          size: pageSize
        }
      }
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
