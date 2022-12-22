export function capitalize(word) {
    const splitted = word.split("");
    return [
        splitted[0].toLocaleUpperCase(),
        ...splitted.slice(1).map((word) => word.toLocaleLowerCase()),
    ].join("");
}
export function capitalizeArray(array, joiner = "") {
    return array.map(capitalize).join(joiner);
}
