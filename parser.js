define(
  [ 'nap'
  , './resolver'
  , 'logger/log!platform/am-address'
  ]
  , function(nap, resolve, log) {

    function isFn(inst){
      return typeof inst === "function"
    }

    function isStr(inst){
      return typeof inst === "string"
    }


    function bySelectorDefered(options){

      options = options.map(function(item) {
        return Object.keys(item).reduce(function(_, k) { 
          return { selector: k, fn: resolve(item[k]) } 
        }, {}) 
      })

      return function(node){

        var fn

        options.some(function(option){
          if(nap.is(node, option.selector)) {
            fn = option.fn
            return true
          }
        })

        return fn
      }
    }

    function negotiateSelector(args) {

      var defered = bySelectorDefered(args)

      return function(req, res) {

        if(!req.context) {
          res(null, nap.responses.error(400))
          return
        }

        var view = defered.call(null, req.context)

        if(!view) {
          res(null, nap.responses.error(404))
          return
        }
        
        view(req, res)
      }
    }

    function parseLevel(level, levelParser) {

      if(isStr(level)) return resolve(level)

      Object.keys(level).forEach(function(key) {
        if(isStr(level[key])) {
          level[key] = resolve(level[key])
        } else {
          level[key] = levelParser(level[key])
        }
      })

      return level
    }

    function parseMethods(obj) {
      obj = parseLevel(obj, parseMediaTypes)
      expand(obj)
      return nap.negotiate.method(obj)
    }

    function parseMediaTypes(obj) {
      obj = parseLevel(obj, parseSelectors)
      return nap.negotiate.accept(obj)
    }

    function parseSelectors(obj) {
      if(isStr(obj)) return resolve(obj)
      return negotiateSelector(obj)
    }

    function expand(obj) {
      Object.keys(obj).forEach(function(key) {
        var multi = key.split(',')
        if(multi.length > 1) {
          key.split(',').forEach(function(k) {
            obj[k.trim()] = obj[key]
          })
          delete obj[key]
        }
      })
      return obj
    }

    function parseResources(config) {

      var parsed = isStr(config) ? JSON.parse(config) : config

      parsed.forEach(function(resource) {
        if(resource.methods == "app-loader/app-loader") {
          resource.methods = {
            "get" : {
              "application/x.am.app" : "app-loader/app-loader"
            }
          , "send" : "app-loader/app-loader"
          , "remove" : "app-loader/app-loader"
          }
        }
        resource.fn = parseLevel({fn: resource.methods}, parseMethods).fn
      })
      
      return parsed
    }

    return {
      parseMethods    : parseMethods
    , parseMediaTypes : parseMediaTypes
    , parseSelectors  : parseSelectors
    , parseResources  : parseResources
    }
  }
)