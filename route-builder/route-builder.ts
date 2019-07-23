interface IRouteBuilderSegment {
  build(): string;
  end(ending: string): string;
}

type IRouteSegment<T> = { [P in keyof T]: IRouteSegment<T[P]> } & IRouteBuilderSegment; 

function createBuilder<T>(routeModel: T, baseRoute = ''): IRouteSegment<T> { 
  return new RouteBuilderSegment(baseRoute, routeModel) as any as IRouteSegment<T>; 
}

class RouteBuilderSegment<T extends {[k: string]: any}> implements IRouteBuilderSegment {

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

    build() {
        return this.baseRoute;
    }

    end(ending = '/') {
      return this.baseRoute + ending;
    }
}

export { createBuilder };
