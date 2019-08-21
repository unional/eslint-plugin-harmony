export function foo(_x: any) { }

const { a, b, ...rest } = {} as any

export { rest }

export function boo() {
  try {
    return 1
  }
  catch (e) {
    return
  }
}
