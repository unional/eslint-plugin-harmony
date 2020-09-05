export function task(obj: { a?: { b: number } }): number {
  // Non-null-assertion is there for a reason.
  return obj.a!.b
}
