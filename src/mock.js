export default function runCallback (fn, ...args) {
  fn(...args)
}

export function createObject (ClassItem) {
  return new ClassItem()
}
