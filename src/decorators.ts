import Registrar from './Registrar'
import { ContainerInterface } from './contracts'
import { bind, singleton, getContext, make } from '.'
import { arrayWrap } from './utils';

const depKey = '$$---DEP---$$'

const deleteDeps = (d: any) => delete d[depKey]
const getDeps = (d: any): Array<[string, string[]]> => d[depKey] || (d[depKey] = [])

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

        deps.forEach(dep => {
          let [dep1, contexts] = dep
          contexts = arrayWrap(contexts)
          if (contexts.length < 1) {
            args.push(make(dep1, getContext()))
          } else {
            contexts.some((context, i) => {
              try {
                args.push(make(dep1, getContext(context)))
                return true
              } catch (e) {
                if (i + 1 == contexts.length) throw e
              }
              return false
            })
          }
        })

        const klass = target as InstanceType<any>
        return new klass(...args)
      })
    })
  }
}

export function Make(dep: string|InstanceType<any>, contexts?: string|string[]) {
  return (target: any, propertyKey:  string | symbol, index: number): any => {
    getDeps(target).push([dep, contexts as string[]])
  }
}
