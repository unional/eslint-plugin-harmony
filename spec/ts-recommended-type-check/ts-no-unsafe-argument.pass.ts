export function foo(...args: any[]) {
  // it's ok as we explicity specify that.
  boo(...args)
}

function boo(...args: any[]) {
  console.info(args)
}
