type IRouteBuildState<T> = {}
& { [P in keyof T]: (param: number | string) => IRouteBuildState<T[P]> }
& { [P in keyof T]: IRouteBuildState<T[P]> }
& { $: string };

function createBuilder<TRouteDefinition>(routeModel: TRouteDefinition, { baseRoute = '', relative = false } = {}) {
  const builder: any = new Proxy(Object.assign(function() {}, { currentModel: routeModel, segments: relative ? [] : [baseRoute] }), {
    get: function(target: any, prop: string, receiver: any) {
      if (prop === '$') return target.segments.join('/')
      target.currentModel = target.currentModel[prop]
      target.segments.push(target.currentModel['__$$name'] ?? prop)
      return builder
    },
    apply: function(target: any, thisArg: any, args: any[]) {
      target.segments.pop()
      target.segments.push(args[0])
      return builder
    }
  })
  return builder as IRouteBuildState<TRouteDefinition>;
}

export { createBuilder };


