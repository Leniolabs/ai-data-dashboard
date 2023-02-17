export function className(...args: (string | boolean | undefined)[]): string {
  return args.filter((x) => x).join(" ");
}
