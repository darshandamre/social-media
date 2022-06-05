export const isObjectWithKey = <T extends string>(
  given: unknown,
  key: T
): given is Partial<Record<T, unknown>> =>
  typeof given === "object" && given !== null && key in given;
