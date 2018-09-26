export function arrayWrap(v: any): any[] {
  if (v == null) {
    return []
  }
  return Array.isArray(v) ? v : [v]
}

export function isEmpty(v: any) {
  if (v == null) return true
  if (Array.isArray(v)) {
    return v.length < 1
  }
}

export function isFunction(v: any): boolean {
  return typeof v === 'function'
}

export function isObject(v: any) {
  return !isFunction(v) && typeof v === 'object'
}

export function noop() {}

let NEXT_KEY = 0
const CONTAINER_KEY = '__$DICJS$__'

export function getDICKey(callback: (...args: any[]) => any): string {
  return (<any>callback)[CONTAINER_KEY] || String(callback)
}

const generateDICKey = () => `${CONTAINER_KEY}-${NEXT_KEY++}`

export const attachKey = (factory: (...args: any[]) => any): string => {
  if (!(<any>factory)[CONTAINER_KEY]) {
    (<any>factory)[CONTAINER_KEY] = generateDICKey()
  }
  return (<any>factory)[CONTAINER_KEY]
}
