export function foo(_x: any): void { }

const { a, b, ...rest } = {} as any

export { rest }

export function boo(): 1 {
  try {
    return 1
  }
  catch (e) {
    return
  }
}
