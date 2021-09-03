interface IRouteBuilderSegment {
  build(...params: (number | string)[]): string;
  end(ending: string): string;
}

type IRouteSegment<T> = { [P in keyof T]: IRouteSegment<T[P]> } & IRouteBuilderSegment;

function createBuilder<T>(routeModel: T, baseRoute = ''): IRouteSegment<T> {
  return new RouteBuilderSegment(baseRoute, routeModel) as any as IRouteSegment<T>;
}

class RouteBuilderSegment<T extends { [k: string]: any }> {

  constructor(private baseRoute: string, private routeModel: T) {
    if (typeof this.routeModel !== "object") return;

    const subRouteBuilder = (key: keyof T) => {
      return () => {
        return createBuilder(
          this.routeModel[key],
          this.baseRoute + '/' + (this.routeModel[key].__$$name || key)
        )
      }
    }

    for (const key in this.routeModel) {
      if (key.indexOf('__$$') == 0) continue;
      Object.defineProperty(this, key, {
        get: subRouteBuilder(key),
        enumerable: true
      });
    }
  }

  build(...params: (number | string)[]) {
    let exploded = this.baseRoute.split('/');
    for (let i = 0, j = 0; i < exploded.length && j < params.length; i++) {
      const element = exploded[i];
      if (element[0] === ':') exploded[i] = params[j++].toString();
    }
    return exploded.join('/');
  }

  end(ending = '/') {
    return this.baseRoute + ending;
  }
}

export { createBuilder };
