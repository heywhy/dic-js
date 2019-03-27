import Registrar from 'dic-js/out/Registrar'
import { bind, singleton, getContext, make } from 'dic-js'
import { ContainerInterface } from 'dic-js/out/contracts'

const depKey = '$$---DEP---$$'

const deleteDeps = (d: any) => delete d[depKey]
const getDeps = (d: any): Array<string|string[]> => d[depKey] || (d[depKey] = [])

const decorator = (target: any, single = true): any => {
  let container = getContext()
  if (typeof target === 'string' || Array.isArray(target)) {
    let containers = Array.isArray(target) ? target : [target]
    return factory(containers.map(getContext), single)
  }
  factory([container], single)(target)
}

export function Bind(target: InstanceType<any>): any;
export function Bind(target: string|string[]): (target: InstanceType<any>) => any;

export function Bind(target: any): any {
  return decorator(target, false)
}

export function Singleton(target: InstanceType<any>): any;
export function Singleton(target: string|string[]): (target: Function) => void;

export function Singleton(target: any): any {
  return decorator(target)
}

const factory = (containers: ContainerInterface[], instance: boolean) => {
  return function (target: InstanceType<any>) {
    const deps = getDeps(target)
    deleteDeps(target)

    containers.forEach(container => {
      const registrar: Registrar =  instance
        ? singleton(target as any, container)
        : bind(target as any, container)

      registrar.factory(() => {
        const args: any[] = []

        for (let index = 0; index < deps.length; index++) {
          const dep = deps[index]
          try {
            if (Array.isArray(dep)) {
              const [dep1, context] = dep
              args.push(make(dep1, getContext(context)))
            } else {
              args.push(make(dep, getContext()))
            }
            break
          } catch (e) {
            if (index + 1 == deps.length) throw e
          }
        }

        const klass = target as InstanceType<any>
        return new klass(...args)
      })
    })
  }
}

export function Make(dep: string|InstanceType<any>, contexts?: string|string[]) {
  return (target: any, propertyKey:  string | symbol, index: number): any => {
    getDeps(target).push([dep, contexts])
  }
}
