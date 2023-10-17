export const getNumberOrUndefined = (input: string | number | undefined, allowZero = true) => {
  const n = Number(input)

  if (isNaN(n)) {
    return undefined
  }

  if (!allowZero && !n) {
    return undefined
  }

  return n
}