export function capitalize(word: string): string {
  const splitted = word.split("");

  return [
    splitted[0]?.toLocaleUpperCase() ?? "",
    ...splitted.slice(1).map((word) => word.toLocaleLowerCase()),
  ].join("");
}

export function capitalizeArray(array: string[], joiner: string = ""): string {
  return array.map(capitalize).join(joiner);
}
